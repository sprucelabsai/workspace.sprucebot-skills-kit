/* eslint-disable @typescript-eslint/no-var-requires */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
import globby from 'globby'
import supertest from 'supertest'
import faker from 'faker'
import { generateSkillJWT } from './lib/jwt'
import { Suite } from 'mocha'
import Koa from 'koa'
import { Organization } from '../models/Organization'
import { Location } from '../models/Location'
import { Skill } from '../models/Skill'
import { User } from '../models/User'

// The base test model that all others will extend
export default class Base {
	private basePath!: string
	protected koa!: Koa<any>
	protected ctx!: Context
	protected mocks: Record<string, any>
	protected request!: supertest.SuperTest<supertest.Test>
	protected organization!: Organization
	protected location!: Location
	protected skill!: Skill

	public constructor(basePath: string, mocha?: Suite) {
		if (mocha) {
			mocha.timeout(30000)
			mocha.retries(0)
		}
		this.mocks = {}
		this.basePath = basePath

		before(() => this.before())
		after(() => this.after())
		beforeEach(() => this.beforeEach())
		afterEach(() => this.afterEach())
		this.setup()
	}

	protected setup(): void {}

	protected async setupMocks(options?: Record<string, any>): Promise<void> {
		if (!this.basePath) {
			throw new Error(
				'Invalid "basePath" set as a private static property on your test class. It should be used like: class ExampleTests extends SpruceTest() { private basePath = "../tests" }'
			)
		}

		try {
			const mocks = await globby([
				`${__dirname}/mocks/**/*Mock.(js|ts)`,
				`${this.basePath}/server/tests/mocks/**/*Mock.(js|ts)`
			])
			let sandbox
			for (let i = 0; i < mocks.length; i += 1) {
				// @ts-ignore
				const Mock = require(mocks[i])
				let mock
				if (Mock.default) {
					mock = new Mock.default(this.koa)
				} else {
					mock = new Mock(this.koa)
				}
				if (mock.key === 'sandbox') {
					sandbox = mock
				}
				if (this.mocks[mock.key]) {
					throw new Error(
						`A mock with the key "${
							mock.key
						}" already exists. Please set a unique "key" in your mock.`
					)
				}
				this.mocks[mock.key] = mock
				await mock.setup({
					...options,
					sandbox
				})
			}
		} catch (e) {
			throw e
		}
	}

	protected async beforeEach(): Promise<void> {
		// Reset the emit response handler
		global.testEmitResponse = {}
	}

	protected async afterEach(): Promise<void> {}

	protected async before(options?: Record<string, any>): Promise<void> {
		await this.beforeBase(options)
		if (!this.mocks.sandbox) {
			throw new Error(
				'@sprucelabs/spruce-skill-server: SandboxMock has not been initialized. If this is deliberate you should override the before() method in your test'
			)
		}

		this.organization = this.mocks.sandbox.organization
		const locationId = Object.keys(this.mocks.sandbox.locations)[0]
		this.location = this.mocks.sandbox.locations[locationId]
		this.skill = this.mocks.sandbox.skill

		this.otherOrganization = this.mocks.sandbox.otherOrganization
		const otherLocationId = Object.keys(this.mocks.sandbox.otherLocations)[0]
		this.otherLocation = this.mocks.sandbox.otherLocations[otherLocationId]
		this.otherSkill = this.mocks.sandbox.otherSkill
	}

	protected async beforeBase(options): Promise<void> {
		try {
			const { koa, server } = await require(`${basePath}/server/server`)
			this.server = server
			this.koa = koa
			this.ctx = this.koa.context
			this.request = supertest(this.server)

			if (!options || !options.disableMocks) {
				await this.setupMocks(options)
			}
		} catch (e) {
			throw e
		}
	}

	protected async after(): Promise<void> {
		await this.afterBase()
	}

	protected async afterBase(): Promise<void> {
		try {
			const promises = []
			for (let k in this.mocks) {
				if (this.mocks[k].teardown) {
					promises.push(this.mocks[k].teardown())
				}
			}
			await Promise.all(promises)
		} catch (e) {
			throw e
		}
	}

	protected async triggerEvent(options: {
		eventName: string
		payload: string
		skill: string
		location: string
		organization: string
		user: string
	}): Promise<any> {
		const { eventName, payload, skill, location, organization, user } = options
		const token = generateSkillJWT({
			skill,
			location,
			organization,
			user,
			payload,
			eventType: eventName
		})

		const result = await this.request
			.post('/hook.json')
			.send({ data: token, event: eventName })

		return result
	}

	protected createPhone(): string {
		const phone = faker.phone.phoneNumberFormat(0)
		return `555${phone.substr(3)}`
	}
}
