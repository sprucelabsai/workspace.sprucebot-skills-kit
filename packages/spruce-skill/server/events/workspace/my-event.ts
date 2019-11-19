import { eventError } from '../../lib/errorHandler'
import { ISkillEventContextV2 } from '../../interfaces/ctx'
import { SpruceEvents } from 'server/interfaces/events-generated'
import faker from 'faker'
import _ from 'lodash'

interface RandomPerson {
	personNum: number
	firstName: string
	lastName: string
	childNames?: string[]
}

export default async (
	ctx: ISkillEventContextV2<
		SpruceEvents.workspace.MyEvent.IPayload,
		SpruceEvents.workspace.MyEvent.IResponseBody
	>,
	next: () => Promise<any>
) => {
	try {
		if (!ctx.event.payload) {
			throw new Error('MISSING_PARAMETERS')
		}

		const { myVar } = ctx.event.payload

		log.debug({ myVar })

		const randomPeople: RandomPerson[] = []

		const num = _.random(10, 50)
		_.times(num, () => {
			const person: RandomPerson = {
				personNum: _.random(1, 10000000000),
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName()
			}

			if (_.sample([true, false])) {
				person.childNames = []
				const numChildren = _.random(1, 5)
				_.times(numChildren, () => {
					person.childNames && person.childNames.push(faker.lorem.word())
				})
			}

			randomPeople.push(person)
		})

		ctx.body = { status: 'success', randomPeople }
		await next()
	} catch (e) {
		eventError({
			ctx,
			next,
			e
		})
	}
}
