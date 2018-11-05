import moment from 'moment'

const today = moment()

const eventDetails = {
	header: { title: 'Taco Bell', label: 'Appointment' },
	status: 'event-busy',
	list: { items: [] },
	footer: { primaryCTA: { text: 'DO IT NOW!' } }
}

export default [
	{
		id: 'da6e0219-6006-4d63-b5da-f5d40f6815c2',
		durationSec: 7200,
		startAt: today.set({ hour: 13, minute: 30 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: 'ee65a588-75f8-414c-b3b0-7d1e9f2c7a27',
		className: '',
		eventDetails,
		blocks: [
			{
				title: 'Hair Tinting',
				subtitle: '',
				durationSec: 60 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: true
			},
			{
				title: '',
				subtitle: '',
				durationSec: 45 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: false
			},
			{
				title: 'Finishing',
				subtitle: '',
				durationSec: 15 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: true
			}
		]
	},
	{
		id: 'da6e0219-6006-4d63-b5da-f5d40f6815c3',
		durationSec: 2700,
		startAt: today.set({ hour: 8, minute: 45 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: 'ee65a588-75f8-414c-b3b0-7d1e9f2c7a27',
		className: '',
		eventDetails,
		blocks: [
			{
				title: 'The Ultimate',
				subtitle: '',
				durationSec: 45 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: true
			}
		]
	},
	{
		id: 'da6e0219-6006-4d63-b5da-f5d40f6815c4',
		durationSec: 4500,
		startAt: today.set({ hour: 15, minute: 30 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: 'ee65a588-75f8-414c-b3b0-7d1e9f2c7a27',
		className: '',
		eventDetails,
		blocks: [
			{
				title: 'Shave',
				subtitle: '',
				durationSec: 45 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: true
			},
			{
				title: '',
				subtitle: '',
				durationSec: 15 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: false
			},
			{
				title: 'Finishing Time',
				subtitle: '',
				durationSec: 15 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: true
			}
		]
	},
	{
		id: 'da6e0219-6006-4d63-b5da-f5d40f6815c5',
		durationSec: 6300,
		startAt: today.set({ hour: 16, minute: 30 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: '78245981-5022-49a7-b2f2-6ac687e0f3d1',
		className: '',
		eventDetails,
		blocks: [
			{
				title: 'Wax',
				subtitle: '',
				durationSec: 30 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: true
			},
			{
				title: '',
				subtitle: '',
				durationSec: 30 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: false
			},
			{
				title: 'Finishing Time',
				subtitle: '',
				durationSec: 45 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: true
			}
		]
	},
	{
		id: 'da6e0219-6006-4d63-b5da-f5d40f6815c6',
		durationSec: 2700,
		startAt: today.set({ hour: 16 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: '78245981-5022-49a7-b2f2-6ac687e0f3d1',
		className: '',
		eventDetails,
		blocks: [
			{
				title: 'The Ultimate',
				subtitle: '',
				durationSec: 45 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: true
			}
		]
	},
	{
		id: 'da6e0219-6006-4d63-b5da-f5d40f6815c7',
		durationSec: 1800,
		startAt: today.set({ hour: 10 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: 'd9ce818a-0ef1-46ba-b44c-b293f5dbd0ff',
		className: '',
		eventDetails,
		blocks: [
			{
				title: 'Nose Wax',
				subtitle: '',
				durationSec: 30 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: true
			}
		]
	},
	{
		id: 'da6e0219-6006-4d63-b5da-f5d40f6815c8',
		durationSec: 3600,
		startAt: today.set({ hour: 11 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: 'd9ce818a-0ef1-46ba-b44c-b293f5dbd0ff',
		className: '',
		eventDetails,
		blocks: [
			{
				title: '24k Gold Facial',
				subtitle: '',
				durationSec: 30 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: true
			},
			{
				title: '',
				subtitle: '',
				durationSec: 15 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: false
			},
			{
				title: 'Finishing Time',
				subtitle: '',
				durationSec: 15 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: true
			}
		]
	},
	{
		id: 'da6e0219-6006-4d63-b5da-f5d40f6815c9',
		durationSec: 1800,
		startAt: today.set({ hour: 14, minute: 15 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: 'd9ce818a-0ef1-46ba-b44c-b293f5dbd0ff',
		className: '',
		eventDetails,
		blocks: [
			{
				title: 'Brow Wax',
				subtitle: '',
				durationSec: 30 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: true
			}
		]
	},
	{
		id: '66f30076-fa15-4501-aeab-c8da0b7988a1',
		durationSec: 5400,
		startAt: today.set({ hour: 9, minute: 15 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: '909beac7-42f7-443f-bd86-c762705c0c18',
		className: '',
		eventDetails,
		blocks: [
			{
				title: 'Spruced Up Shave',
				subtitle: '',
				durationSec: 45 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: true
			},
			{
				title: '',
				subtitle: '',
				durationSec: 15 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: false
			},
			{
				title: 'Finishing Time',
				subtitle: '',
				durationSec: 30 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: true
			}
		]
	},
	{
		id: '66f30076-fa15-4501-aeab-c8da0b7988a2',
		durationSec: 1800,
		startAt: today.set({ hour: 11 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: '909beac7-42f7-443f-bd86-c762705c0c18',
		className: '',
		eventDetails,
		blocks: [
			{
				title: 'Head Shave',
				subtitle: '',
				durationSec: 30 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: true
			}
		]
	},
	{
		id: '66f30076-fa15-4501-aeab-c8da0b7988a3',
		durationSec: 1800,
		startAt: today.set({ hour: 14, minute: 15 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: 'ce914128-c77c-40fa-b5ef-d6faa3ed26a1',
		className: '',
		eventDetails,
		blocks: [
			{
				title: 'Head Shave',
				subtitle: '',
				durationSec: 30 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: true
			}
		]
	},
	{
		id: '66f30076-fa15-4501-aeab-c8da0b7988a4',
		durationSec: 2700,
		startAt: today.set({ hour: 15 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: 'ce914128-c77c-40fa-b5ef-d6faa3ed26a1',
		className: '',
		eventDetails,
		blocks: [
			{
				title: 'Young Spruce',
				subtitle: '',
				durationSec: 45 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: true
			}
		]
	},
	{
		id: '66f30076-fa15-4501-aeab-c8da0b7988a5',
		durationSec: 1800,
		startAt: today.set({ hour: 10 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: '7a96fb12-b01c-45f3-9c09-d0922d5eaa44',
		className: '',
		eventDetails,
		blocks: [
			{
				title: 'Beard Trim',
				subtitle: '',
				durationSec: 30 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: true
			}
		]
	},
	{
		id: '66f30076-fa15-4501-aeab-c8da0b7988a6',
		durationSec: 6300,
		startAt: today.set({ hour: 12, minute: 15 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: '7a96fb12-b01c-45f3-9c09-d0922d5eaa44',
		className: '',
		eventDetails,
		blocks: [
			{
				title: 'The Ultimate',
				subtitle: '',
				durationSec: 45 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: true
			},
			{
				title: '',
				subtitle: '',
				durationSec: 30 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: false
			},
			{
				title: 'Finishing Time',
				subtitle: '',
				durationSec: 30 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: true
			}
		]
	},
	{
		id: '66f30076-fa15-4501-aeab-c8da0b7988a7',
		durationSec: 4500,
		startAt: today.set({ hour: 11, minute: 30 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: '061bb108-7795-4f62-972c-7ee426b71668',
		className: '',
		eventDetails,
		blocks: [
			{
				title: 'Signature',
				subtitle: '',
				durationSec: 45 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: true
			},
			{
				title: '',
				subtitle: '',
				durationSec: 15 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: false
			},
			{
				title: 'Finishing Time',
				subtitle: '',
				durationSec: 15 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: true
			}
		]
	},
	{
		id: '66f30076-fa15-4501-aeab-c8da0b7988a8',
		durationSec: 1800,
		startAt: today.set({ hour: 14 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: '061bb108-7795-4f62-972c-7ee426b71668',
		className: '',
		eventDetails,
		blocks: [
			{
				title: 'Head Shave',
				subtitle: '',
				durationSec: 30 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: true
			}
		]
	},
	{
		id: '66f30076-fa15-4501-aeab-c8da0b7988a9',
		durationSec: 1800,
		startAt: today.set({ hour: 15 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: '061bb108-7795-4f62-972c-7ee426b71668',
		className: '',
		eventDetails,
		blocks: [
			{
				title: 'Signature Follow-up',
				subtitle: '',
				durationSec: 30 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: true
			}
		]
	},
	{
		id: 'e911af72-9bbf-4a8b-b588-d24e7a938057',
		durationSec: 5400,
		startAt: today.set({ hour: 9, minute: 45 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: '724d2986-ba56-4560-a1ab-74088b974274',
		className: '',
		eventDetails,
		blocks: [
			{
				title: 'Beard Tinting',
				subtitle: '',
				durationSec: 45 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: true
			},
			{
				title: '',
				subtitle: '',
				durationSec: 30 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: false
			},
			{
				title: 'Finishing Time',
				subtitle: '',
				durationSec: 15 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: true
			}
		]
	},
	{
		id: 'e911af72-9bbf-4a8b-b588-d24e7a938058',
		durationSec: 1800,
		startAt: today.set({ hour: 12 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: '724d2986-ba56-4560-a1ab-74088b974274',
		className: '',
		eventDetails,
		blocks: [
			{
				title: 'Brow Wax',
				subtitle: '',
				durationSec: 30 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: true
			}
		]
	},
	{
		id: 'e911af72-9bbf-4a8b-b588-d24e7a938059',
		durationSec: 2700,
		startAt: today.set({ hour: 14 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: '724d2986-ba56-4560-a1ab-74088b974274',
		className: '',
		eventDetails,
		blocks: [
			{
				title: 'Nose Wax',
				subtitle: '',
				durationSec: 30 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: true
			}
		]
	},
	{
		id: 'e911af72-9bbf-4a8b-b588-d24e7a938060',
		durationSec: 3600,
		startAt: today.set({ hour: 10, minute: 30 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: 'df65bf1f-efae-41bd-af5f-a8714807dfef',
		className: '',
		eventDetails,
		blocks: [
			{
				title: '24k Gold Facial',
				subtitle: '',
				durationSec: 30 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: true
			},
			{
				title: '',
				subtitle: '',
				durationSec: 15 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: false
			},
			{
				title: 'Finishing Time',
				subtitle: '',
				durationSec: 15 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: true
			}
		]
	},
	{
		id: 'e911af72-9bbf-4a8b-b588-d24e7a938061',
		durationSec: 2700,
		startAt: today.set({ hour: 13, minute: 30 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: 'df65bf1f-efae-41bd-af5f-a8714807dfef',
		className: '',
		eventDetails,
		blocks: [
			{
				title: 'Clothing Consult',
				subtitle: '',
				durationSec: 45 * 60,
				leftIcons: [],
				rightIcons: [],
				className: '',
				markAsBusy: true
			}
		]
	}
]
