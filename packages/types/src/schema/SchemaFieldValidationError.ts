export default class SchemaFieldValidationError extends Error {
	errorMessages: string[]
	fieldName: string

	constructor(fieldName: string, errors: string[]) {
		super(`${fieldName}: ${errors.join(', ')}`)
		this.errorMessages = errors
		this.fieldName = fieldName
	}

	friendlyReason = () => {
		return `${this.fieldName}: ${this.errorMessages.join(', ')}`
	}
}
