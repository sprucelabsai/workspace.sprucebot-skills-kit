import React from 'react'
import config from 'config'
import { render } from 'enzyme'
import { testUtils } from 'react-sprucebot'

import { JWT, auth, guests, teammates } from '../../__mocks__/users'

import Owner from '../../pages/owner'

let props = {}
beforeEach(async () => {
	auth()
	guests()
	teammates()
	props = await Owner.getInitialProps({
		store: testUtils.createStore({ config }),
		pathname: '/owner',
		query: { jwt: JWT }
	})
	expect(props.redirect).toBe(void 0)
})

test('renders owner page snapshot', () => {
	const tree = render(<Owner {...props} />)

	expect(tree).toMatchSnapshot()
})
