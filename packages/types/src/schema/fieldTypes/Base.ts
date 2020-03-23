import { FieldType, IField } from '.'

export interface IFieldBase {
	/** the type of field this is, will strongly type props for us */
	type: FieldType
	/** generates in only for local interface and does not share with other skills */
	isPrivate?: boolean
	/** the permissions used in different contexts */
	acls?: {
		create: {
			[slug: string]: string[]
		}
		read: {
			[slug: string]: string[]
		}
		update: {
			[slug: string]: string[]
		}
		delete: {
			[slug: string]: string[]
		}
	}
	/** does this value store more than one item? */
	isArray?: boolean
	/** how this field is represented to the end-user as an html label or when collecting input from cli */
	label?: string
	/** give an example of how someone should think about this field or give an example of what it may be */
	hint?: string
	/** the default for for this if no value is set */
	defaultValue?: any
	/** the curret value for this field */
	value?: any
	/** is this field required */
	isRequired?: boolean
	/** unique options overriden by the fields that extend it */
	options?: Record<string, any>
}

export default class FieldBase<T extends IField = IField> {
	definition: T
	constructor(definition: T) {
		this.definition = definition
	}

	getOptions = () => {
		return this.definition.options
	}

	isRequired = () => {
		return !!this.definition.isRequired
	}

	isArray = () => {
		return !!this.definition.isArray
	}

	getLabel = () => {
		return this.definition.label
	}

	/** validate a value against this field */
	validate = (value: any): string[] => {
		const errors = []
		if ((typeof value === 'undefined' || value === null) && this.isRequired()) {
			errors.push('missing_required')
		}

		return errors
	}

	/** transform any value to the value type of this field */
	toValueType = (value: any): any => {
		return value
	}
}
