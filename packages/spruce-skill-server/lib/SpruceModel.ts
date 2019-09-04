/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Model } from 'sequelize'
import { ISpruceModels } from '../interfaces/models'

/************************************************************
 * Base Spruce core class that all models inherit from.
 ************************************************************/
export default class SpruceCoreModel<T> extends Model<T> {
	public static associate(models: ISpruceModels): void {}
}
