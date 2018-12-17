import Faker from 'Faker'
import uuidv1 from 'uuid/v1'

export const generateLocations = ({ amount }) => {
	const locations = []

	for (let i = 0; i < amount; i++) {
		locations.push({
			id: Faker.random.number(amount),
			publicName: Faker.Company.companyName(),
			storeNumber: Faker.random.number(amount),
			status: 'open',
			address:
				Faker.Address.streetAddress() +
				', ' +
				Faker.Address.city() +
				', IL ' +
				Faker.Address.zipCode('#####')
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
