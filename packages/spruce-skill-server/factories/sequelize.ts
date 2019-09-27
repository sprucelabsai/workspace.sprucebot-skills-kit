/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import Umzug from 'umzug'
import config from 'config'
import Debug from 'debug'
const debug = Debug('spruce-skill-server')

const defaultModelsDir = path.resolve(__dirname, '../models')

function filterFile(file: string): boolean {
	const didFilter =
		file.indexOf('.') !== 0 &&
		file !== 'index.js' &&
		/\.(js|ts)$/.test(file) &&
		/\.d\.ts$/.test(file) === false
	if (!didFilter) {
		debug(`Filtered file from sequelize import() model %s`, file)
	}
	return didFilter
}

export default (
	passedOptions: {
		runMigrations: boolean
		modelsDir: string
		migrationsDir: string
		database: any
		metricsEnabled: boolean
		metricsSequelizeDisabled: boolean
		options: Record<string, any>
	},
	key: string,
	ctx: Record<string, any>
) => {
	const {
		runMigrations,
		modelsDir,
		migrationsDir,
		database,
		metricsEnabled,
		metricsSequelizeDisabled,
		options
	} = passedOptions

	// read all models and import them into the ctx["key"] object
	const sqlOptions = {
		operatorsAliases: false,
		...{ ...options, dialect: database.dialect }
	}

	// TODO move testing to a prop we check vs process.env
	const databaseUrl =
		process.env.TESTING !== 'true' ? database.url : config.DATABASE_URL_TESTING

	// @ts-ignore
	const sequelize = new Sequelize(databaseUrl, sqlOptions)

	// Add sequelize logger
	if (metricsEnabled && !metricsSequelizeDisabled) {
		global.logger.sequelizeHooks(sequelize)
	} else {
		log.info('Metrics: Sequelize hooks disabled')
	}

	const coreModels = fs.existsSync(defaultModelsDir)
		? fs
				.readdirSync(defaultModelsDir)
				.filter(filterFile)
				.map(file => path.resolve(defaultModelsDir, file))
		: []

	let skillModels: string[] = []
	if (fs.existsSync(modelsDir)) {
		skillModels = fs
			.readdirSync(modelsDir)
			.filter(filterFile)
			.map(file => path.resolve(modelsDir, file))
	}

	// All models available together <3
	debug('Loading core and skill models', {
		coreModels,
		skillModels
	})
	const models: Record<string, any> = coreModels
		.concat(skillModels)
		.reduce((models: Record<string, any>, file) => {
			const modelToLoad = require(file)
			// Support both TS import and require style
			const model = modelToLoad.default
				? modelToLoad.default(sequelize, Sequelize, ctx)
				: modelToLoad(sequelize, Sequelize, ctx)

			models[model.name] = model

			if (!model.scopes) {
				model.scopes = {
					public: {
						attributes: []
					}
				}
			}
			model.scopeObj = {}
			Object.keys(model.scopes).forEach(scope => {
				model.scopeObj[scope] = {}
				if (model.scopes[scope] && model.scopes[scope].attributes) {
					model.scopes[scope].attributes.forEach((key: string) => {
						model.scopeObj[scope][key] = true
					})
				}
			})

			debug('Imported Skill Model: ', model.name)
			return models
		}, {})

	Object.keys(models).forEach(function(modelName) {
		if (models[modelName].hasOwnProperty('associate')) {
			models[modelName].associate(models)
		}
	})

	// We should only run sync() on the skill db.
	// Core handles it's own migrations
	// So don't run migrations on any model relies on core db
	async function sync(): Promise<void> {
		const filteredModels: Record<string, any>[] = []
		Object.keys(models).forEach(key => {
			const model = models[key]
			if ((!model.options.doNotSync && !model.doNotSync) || config.TESTING) {
				debug('Allowing this model to sync()', model.name)
				filteredModels.push(model)
			} else {
				debug(`Model sync disabled for: ${model.name}`)
			}
		})

		// Run migrations if enabled
		if (runMigrations && fs.existsSync(migrationsDir)) {
			debug('Running sequelize migrations')
			const umzug = new Umzug({
				storage: 'sequelize',
				storageOptions: {
					sequelize
				},
				migrations: {
					params: [sequelize.getQueryInterface(), sequelize.constructor],
					path: migrationsDir,
					pattern: /\.js$/
				}
			})

			// Run Migrations
			await umzug.up()

			debug('Finished sequelize migrations')
		} else {
			console.warn(
				'Could not find any migrations sequelize migrationsDir %s',
				migrationsDir
			)
		}

		// Run sync against models
		for (let i = 0; i < filteredModels.length; i += 1) {
			const modelToSync = filteredModels[i]
			try {
				debug(`Syncing model: ${modelToSync.name}`)
				await modelToSync.sync()
			} catch (e) {
				log.crit(`Unable to sync Model: ${modelToSync.name}`, e)
			}
		}
	}

	ctx[key] = { models, sequelize, sync, Sequelize }
}
