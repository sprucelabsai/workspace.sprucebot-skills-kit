// TODO: Convert to new schema definitions
// import { ISpruceSchema } from './schema/schema'

// export interface ISprucePageSettings {
// 	title: string
// 	page: string
// 	id: string
// 	schema: ISpruceSchema
// }

export enum SpruceSettingsFieldType {
	Text = 'text',
	Boolean = 'boolean',
	Select = 'select',
	Duration = 'duration'
}

export interface ISpruceSettingsField {
	name: string
	type:
		| SpruceSettingsFieldType.Text
		| SpruceSettingsFieldType.Boolean
		| SpruceSettingsFieldType.Duration
		| SpruceSettingsFieldType.Select
	acls?: {
		[slug: string]: string[]
	}
	props: Record<string, any>
}

export interface ISpruceSettingsSection {
	title?: string
	fields: ISpruceSettingsField[]
}

export interface ISprucePageSettings {
	title: string
	page: string
	id: string
	sections: ISpruceSettingsSection[]
}
