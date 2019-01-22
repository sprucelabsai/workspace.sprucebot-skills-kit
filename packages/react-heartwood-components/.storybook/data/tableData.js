import faker from 'faker'
import uuidv1 from 'uuid/v1'

export const generateLocations = ({ amount }) => {
	const locations = []

	for (let i = 0; i < amount; i++) {
		locations.push({
			id: uuidv1(),
			publicName: faker.company.companyName(),
			storeNumber: faker.random.number(amount),
			status: Math.floor(Math.random() * 2) == 0 ? 'Open' : 'Hidden',
			address:
				faker.address.streetAddress() +
				', ' +
				faker.address.city() +
				', ' +
				faker.address.stateAbbr() +
				' ' +
				faker.address.zipCode()
		})
	}

	return locations
}

export const data = [
	{
		id: 1,
		publicName: 'Michigan Avenue',
		storeNumber: '001',
		status: 'open',
		address: '430 North Michigan Avenue, Chicago, IL 60611'
	},
	{
		id: 2,
		publicName: 'The Gateway Center',
		storeNumber: '002',
		status: 'open',
		address: '16 South Halsted Street, Chicago, IL 60661'
	},
	{
		id: 3,
		publicName: 'Roosevelt Collection',
		storeNumber: '003',
		status: 'open',
		address: '1107 South Delano Court East, Chicago, IL 60605'
	}
]