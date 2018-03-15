import * as paging from './paging'
import { expect } from 'chai'

describe('Paging', () => {
	it('should return default values', () => {
		let { page, limit } = paging.normalize({ page: null, limit: null })
		expect(page).to.eq(0)
		expect(limit).to.eq(10)
	})
	it('should normalize', () => {
		let { page, limit } = paging.normalize({ page: 100, limit: 200 })
		expect(page).to.eq(100)
		expect(limit).to.eq(200)
	})
})
