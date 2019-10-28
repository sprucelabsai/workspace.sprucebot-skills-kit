/* eslint-disable @typescript-eslint/no-unused-vars */
import { assert } from 'chai'
import SpruceTest from './lib/SpruceTest'
import { ISpruceContext } from '../interfaces/ctx'
import gql from 'graphql-tag'

class GetUIEnhancementsTests extends SpruceTest<ISpruceContext> {
	public setup(): void {
		it('Can get ui enhancements', () => this.getUIEnhancements())
	}

	public async getUIEnhancements(): Promise<void> {
		let didFire = false
		global.testEmitResponse['get-ui-enhancements'] = {
			callback: async ({ data, query }) => {
				assert.isUndefined(query)
				assert.isDefined(data)
				didFire = true
			},
			data: [
				{
					payload: {
						sections: [
							{
								id: 'guest',
								calendarEventDetailsItems: [
									{
										type: 'Text',
										viewModel: {
											id: 'e2375801-d893-4c98-bdf7-bab8f2ca76ec',
											text: 'Someone - Testing User on Oct 23rd @ 5:31 pm'
										}
									}
								]
							}
						]
					}
				}
			]
		}

		const query = gql`
			{
				getUIEnhancements(
					view: "calendar-event-details"
					organizationId: "${this.organization.id}"
					locationId: "${this.location.id}"
				) {
					sections {
						id
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

		console.log(body)

		assert.isTrue(didFire)
	}
}

describe('GetUIEnhancementsTests', function Tests() {
	new GetUIEnhancementsTests(`${__dirname}/../../spruce-skill/`, this)
})
