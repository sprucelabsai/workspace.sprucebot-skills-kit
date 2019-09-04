import { assert } from 'chai'
import { SpruceTest } from '@sprucelabs/spruce-skill-server'
import { ISkillContext } from 'server/interfaces/ctx'
import get from 'lodash/get'
import gql from 'graphql-tag'
import config from 'config'

class ExampleTests extends SpruceTest<ISkillContext> {
	public setup(): void {
		if (config.TESTING_SKILLS_KIT) {
			it('Can do a trivial assert', () => this.trivialAssert())
			it('Can get users', () => this.getUsers())
			it('Can use custom mock data', () => this.customMock())
			it('can run simple query', () => this.canRunSimpleQuery())
			it('can get first user model', () => this.canGetFirstUserModel())
			it('can get run full relay/sequelize query', () =>
				this.canRunGqlSequelizeQuery())
			it('can get the right type of union', () => this.canGetProperUnionType())
			it('can mutate user', () => this.canMutateUser())
		}
	}

	public async before(): Promise<void> {
		await this.beforeBase()
		this.organization = this.mocks.sandbox.organization
		const locationId = Object.keys(this.mocks.sandbox.locations)[0]
		this.location = this.mocks.sandbox.locations[locationId]
	}

	public async trivialAssert(): Promise<void> {
		const location = await this.ctx.db.models.Location.findOne()
		assert.isNotNull(location)
	}

	public async getUsers(): Promise<void> {
		const query = gql`
			{
				Users {
					edges {
						node {
							id
							firstName
							lastName
						}
					}
				}
			}
		`
		const { body } = await this.request
			.post('/graphql')
			.set('Authorization', `JWT ${this.organization.owner[0].jwt}`)
			.send({
				query: query.loc.source.body
			})

		log.debug(body)
		assert.isNotNull(body.data.Users)
	}

	public customMock(): void {
		// Verify "someData" is set properly by mocks/ExampleMock.js
		assert.equal(
			this.mocks.example.someData,
			`Example Mock Test org/location: ${this.organization.id} / ${
				this.location.id
			}`
		)
	}

	public canRunSimpleQuery = async () => {
		const results = await this.gql(
			gql`
				query($id: ID!) {
					testSimpleQuery(id: $id) {
						id
						name
					}
				}
			`,
			{
				id: 'howdy'
			}
		)

		const {
			data: { testSimpleQuery }
		} = results

		assert.isArray(testSimpleQuery)
		assert.equal(testSimpleQuery.length, 2)
	}

	public canGetFirstUserModel = async () => {
		const results = await this.gql(gql`
			query {
				getFirstUser {
					id
					name
					Locations {
						edges {
							node {
								id
								name
							}
						}
					}
				}
			}
		`)

		const {
			data: { getFirstUser: user }
		} = results

		assert.isObject(user)
		assert.isString(user.id)
		assert.isNull(user.name)
	}

	public canRunGqlSequelizeQuery = async () => {
		const results = await this.gql(gql`
			query {
				loadFirstLocations(limit: 10) {
					totalCount
					edges {
						node {
							id
							name
							Organization {
								id
								name
							}
						}
					}
				}
			}
		`)

		const locationNodes = get(results, 'data.loadFirstLocations.edges')
		const count = get(results, 'data.loadFirstLocations.totalCount')

		assert.isArray(locationNodes)
		assert.isAbove(count, 0)

		assert.isObject(locationNodes[0].node)
		assert.isString(locationNodes[0].node.id)
	}

	public canGetProperUnionType = async () => {
		const results = await this.gql(gql`
			query {
				loadUserOrLocation(type: "user") {
					... on User {
						id
						firstName
					}
					... on Location {
						name
						timezone
					}
				}
			}
		`)

		const user = get(results, 'data.loadUserOrLocation')
		assert.isOk(user.id)
		assert.isOk(user.phoneNumber)

		const results2 = await this.gql(gql`
			query {
				loadUserOrLocation(type: "location") {
					... on User {
						id
						phoneNumber
					}
					... on Location {
						name
						timezone
					}
				}
			}
		`)

		const location = get(results2, 'data.loadUserOrLocation')

		assert.isOk(location.timezone)
		assert.isOk(location.name)
	}

	public canMutateUser = async () => {
		const user = this.location.guest[0]

		const results = await this.gql(
			gql`
				mutation($input: updateUserInput!) {
					updateUserTest(input: $input) {
						id
						firstName
						phoneNumber
					}
				}
			`,
			{
				input: {
					id: user.id,
					firstName: 'Do it!'
				}
			}
		)

		const mutationUser = get(results, 'data.updateUserTest')
		assert.isOk(mutationUser.id)
		assert.isOk(mutationUser.firstName)
		assert.isNull(mutationUser.phoneNumber) // scopes should block this

		const loadedUser = await this.ctx.db.models.User.findOne({
			where: {
				id: user.id
			}
		})

		assert.isOk(loadedUser)
		if (loadedUser) {
			assert.equal(loadedUser.firstName, 'Do it!')
		}
	}
}

describe('ExampleTests', function Tests() {
	this.timeout(30000)
	new ExampleTests(`${__dirname}/../../`, this) // eslint-disable-line
})
