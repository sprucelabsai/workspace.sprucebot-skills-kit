import { assert } from 'chai'
import SpruceTest from './lib/SpruceTest'
import { ISpruceContext } from '../interfaces/ctx'
import faker from 'faker'
import get from 'lodash/get'

class GQLMethodTests extends SpruceTest<ISpruceContext> {
	public setup(): void {
		it('Can call query', () => this.doQuery())
		it('Can not call query as mutation', () => this.doQueryAsMutate())
		it('Can call mutation', () => this.doMutate())
		it('Can not call mutation as query', () => this.doMutateAsQuery())
		it('can run simple query against shorthand defined schema', () =>
			this.canRunSimpleQueryAgainstShorthand())
		it('can get first user model against shorthand defined schema', () =>
			this.canGetFirstUserModel())
		it('can get run full relay/sequelize query against shorthand defined schema', () =>
			this.canRunGqlSequelizeQueryAgainstShorthand())
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

	public canRunSimpleQueryAgainstShorthand = async () => {
		const results = await this.gql(
			`
        query($id: ID!){
            testSimpleQuery(id: $id) {
                id
                name
            }
        }`,
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
		const results = await this.gql(`
        query {
            getFirstUser {
                id
                name
            }
        }    
        `)

		const {
			data: { getFirstUser: user }
		} = results

		assert.isObject(user)
		assert.isString(user.id)
	}

	public gql = async (query: string, variables?: Record<string, any>) => {
		const result = await this.request.post('/graphql').send({
			query,
			variables
		})

		return result.body
	}

	public canRunGqlSequelizeQueryAgainstShorthand = async () => {
		const results = await this.gql(`
             query {
                loadFirstLocations(limit:10) {
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
}

describe('GQLMethodTests', function Tests() {
	new GQLMethodTests(`${__dirname}/../../spruce-skill/`, this)
})
