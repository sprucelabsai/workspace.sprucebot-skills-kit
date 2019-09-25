export * from './src/generated/hw-gql'
export * from './src/generated/api-gql'
export { Maybe, Scalars } from './src/combinedGQL'
export * from './src/events'
export * from './src/events/reschedule-calendar-event'
export * from './src/core'

import { IHWActionCoreRedirect, IHWActionTypes } from './src/generated/hw-gql'

export interface IHWActionCoreRedirect {
	type: IHWActionTypes.CoreRedirect
}
