import config from 'config'
import { IGQLResolvers } from '../../../../interfaces/gql'
import { ISpruceContext } from '../../../../interfaces/ctx'

export default (ctx: ISpruceContext) => {
	if (!config.UI_ENHANCEMENTS_ENABLED) {
		log.debug('UI_Enhancements GQL endpoint is disabled')
		return {}
	}

	const uiEnhancements: IGQLResolvers<ISpruceContext> = {
		sdl: ``,
		resolvers: {
			Query: {
				getUiEnhancements: (source, args, context, info) => {
					console.log('in', ctx, source, args, context, info)
				}
			}
		}
	}

	return uiEnhancements
}
