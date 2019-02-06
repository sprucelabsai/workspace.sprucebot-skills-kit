module.exports = {
	title: 'Feed',
	context: {
		feedItems: [
			{
				from: {
					name: 'Sprucebot',
					isOnline: true,
					isSprucebot: true,
					image: {
						src:
							'https://images.unsplash.com/photo-1527430253228-e93688616381?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=27cb9825641b4d2eccbf9d841c086375&auto=format&fit=crop&w=80&h=80&q=80',
						alt: 'Sprucebot'
					}
				},
				dateSent: '8:27am',
				body:
					'<p>Dorian booked an appointment for <a href="#">The Regular with Camila Hintz today at 3pm</a>.</p>',
				detail: 'Booked via Booking Skill',
				reply: {
					iconClass: 'message__reply-icon message__reply-icon-success',
					icon:
						'<path d="M4 8.81534L5.63333 11.1333C5.75904 11.3211 5.96772 11.4366 6.19358 11.4433C6.41944 11.4501 6.63464 11.3473 6.77133 11.1673L12 4.552" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M8 15.4994C12.1421 15.4994 15.5 12.1415 15.5 7.99939C15.5 3.85725 12.1421 0.49939 8 0.49939C3.85786 0.49939 0.5 3.85725 0.5 7.99939C0.5 12.1415 3.85786 15.4994 8 15.4994Z" stroke-linecap="round" stroke-linejoin="round"/>',
					text: 'Appointment confirmed by Camila Hintz at 8:47am'
				}
			}
		]
	},
	variants: []
}
