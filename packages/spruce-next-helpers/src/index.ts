import { Request, Response } from 'koa'

export {
	default as skill,
	ISkill,
	ISearchForUserLegacy,
	IBigSearch,
	ISaveBar,
	ICalendar,
	IConfirmationDialog,
	IModal,
	ISupportingMessage,
	IBlockingMessage
} from './skillskit'
export { default as _document } from './skillskit/next/_document'
export { default as PageWrapper } from './skillskit/next/PageWrapper'
export { default as withStore, createStore } from './skillskit/store/withStore'
export { default as lang } from './skillskit/helpers/lang'
export { default as sharable } from './skillskit/helpers/sharable'
export { default as gqlClient } from './skillskit/helpers/gqlClient'
export { default as settings } from './skillskit/helpers/settings'

// TODO move to PageWrapper once it's moved to typescript
export interface IInitialPropsContext<IAuth> {
	auth: IAuth & { jwt: string }
	pathname: string
	query: Record<string, any>
	asPath: string
	store: any
	res: Response
	req: Request
}
