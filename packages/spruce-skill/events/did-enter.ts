import { Mercury, MercurySubscriptionScope } from '@sprucelabs/mercury'
import { ISkillContext } from '../.spruce/interfaces/ctx'
import { SpruceEvents } from '../.spruce/interfaces/events-generated'

export default (options: { ctx: ISkillContext; mercury: Mercury }) => {
	const { ctx, mercury } = options

	log.debug('Setting up mercury event listener...')

	mercury.on(
		{
			eventName: SpruceEvents.core.DidEnter.name,
			scope: MercurySubscriptionScope.Location,
			organizationId: '0a1a5e00-debc-410d-9e14-f7b7c16e8ec2',
			locationId: '3d9b29eb-ab0e-481a-834c-6c57315c32b4'
		},
		() => log.debug('Recieved did-enter event!')
	)
}
