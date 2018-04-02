// This sample demonstrates how you can write your services tests
// You can delete sample.js and sample.test.js from your skill before production

import * as SampleService from './sample'

describe('SampleService', () => {
	beforeEach(() => {
		// Mock the sb middleware
		SampleService.sb = {
			metas: key => {
				if (key === 'sampleKey') {
					return {
						value: 'sampleMeta'
					}
				}
				return null
			}
		}

		// Mock the db middleware
		SampleService.db = {
			models: {
				Sample: {
					count: () => {
						return 100
					}
				}
			}
		}
	})
	it('should getSomeMetas', () => {
		let metas = SampleService.getSomeMetas('sampleKey')
		expect(metas.value).toEqual('sampleMeta')
	})
	it('should getSomeDatabaseCount', () => {
		let count = SampleService.getSomeDatabaseCount()
		expect(count).toEqual(100)
	})
})
