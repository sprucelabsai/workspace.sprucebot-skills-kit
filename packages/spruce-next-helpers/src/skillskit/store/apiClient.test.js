import nock from 'nock'
import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'

// axios.interceptors.request.use(request => {
// 	console.log('Starting Request', request)
// 	return request
// })

import ApiClient from './apiClient'

const methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
const ENDPOINT = 'https://localhost'

// Make sure axios plays nice in test env
axios.defaults.host = ENDPOINT
axios.defaults.adapter = httpAdapter

let mock, client
beforeEach(() => {
	mock = nock(ENDPOINT).defaultReplyHeaders({
		'Access-Control-Allow-Origin': '*'
	})
	client = new ApiClient(ENDPOINT, { allowSelfSignedCerts: true })
})
afterEach(() => {
	nock.cleanAll()
})
test('GET should 200', async () => {
	const scope = mock
		.get('/get')
		.query({ tester: true })
		.reply(200, { getSuccess: true })
	const response = await client.get('/get', {
		query: { tester: true }
	})
	expect(scope.isDone()).toBeTruthy()
	expect(response).toMatchSnapshot()
})
test('POST should 201', async () => {
	const body = { formBody: true }
	const scope = mock.post('/post', body).reply(201, { postSuccess: true })
	const response = await client.post('/post', {
		body
	})
	expect(scope.isDone()).toBeTruthy()
	expect(response).toMatchSnapshot()
})
test('PUT should 200', async () => {
	const body = { formBody: true }
	const scope = mock
		// .log(message => console.log('debug message', arguments))
		.put('/')
		.reply(200, { putSuccess: true })
	const response = await client.put('/', {
		// body
	})
	expect(scope.isDone()).toBeTruthy()
	expect(response).toMatchSnapshot()
})

test('PATCH should 200', async () => {
	const body = { formBody: true }
	const scope = mock
		.patch('/patch', () => true)
		.reply(200, { patchSuccess: true })
	const response = await client.patch('/patch', {
		body
	})
	expect(scope.isDone()).toBeTruthy()
	expect(response).toMatchSnapshot()
})

test('DELETE should 200', async () => {
	const body = { formBody: true }
	const scope = mock
		.delete('/delete', () => true)
		.reply(200, { deleteSuccess: true })
	const response = await client.delete('/delete', {
		body
	})
	expect(scope.isDone()).toBeTruthy()
	expect(response).toMatchSnapshot()
})

test('GET should 404', async () => {
	const scope = mock
		.get('/404')
		.query({ 404: true })
		.reply(404, { getSuccess: false })
	try {
		const response = await client.get('/404', {
			query: { 404: true }
		})
		expect(false).toBeTruthy() // Test should not get here
	} catch (response) {
		expect(scope.isDone()).toBeTruthy()
		expect(response).toMatchSnapshot()
	}
})

test('POST should 404', async () => {
	const body = { formBody: true }
	const scope = mock.post('/post404', body).reply(404, { postSuccess: false })

	try {
		const response = await client.post('/post404', {
			body
		})
		expect(false).toBeTruthy() // Test should not get here
	} catch (response) {
		expect(scope.isDone()).toBeTruthy()
		expect(response).toMatchSnapshot()
	}
})
test('PUT should 500', async () => {
	const body = { formBody: true }
	const scope = mock.put('/', body).reply(500, { putSuccess: false })

	try {
		const response = await client.put('/', {
			body
		})
		expect(false).toBeTruthy() // Test should not get here
	} catch (response) {
		expect(scope.isDone()).toBeTruthy()
		expect(response).toMatchSnapshot()
	}
})

test('PATCH should 404', async () => {
	const body = { formBody: true }
	const scope = mock
		.patch('/patch', () => true)
		.reply(404, { patchSuccess: false })

	try {
		const response = await client.patch('/patch', {
			body
		})
		expect(false).toBeTruthy() // Test should not get here
	} catch (response) {
		expect(scope.isDone()).toBeTruthy()
		expect(response).toMatchSnapshot()
	}
})

test('DELETE should 500', async () => {
	const body = { formBody: true }
	const scope = mock
		.delete('/delete', () => true)
		.reply(500, { deleteSuccess: false })
	try {
		const response = await client.delete('/delete', {
			body
		})
		expect(false).toBeTruthy() // Test should not get here
	} catch (response) {
		expect(scope.isDone()).toBeTruthy()
		expect(response).toMatchSnapshot()
	}
})
