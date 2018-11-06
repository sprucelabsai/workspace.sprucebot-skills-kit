import moment from 'moment'

import Icon from '../Icon/Icon'
import NoteIcon from '../../../static/assets/icons/Interface-Essential/Form-Edition/paper-write.svg'
import ServiceIcon from '../../../static/assets/icons/Interface-Essential/Lists/list-bullets-1.svg'
import StatusIcon from '../../../static/assets/icons/Interface-Essential/Time/stopwatch.svg'

const today = moment()

const details = {
	header: { title: 'Taco Bell', label: 'Appointment' },
	status: 'event-busy',
	list: { items: [] },
	footer: { primaryCTA: { text: 'DO IT NOW!' } }
}

export default [
	{
		id: 'da6e0219-6006-4d63-b5da-f5d40f6815c2',
		durationSec: 7200,
		startAt: today.set({ hour: 13, minute: 0 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: 'ee65a588-75f8-414c-b3b0-7d1e9f2c7a27',
		className: '',
		details: {
			header: { title: 'Cooper Moore', label: 'Appointment' },
			list: {
				items: [
					{
						avatar:
							'https://images.unsplash.com/photo-1535441577682-5a7bc0702a7d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=077e17fb017e1258f3d5d3709729640a&auto=format&fit=crop&w=80&h=80&q=80',
						title: 'Cooper Moore',
						subtitle: '(364) 106-7572',
						contextMenu: {
							isSimple: true,
							actions: [
								{
									text: 'Guest notes'
								}
							]
						}
					},
					{
						icon: <NoteIcon isLineIcon />,
						title: 'Prefers products that aren’t tested on animals.',
						subtitle: 'Caleigh Jerde, 4 months ago',
						actions: [
							{
								kind: 'simple',
								icon: <Icon icon="edit" className="btn__line-icon" />
							}
						]
					},
					{
						icon: <Icon icon="date" isLineIcon />,
						title: 'Tues, Nov 6, 2018',
						subtitle: '1-3pm'
					},
					{
						icon: <ServiceIcon isLineIcon />,
						title: 'Services',
						subtitle: '<p>Hair Tinting</p><p>$70 | 2hrs</p>',
						actions: [
							{
								kind: 'simple',
								icon: <Icon icon="add" />
							},
							{
								kind: 'simple',
								icon: <Icon icon="edit" className="btn__line-icon" />
							}
						]
					},
					{
						icon: <StatusIcon isLineIcon />,
						title: 'Status',
						subtitle: 'Confirmed',
						contextMenu: {
							isSimple: true,
							icon: <Icon icon="edit" className="btn__line-icon" />,
							actions: [
								{
									text: 'Check guest in'
								},
								{
									text: 'Mark as late'
								},
								{
									text: 'Mark as no show'
								}
							]
						}
					}
				]
			},
			footer: {
				primaryCTA: {
					text: 'Check guest in'
				}
			}
		},
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
		className: 'event-fill-2',
		details: {
			header: { title: 'Cooper Moore', label: 'Appointment' },
			list: {
				items: [
					{
						avatar:
							'https://images.unsplash.com/photo-1535441577682-5a7bc0702a7d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=077e17fb017e1258f3d5d3709729640a&auto=format&fit=crop&w=80&h=80&q=80',
						title: 'Cooper Moore',
						subtitle: '(364) 106-7572',
						contextMenu: {
							isSimple: true,
							actions: [
								{
									text: 'Guest notes'
								}
							]
						}
					},
					{
						icon: <NoteIcon isLineIcon />,
						title: 'Prefers products that aren’t tested on animals.',
						subtitle: 'Caleigh Jerde, 4 months ago',
						actions: [
							{
								kind: 'simple',
								icon: <Icon icon="edit" className="btn__line-icon" />
							}
						]
					},
					{
						icon: <Icon icon="date" isLineIcon />,
						title: 'Tues, Nov 6, 2018',
						subtitle: '8:45-9:30am'
					},
					{
						icon: <ServiceIcon isLineIcon />,
						title: 'Services',
						subtitle: '<p>The Ultimate</p><p>$70 | 45min</p>',
						actions: [
							{
								kind: 'simple',
								icon: <Icon icon="add" />
							},
							{
								kind: 'simple',
								icon: <Icon icon="edit" className="btn__line-icon" />
							}
						]
					},
					{
						icon: <StatusIcon isLineIcon />,
						title: 'Status',
						subtitle: 'Services Complete',
						contextMenu: {
							isSimple: true,
							icon: <Icon icon="edit" className="btn__line-icon" />,
							actions: [
								{
									text: 'Check guest in'
								},
								{
									text: 'Mark as late'
								},
								{
									text: 'Mark as no show'
								}
							]
						}
					}
				]
			},
			footer: {
				primaryCTA: {
					text: 'Send to checkout'
				}
			}
		},
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
		details: {
			header: { title: 'Cooper Moore', label: 'Appointment' },
			list: {
				items: [
					{
						avatar:
							'https://images.unsplash.com/photo-1535441577682-5a7bc0702a7d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=077e17fb017e1258f3d5d3709729640a&auto=format&fit=crop&w=80&h=80&q=80',
						title: 'Cooper Moore',
						subtitle: '(364) 106-7572',
						contextMenu: {
							isSimple: true,
							actions: [
								{
									text: 'Guest notes'
								}
							]
						}
					},
					{
						icon: <NoteIcon isLineIcon />,
						title: 'Prefers products that aren’t tested on animals.',
						subtitle: 'Caleigh Jerde, 4 months ago',
						actions: [
							{
								kind: 'simple',
								icon: <Icon icon="edit" className="btn__line-icon" />
							}
						]
					},
					{
						icon: <Icon icon="date" isLineIcon />,
						title: 'Tues, Nov 6, 2018',
						subtitle: '9:15-10:45am'
					},
					{
						icon: <ServiceIcon isLineIcon />,
						title: 'Services',
						subtitle: '<p>Spruced Up Shave</p><p>$40 | 45min</p>',
						actions: [
							{
								kind: 'simple',
								icon: <Icon icon="add" />
							},
							{
								kind: 'simple',
								icon: <Icon icon="edit" className="btn__line-icon" />
							}
						]
					},
					{
						icon: <StatusIcon isLineIcon />,
						title: 'Status',
						subtitle: 'Paid',
						contextMenu: {
							isSimple: true,
							icon: <Icon icon="edit" className="btn__line-icon" />,
							actions: [
								{
									text: 'Check guest in'
								},
								{
									text: 'Mark as late'
								},
								{
									text: 'Mark as no show'
								}
							]
						}
					}
				]
			}
		},
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
		durationSec: 7200,
		startAt: today.set({ hour: 16, minute: 30 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: '78245981-5022-49a7-b2f2-6ac687e0f3d1',
		className: '',
		details,
		blocks: [
			{
				title: 'Wax',
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
		startAt: today.set({ hour: 13, minute: 0 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: '78245981-5022-49a7-b2f2-6ac687e0f3d1',
		className: '',
		details,
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
		durationSec: 2700,
		startAt: today.set({ hour: 10, minute: 30 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: 'd9ce818a-0ef1-46ba-b44c-b293f5dbd0ff',
		className: 'event-fill-3',
		details: {
			header: { title: 'Cooper Moore', label: 'Appointment' },
			list: {
				items: [
					{
						avatar:
							'https://images.unsplash.com/photo-1535441577682-5a7bc0702a7d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=077e17fb017e1258f3d5d3709729640a&auto=format&fit=crop&w=80&h=80&q=80',
						title: 'Cooper Moore',
						subtitle: '(364) 106-7572',
						contextMenu: {
							isSimple: true,
							actions: [
								{
									text: 'Guest notes'
								}
							]
						}
					},
					{
						icon: <NoteIcon isLineIcon />,
						title: 'Prefers products that aren’t tested on animals.',
						subtitle: 'Caleigh Jerde, 4 months ago',
						actions: [
							{
								kind: 'simple',
								icon: <Icon icon="edit" className="btn__line-icon" />
							}
						]
					},
					{
						icon: <Icon icon="date" isLineIcon />,
						title: 'Tues, Nov 6, 2018',
						subtitle: '10:30-11:15am'
					},
					{
						icon: <ServiceIcon isLineIcon />,
						title: 'Services',
						subtitle: '<p>Nose Wax</p><p>$7 | 45min</p>',
						actions: [
							{
								kind: 'simple',
								icon: <Icon icon="add" />
							},
							{
								kind: 'simple',
								icon: <Icon icon="edit" className="btn__line-icon" />
							}
						]
					},
					{
						icon: <StatusIcon isLineIcon />,
						title: 'Status',
						subtitle: 'Checked In',
						contextMenu: {
							isSimple: true,
							icon: <Icon icon="edit" className="btn__line-icon" />,
							actions: [
								{
									text: 'Check guest in'
								},
								{
									text: 'Mark as late'
								},
								{
									text: 'Mark as no show'
								}
							]
						}
					}
				]
			},
			footer: {
				primaryCTA: {
					text: 'Send to checkout'
				}
			}
		},
		blocks: [
			{
				title: 'Nose Wax',
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
		id: 'da6e0219-6006-4d63-b5da-f5d40f6815c8',
		durationSec: 4500,
		startAt: today.set({ hour: 11, minute: 30 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: 'd9ce818a-0ef1-46ba-b44c-b293f5dbd0ff',
		className: 'event-fill-4',
		details: {
			header: { title: 'Cooper Moore', label: 'Appointment' },
			list: {
				items: [
					{
						avatar:
							'https://images.unsplash.com/photo-1535441577682-5a7bc0702a7d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=077e17fb017e1258f3d5d3709729640a&auto=format&fit=crop&w=80&h=80&q=80',
						title: 'Cooper Moore',
						subtitle: '(364) 106-7572',
						contextMenu: {
							isSimple: true,
							actions: [
								{
									text: 'Guest notes'
								}
							]
						}
					},
					{
						icon: <NoteIcon isLineIcon />,
						title: 'Prefers products that aren’t tested on animals.',
						subtitle: 'Caleigh Jerde, 4 months ago',
						actions: [
							{
								kind: 'simple',
								icon: <Icon icon="edit" className="btn__line-icon" />
							}
						]
					},
					{
						icon: <Icon icon="date" isLineIcon />,
						title: 'Tues, Nov 6, 2018',
						subtitle: '11:30am-12:45pm'
					},
					{
						icon: <ServiceIcon isLineIcon />,
						title: 'Services',
						subtitle: '<p>24k Gold Facial</p><p>$100 | 1hr 15min</p>',
						actions: [
							{
								kind: 'simple',
								icon: <Icon icon="add" />
							},
							{
								kind: 'simple',
								icon: <Icon icon="edit" className="btn__line-icon" />
							}
						]
					},
					{
						icon: <StatusIcon isLineIcon />,
						title: 'Status',
						subtitle: 'Late',
						contextMenu: {
							isSimple: true,
							icon: <Icon icon="edit" className="btn__line-icon" />,
							actions: [
								{
									text: 'Check guest in'
								},
								{
									text: 'Mark as no show'
								}
							]
						}
					}
				]
			},
			footer: {
				primaryCTA: {
					text: 'Check guest in'
				}
			}
		},
		blocks: [
			{
				title: '24k Gold Facial',
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
		id: 'da6e0219-6006-4d63-b5da-f5d40f6815c9',
		durationSec: 2700,
		startAt: today.set({ hour: 14, minute: 15 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: 'd9ce818a-0ef1-46ba-b44c-b293f5dbd0ff',
		className: '',
		details,
		blocks: [
			{
				title: 'Brow Wax',
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
		id: '66f30076-fa15-4501-aeab-c8da0b7988a1',
		durationSec: 5400,
		startAt: today.set({ hour: 9, minute: 15 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: '909beac7-42f7-443f-bd86-c762705c0c18',
		className: 'event-fill-2',
		details,
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
		durationSec: 2700,
		startAt: today.set({ hour: 11, minute: 0 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: '909beac7-42f7-443f-bd86-c762705c0c18',
		className: 'event-fill-4',
		details: {
			header: { title: 'Cooper Moore', label: 'Appointment' },
			list: {
				items: [
					{
						avatar:
							'https://images.unsplash.com/photo-1535441577682-5a7bc0702a7d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=077e17fb017e1258f3d5d3709729640a&auto=format&fit=crop&w=80&h=80&q=80',
						title: 'Cooper Moore',
						subtitle: '(364) 106-7572',
						contextMenu: {
							isSimple: true,
							actions: [
								{
									text: 'Guest notes'
								}
							]
						}
					},
					{
						icon: <NoteIcon isLineIcon />,
						title: 'Prefers products that aren’t tested on animals.',
						subtitle: 'Caleigh Jerde, 4 months ago',
						actions: [
							{
								kind: 'simple',
								icon: <Icon icon="edit" className="btn__line-icon" />
							}
						]
					},
					{
						icon: <Icon icon="date" isLineIcon />,
						title: 'Tues, Nov 6, 2018',
						subtitle: '8:45-9:30am'
					},
					{
						icon: <ServiceIcon isLineIcon />,
						title: 'Services',
						subtitle: '<p>The Ultimate</p><p>$70 | 45min</p>',
						actions: [
							{
								kind: 'simple',
								icon: <Icon icon="add" />
							},
							{
								kind: 'simple',
								icon: <Icon icon="edit" className="btn__line-icon" />
							}
						]
					},
					{
						icon: <StatusIcon isLineIcon />,
						title: 'Status',
						subtitle: 'Late',
						contextMenu: {
							isSimple: true,
							icon: <Icon icon="edit" className="btn__line-icon" />,
							actions: [
								{
									text: 'Check guest in'
								},
								{
									text: 'Mark as no show'
								}
							]
						}
					}
				]
			},
			footer: {
				primaryCTA: {
					text: 'Check guest in'
				}
			}
		},
		blocks: [
			{
				title: 'Head Shave',
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
		id: '66f30076-fa15-4501-aeab-c8da0b7988a3',
		durationSec: 2700,
		startAt: today.set({ hour: 14, minute: 15 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: 'ce914128-c77c-40fa-b5ef-d6faa3ed26a1',
		className: '',
		details,
		blocks: [
			{
				title: 'Head Shave',
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
		id: '66f30076-fa15-4501-aeab-c8da0b7988a4',
		durationSec: 2700,
		startAt: today.set({ hour: 15, minute: 0 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: 'ce914128-c77c-40fa-b5ef-d6faa3ed26a1',
		className: '',
		details,
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
		durationSec: 2700,
		startAt: today.set({ hour: 10, minute: 0 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: '7a96fb12-b01c-45f3-9c09-d0922d5eaa44',
		className: 'event-fill-5',
		details: {
			header: { title: 'Cooper Moore', label: 'Appointment' },
			list: {
				items: [
					{
						avatar:
							'https://images.unsplash.com/photo-1535441577682-5a7bc0702a7d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=077e17fb017e1258f3d5d3709729640a&auto=format&fit=crop&w=80&h=80&q=80',
						title: 'Cooper Moore',
						subtitle: '(364) 106-7572',
						contextMenu: {
							isSimple: true,
							actions: [
								{
									text: 'Guest notes'
								}
							]
						}
					},
					{
						icon: <NoteIcon isLineIcon />,
						title: 'Prefers products that aren’t tested on animals.',
						subtitle: 'Caleigh Jerde, 4 months ago',
						actions: [
							{
								kind: 'simple',
								icon: <Icon icon="edit" className="btn__line-icon" />
							}
						]
					},
					{
						icon: <Icon icon="date" isLineIcon />,
						title: 'Tues, Nov 6, 2018',
						subtitle: '10:15-11am'
					},
					{
						icon: <ServiceIcon isLineIcon />,
						title: 'Services',
						subtitle: '<p>Beard Trim</p><p>$12 | 45min</p>',
						actions: [
							{
								kind: 'simple',
								icon: <Icon icon="add" />
							},
							{
								kind: 'simple',
								icon: <Icon icon="edit" className="btn__line-icon" />
							}
						]
					},
					{
						icon: <StatusIcon isLineIcon />,
						title: 'Status',
						subtitle: 'Unpaid',
						contextMenu: {
							isSimple: true,
							icon: <Icon icon="edit" className="btn__line-icon" />,
							actions: [
								{
									text: 'Check guest in'
								},
								{
									text: 'Mark as late'
								},
								{
									text: 'Mark as no show'
								}
							]
						}
					}
				]
			},
			footer: {
				primaryCTA: {
					text: 'Send to checkout'
				}
			}
		},
		blocks: [
			{
				title: 'Beard Trim',
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
		id: '66f30076-fa15-4501-aeab-c8da0b7988a6',
		durationSec: 6300,
		startAt: today.set({ hour: 12, minute: 15 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: '7a96fb12-b01c-45f3-9c09-d0922d5eaa44',
		className: '',
		details,
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
		className: 'event-fill-3',
		details,
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
		durationSec: 2700,
		startAt: today.set({ hour: 14, minute: 0 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: '061bb108-7795-4f62-972c-7ee426b71668',
		className: '',
		details,
		blocks: [
			{
				title: 'Head Shave',
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
		id: '66f30076-fa15-4501-aeab-c8da0b7988a9',
		durationSec: 2700,
		startAt: today.set({ hour: 15, minute: 0 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: '061bb108-7795-4f62-972c-7ee426b71668',
		className: 'event-fill-1',
		details,
		blocks: [
			{
				title: 'Signature Follow-up',
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
		id: 'e911af72-9bbf-4a8b-b588-d24e7a938057',
		durationSec: 5400,
		startAt: today.set({ hour: 9, minute: 45 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: '724d2986-ba56-4560-a1ab-74088b974274',
		className: 'event-fill-2',
		details,
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
		durationSec: 2700,
		startAt: today.set({ hour: 12, minute: 0 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: '724d2986-ba56-4560-a1ab-74088b974274',
		className: '',
		details,
		blocks: [
			{
				title: 'Brow Wax',
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
		id: 'e911af72-9bbf-4a8b-b588-d24e7a938059',
		durationSec: 2700,
		startAt: today.set({ hour: 14, minute: 0 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: '724d2986-ba56-4560-a1ab-74088b974274',
		className: '',
		details,
		blocks: [
			{
				title: 'Nose Wax',
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
		id: 'e911af72-9bbf-4a8b-b588-d24e7a938060',
		durationSec: 4500,
		startAt: today.set({ hour: 10, minute: 30 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: 'df65bf1f-efae-41bd-af5f-a8714807dfef',
		className: 'event-fill-3',
		details: {
			header: { title: 'Cooper Moore', label: 'Appointment' },
			list: {
				items: [
					{
						avatar:
							'https://images.unsplash.com/photo-1535441577682-5a7bc0702a7d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=077e17fb017e1258f3d5d3709729640a&auto=format&fit=crop&w=80&h=80&q=80',
						title: 'Cooper Moore',
						subtitle: '(364) 106-7572',
						contextMenu: {
							isSimple: true,
							actions: [
								{
									text: 'Guest notes'
								}
							]
						}
					},
					{
						icon: <NoteIcon isLineIcon />,
						title: 'Prefers products that aren’t tested on animals.',
						subtitle: 'Caleigh Jerde, 4 months ago',
						actions: [
							{
								kind: 'simple',
								icon: <Icon icon="edit" className="btn__line-icon" />
							}
						]
					},
					{
						icon: <Icon icon="date" isLineIcon />,
						title: 'Tues, Nov 6, 2018',
						subtitle: '10:30-11:45am'
					},
					{
						icon: <ServiceIcon isLineIcon />,
						title: 'Services',
						subtitle: '<p>24k Gold Facial</p><p>$100 | 1hr 15min</p>',
						actions: [
							{
								kind: 'simple',
								icon: <Icon icon="add" />
							},
							{
								kind: 'simple',
								icon: <Icon icon="edit" className="btn__line-icon" />
							}
						]
					},
					{
						icon: <StatusIcon isLineIcon />,
						title: 'Status',
						subtitle: 'Checked In',
						contextMenu: {
							isSimple: true,
							icon: <Icon icon="edit" className="btn__line-icon" />,
							actions: [
								{
									text: 'Check guest in'
								},
								{
									text: 'Mark as no show'
								}
							]
						}
					}
				]
			},
			footer: {
				primaryCTA: {
					text: 'Send guest to checkout'
				}
			}
		},
		blocks: [
			{
				title: '24k Gold Facial',
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
		id: 'e911af72-9bbf-4a8b-b588-d24e7a938061',
		durationSec: 2700,
		startAt: today.set({ hour: 13, minute: 30 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: 'df65bf1f-efae-41bd-af5f-a8714807dfef',
		className: 'event-fill-1',
		details,
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
