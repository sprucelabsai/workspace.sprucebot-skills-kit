/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Model, Sequelize, DataTypes } from 'sequelize'
import { ISpruceModels } from '../interfaces/models'

/************************************************************
 * Base Spruce core class that all models inherit from.
 ************************************************************/
export default class SpruceCoreModel<T> extends Model<T> {
	public static readonly timestamps = true
	public static readonly paranoid = true
	public static readonly indexes = []
	public static readonly attributes = {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		}
	}
	/** 🌲🤖 This method is called to initialize your model */
	public static initialize(
		sequelize: Sequelize,
		/**
		 * Optionally override sequelize init options
		 *
		 * Note that "timestamps", "paranoid", and "indexes" can be defined as static readonly members of the model.
		 *
		 * For additional configuration options see: https://sequelize.org/master/manual/models-definition.html#configuration
		 * */
		overrideOptions?: Record<string, any>
	): void {
		const finalOptions = {
			timestamps: this.timestamps,
			paranoid: this.paranoid,
			indexes: this.indexes,
			sequelize,
			...overrideOptions
		}
		return this.init(this.attributes, finalOptions)
	}
	public static associate(models: ISpruceModels): void {}
}
