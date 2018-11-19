module.exports = {
	title: 'Message',
	context: {
		from: {
			name: 'Sprucebot',
			isOnline: true,
			images: [
				{
					src:
						'https://images.unsplash.com/photo-1527430253228-e93688616381?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=27cb9825641b4d2eccbf9d841c086375&auto=format&fit=crop&w=80&h=80&q=80',
					alt: 'Sprucebot',
					isSprucebot: true
				}
			]
		},
		dateSent: '2:33pm',
		body:
			'<p>Dorian booked an appointment for <a href="#">The Regular with Camila Hintz today at 3pm</a>.</p>',
		detail: 'Booked via Booking Skill',
		followUp: {
			text: 'Confirm Appointment'
		}
	}
}
