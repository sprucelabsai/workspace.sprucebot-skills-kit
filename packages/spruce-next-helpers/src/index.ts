import { Request, Response } from 'koa'
import { ISkill } from './skillskit'
import { IButtonProps } from '@sprucelabs/react-heartwood-components'

export {
	default as skill,
	ISkill,
	ISearchForUserLegacy,
	IBigSearch,
	ISaveBar,
	ICalendar,
	IConfirmationDialog,
	IModal,
	IModalOpenOptions,
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
export { default as errors } from './skillskit/helpers/errors'

// TODO move to PageWrapper once it's moved to typescript
export interface IPageInitialPropsContext<IAuth> {
	auth: IAuth & { jwt: string }
	pathname: string
	query: Record<string, any>
	asPath: string
	store: any
	res: Response
	req: Request
	isServer: boolean
}

/** Initial props for a page */
export interface IPageInitialProps {
	skill: ISkill
}

export interface IPageInitialPropsError {
	statusCode: number
	errorMessage?: any
	errorCTA?: IButtonProps
}

export interface IPageInitialPropsRedirect {
	redirect: string
}

export interface IPageInitialPropsPublicPage {
	public: boolean
}
