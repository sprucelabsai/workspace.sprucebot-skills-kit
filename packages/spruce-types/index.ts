export * from './src/generated/hw-gql'
export * from './src/generated/api-gql'
export { Maybe, Scalars } from './src/combinedGQL'
export * from './src/events'
export * from './src/events/reschedule-calendar-event'
export * from './src/core'

/**
 * Action Executer Overrides
 */
import {
	IHWActionCoreRedirect,
	IHWActionSkillViewRedirect,
	IHWActionTypes
} from './src/generated/hw-gql'

export interface IActionCoreRedirect extends IHWActionCoreRedirect {
	type: IHWActionTypes.CoreRedirect
}

export interface IActionSkillViewRedirect extends IHWActionSkillViewRedirect {
	type: IHWActionTypes.SkillViewRedirect
}

export type IHWactions = IActionCoreRedirect | IActionSkillViewRedirect
