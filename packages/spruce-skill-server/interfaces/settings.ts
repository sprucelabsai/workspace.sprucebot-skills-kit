export enum SpruceSettingsFieldType {
	TEXT = 'text',
	BOOLEAN = 'boolean',
	SELECT = 'select',
	DURATION = 'duration'
}

export interface ISpruceSettingsField {
	name: string
	type:
		| SpruceSettingsFieldType.TEXT
		| SpruceSettingsFieldType.BOOLEAN
		| SpruceSettingsFieldType.DURATION
		| SpruceSettingsFieldType.SELECT
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
