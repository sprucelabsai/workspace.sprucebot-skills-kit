import * as paging from './paging'

describe('Paging', () => {
	it('should return default values', () => {
		let { page, limit } = paging.normalize({ page: null, limit: null })
		expect(page).toEqual(0)
		expect(limit).toEqual(10)
	})
	it('should normalize', () => {
		let { page, limit } = paging.normalize({ page: 100, limit: 200 })
		expect(page).toEqual(100)
		expect(limit).toEqual(200)
	})
})
