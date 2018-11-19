const Classes = require('../../../classes')

module.exports = {
	title: 'Sidebar',
	context: {
		items: [
			{
				text: 'Teammates'
			},
			{
				text: 'Guests',
				icon:
					'<path fill-rule="evenodd" clip-rule="evenodd" d="M7.50065 9.79199C6.92565 9.79199 6.45898 10.2587 6.45898 10.8337C6.45898 11.4087 6.92565 11.8753 7.50065 11.8753C8.07565 11.8753 8.54232 11.4087 8.54232 10.8337C8.54232 10.2587 8.07565 9.79199 7.50065 9.79199V9.79199ZM12.5007 9.79199C11.9257 9.79199 11.459 10.2587 11.459 10.8337C11.459 11.4087 11.9257 11.8753 12.5007 11.8753C13.0757 11.8753 13.5423 11.4087 13.5423 10.8337C13.5423 10.2587 13.0757 9.79199 12.5007 9.79199V9.79199ZM10.0003 1.66699C5.40033 1.66699 1.66699 5.40033 1.66699 10.0003C1.66699 14.6003 5.40033 18.3337 10.0003 18.3337C14.6003 18.3337 18.3337 14.6003 18.3337 10.0003C18.3337 5.40033 14.6003 1.66699 10.0003 1.66699V1.66699ZM10.0007 16.6669C6.32565 16.6669 3.33398 13.6753 3.33398 10.0003C3.33398 9.75859 3.35065 9.51693 3.37565 9.28359C5.34232 8.40859 6.90065 6.80026 7.71732 4.80859C9.22565 6.94193 11.709 8.33359 14.5173 8.33359C15.1673 8.33359 15.7923 8.25859 16.3923 8.11693C16.5673 8.70859 16.6673 9.34193 16.6673 10.0003C16.6673 13.6753 13.6756 16.6669 10.0007 16.6669V16.6669Z" />'
			},
			{
				text: 'Teammates',
				action: 'Add'
			}
		]
	}
}
