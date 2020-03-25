import { assert } from 'chai'
import SpruceTest from './lib/SpruceTest'
import { ISpruceContext } from '../interfaces/ctx'
import faker from 'faker'
import get from 'ts-get'
import gql from 'graphql-tag'

class GQLMethodTests extends SpruceTest<ISpruceContext> {
	public setup(): void {
		it('Can call query', () => this.doQuery())
		it('Can not call query as mutation', () => this.doQueryAsMutate())
		it('Can call mutation', () => this.doMutate())
		it('Can not call mutation as query', () => this.doMutateAsQuery())

		// TODO: Move SDL test schema into spruce-skill-server. See gql/resolvers/sdl.ts.TODO
		it.skip('can run simple query against sdl defined schema', () =>
			this.canRunSimpleQuery())
		it.skip('can get first user model against shorthand defined schema', () =>
			this.canGetFirstUserModel())
		it.skip('can get run full relay/sequelize query against shorthand defined schema', () =>
			this.canRunGqlSequelizeQuery())

		it.skip('can get the right type of union', () =>
			this.canGetProperUnionType())
	}

	public async doQuery(): Promise<void> {
		const result = await this.ctx.sb.query(`
		{
				Location (
				id: "${this.location.id}"
			) {
				name
			}
		}`)
		assert.isOk(result.data.Location.name)
	}

	public async doQueryAsMutate(): Promise<void> {
		const result = await this.ctx.sb.mutation(`
		{
				Location (
				id: "${this.location.id}"
			) {
				name
			}
		}`)
		assert.isUndefined(result.data)
		assert.isOk(result.errors)
		assert.isOk(result.errors[0])
	}

	public async doMutate(): Promise<void> {
		const result = await this.ctx.sb.mutation(`
		{
			updateLocation (input: {
				id: "${this.location.id}"
				name: "${faker.lorem.words()}"
			}) {
				Location {
					name
				}
			}
		}`)
		assert.isOk(result.data.updateLocation.Location.name)
	}

	public async doMutateAsQuery(): Promise<void> {
		const result = await this.ctx.sb.query(`
		{
			updateLocation (input: {
				id: "${this.location.id}"
				name: "${faker.lorem.words()}"
			}) {
				Location {
					name
				}
			}
		}`)
		assert.isUndefined(result.data)
		assert.isOk(result.errors)
		assert.isOk(result.errors[0])
	}

	public canRunSimpleQuery = async () => {
		const results = await this.gql(
			gql`
				query($id: ID!) {
					testSimpleQuery(id: $id) {
						id
						name
						address
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
		assert.equal(testSimpleQuery[0].address, 'hello world')
	}

	public canGetFirstUserModel = async () => {
		const results = await this.gql(gql`
			query {
				getFirstUser {
					id
					firstName
					lastName
					# Locations {
					# 	edges {
					# 		node {
					# 			id
					# 			name
					# 		}
					# 	}
					# }
				}
			}
		`)

		const user = get(results, r => r.data.getFirstUser)

		assert.isObject(user)
		assert.isString(user.id)
		assert.isString(user.firstName)
		assert.isString(user.lastName)
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

		const locationNodes = get(results, r => r.data.loadFirstLocations.edges)
		const count = get(results, r => r.data.loadFirstLocations.totalCount)

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

		const user = get(results, r => r.data.loadUserOrLocation)
		assert.isOk(user.id)
		assert.isOk(user.firstName)

		const results2 = await this.gql(gql`
			query {
				loadUserOrLocation(type: "location") {
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

		const location = get(results2, r => r.data.loadUserOrLocation)

		assert.isOk(location.timezone)
		assert.isOk(location.name)
	}
}

describe('GQLMethodTests', function Tests() {
	new GQLMethodTests(`${__dirname}/../../spruce-skill/`, this)
})
