/**
 * SpruceDataTypes are used to define contracts between your skill and the Spruce platform
 * See https://developer.spruce.ai for more information
 */
export enum SpruceDataTypes {
	/** Using the "any" type should be a last resort */
	Any = 'any',

	/** A string */
	String = 'string',

	/** An object */
	Object = 'object',

	/** A number */
	Number = 'number',

	/** Boolean */
	Boolean = 'boolean',

	/** 🛑 Core API only */
	Raw = 'raw'
}
