import moment from 'moment'

import NoteIcon from '../../../static/assets/icons/Interface-Essential/Form-Edition/paper-write.svg'
import ServiceIcon from '../../../static/assets/icons/Interface-Essential/Lists/list-bullets-1.svg'
import StatusIcon from '../../../static/assets/icons/Interface-Essential/Time/stopwatch.svg'

const today = moment()

export default [
	{
		id: 'da6e0219-6006-4d63-b5da-f5d40f6815c2',
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
						icon: { customIcon: NoteIcon, isLineIcon: true },
						title: 'Prefers products that aren’t tested on animals.',
						subtitle: 'Caleigh Jerde, 4 months ago',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { name: 'date', isLineIcon: true },
						title: `${today.format('ddd, MMM D, YYYY')}`,
						subtitle: '1-3pm'
					},
					{
						icon: { customIcon: ServiceIcon, isLineIcon: true },
						title: 'Services',
						subtitle: '<p>Hair Tinting</p><p>$70 | 2hrs</p>',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'add' }
							},
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { customIcon: StatusIcon, isLineIcon: true },
						title: 'Status',
						subtitle: 'Confirmed',
						contextMenu: {
							isSimple: true,
							icon: { name: 'edit', isLineIcon: true },
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
				title: 'Jessica Alba',
				subtitle: 'Hair Tinting',
				durationSec: 60 * 60,
				leftIcons: [],
				rightIcons: [{ icon: 'edit', isLineIcon: true, title: 'go to hell' }],
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
		startAt: today.set({ hour: 8, minute: 45 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: 'ee65a588-75f8-414c-b3b0-7d1e9f2c7a27',
		className: 'event-fill-crit',
		details: {
			header: { title: 'Edward Goldner', label: 'Appointment' },
			list: {
				items: [
					{
						avatar:
							'https://images.unsplash.com/photo-1535441577682-5a7bc0702a7d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=077e17fb017e1258f3d5d3709729640a&auto=format&fit=crop&w=80&h=80&q=80',
						title: 'Edward Goldner',
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
						icon: { customIcon: NoteIcon, isLineIcon: true },
						title: 'Prefers products that aren’t tested on animals.',
						subtitle: 'Caleigh Jerde, 4 months ago',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { name: 'date', isLineIcon: true },
						title: `${today.format('ddd, MMM D, YYYY')}`,
						subtitle: '8:45-9:30am'
					},
					{
						icon: { customIcon: ServiceIcon, isLineIcon: true },
						title: 'Services',
						subtitle: '<p>The Ultimate</p><p>$70 | 45min</p>',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'add' }
							},
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { customIcon: StatusIcon, isLineIcon: true },
						title: 'Status',
						subtitle: 'Services Complete',
						contextMenu: {
							isSimple: true,
							icon: { name: 'edit', isLineIcon: true },
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
		startAt: today.set({ hour: 15, minute: 30 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: 'ee65a588-75f8-414c-b3b0-7d1e9f2c7a27',
		className: '',
		details: {
			header: { title: 'Edwin McLaughlin', label: 'Appointment' },
			list: {
				items: [
					{
						avatar:
							'https://images.unsplash.com/photo-1535441577682-5a7bc0702a7d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=077e17fb017e1258f3d5d3709729640a&auto=format&fit=crop&w=80&h=80&q=80',
						title: 'Edwin McLaughlin',
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
						icon: { customIcon: NoteIcon, isLineIcon: true },
						title: 'Prefers products that aren’t tested on animals.',
						subtitle: 'Caleigh Jerde, 4 months ago',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { name: 'date', isLineIcon: true },
						title: `${today.format('ddd, MMM D, YYYY')}`,
						subtitle: '9:15-10:45am'
					},
					{
						icon: { customIcon: ServiceIcon, isLineIcon: true },
						title: 'Services',
						subtitle: '<p>Spruced Up Shave</p><p>$40 | 45min</p>',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'add' }
							},
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { customIcon: StatusIcon, isLineIcon: true },
						title: 'Status',
						subtitle: 'Paid',
						contextMenu: {
							isSimple: true,
							icon: { name: 'edit', isLineIcon: true },
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
		startAt: today.set({ hour: 16, minute: 30 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: '78245981-5022-49a7-b2f2-6ac687e0f3d1',
		className: 'event-fill-available',
		details: {
			header: { title: 'Edward Powloski', label: 'Appointment' },
			list: {
				items: [
					{
						avatar:
							'https://images.unsplash.com/photo-1535441577682-5a7bc0702a7d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=077e17fb017e1258f3d5d3709729640a&auto=format&fit=crop&w=80&h=80&q=80',
						title: 'Edward Powloski',
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
						icon: { customIcon: NoteIcon, isLineIcon: true },
						title: 'Prefers products that aren’t tested on animals.',
						subtitle: 'Caleigh Jerde, 4 months ago',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { name: 'date', isLineIcon: true },
						title: `${today.format('ddd, MMM D, YYYY')}`,
						subtitle: '4:30-6:30pm'
					},
					{
						icon: { customIcon: ServiceIcon, isLineIcon: true },
						title: 'Services',
						subtitle: '<p>Wax</p><p>$70 | 2hr</p>',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'add' }
							},
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { customIcon: StatusIcon, isLineIcon: true },
						title: 'Status',
						subtitle: 'Confirmed',
						contextMenu: {
							isSimple: true,
							icon: { name: 'edit', isLineIcon: true },
							actions: [
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
		startAt: today.set({ hour: 13, minute: 0 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: '78245981-5022-49a7-b2f2-6ac687e0f3d1',
		className: 'event-fill-unavailable-alt',
		details: {
			header: { title: 'Dario Stehr', label: 'Appointment' },
			list: {
				items: [
					{
						avatar:
							'https://images.unsplash.com/photo-1535441577682-5a7bc0702a7d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=077e17fb017e1258f3d5d3709729640a&auto=format&fit=crop&w=80&h=80&q=80',
						title: 'Dario Stehr',
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
						icon: { customIcon: NoteIcon, isLineIcon: true },
						title: 'Prefers products that aren’t tested on animals.',
						subtitle: 'Caleigh Jerde, 4 months ago',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { name: 'date', isLineIcon: true },
						title: `${today.format('ddd, MMM D, YYYY')}`,
						subtitle: '1-1:45pm'
					},
					{
						icon: { customIcon: ServiceIcon, isLineIcon: true },
						title: 'Services',
						subtitle: '<p>The Ultimate</p><p>$70 | 45min</p>',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'add' }
							},
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { customIcon: StatusIcon, isLineIcon: true },
						title: 'Status',
						subtitle: 'Confirmed',
						contextMenu: {
							isSimple: true,
							icon: { name: 'edit', isLineIcon: true },
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
					text: 'Check in guest'
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
		id: 'da6e0219-6006-4d63-b5da-f5d40f6815c7',
		startAt: today.set({ hour: 10, minute: 30 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: 'd9ce818a-0ef1-46ba-b44c-b293f5dbd0ff',
		className: 'event-fill-warn',
		details: {
			header: { title: 'Friedrich Doyle', label: 'Appointment' },
			list: {
				items: [
					{
						avatar:
							'https://images.unsplash.com/photo-1535441577682-5a7bc0702a7d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=077e17fb017e1258f3d5d3709729640a&auto=format&fit=crop&w=80&h=80&q=80',
						title: 'Friedrich Doyle',
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
						icon: { customIcon: NoteIcon, isLineIcon: true },
						title: 'Prefers products that aren’t tested on animals.',
						subtitle: 'Caleigh Jerde, 4 months ago',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { name: 'date', isLineIcon: true },
						title: `${today.format('ddd, MMM D, YYYY')}`,
						subtitle: '10:30-11:15am'
					},
					{
						icon: { customIcon: ServiceIcon, isLineIcon: true },
						title: 'Services',
						subtitle: '<p>Nose Wax</p><p>$7 | 45min</p>',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'add' }
							},
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { customIcon: StatusIcon, isLineIcon: true },
						title: 'Status',
						subtitle: 'Checked In',
						contextMenu: {
							isSimple: true,
							icon: { name: 'edit', isLineIcon: true },
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
		startAt: today.set({ hour: 11, minute: 30 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: 'd9ce818a-0ef1-46ba-b44c-b293f5dbd0ff',
		className: 'event-fill-warn',
		details: {
			header: { title: 'Matt Hoeger', label: 'Appointment' },
			list: {
				items: [
					{
						avatar:
							'https://images.unsplash.com/photo-1535441577682-5a7bc0702a7d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=077e17fb017e1258f3d5d3709729640a&auto=format&fit=crop&w=80&h=80&q=80',
						title: 'Matt Hoeger',
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
						icon: { customIcon: NoteIcon, isLineIcon: true },
						title: 'Prefers products that aren’t tested on animals.',
						subtitle: 'Caleigh Jerde, 4 months ago',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { name: 'date', isLineIcon: true },
						title: `${today.format('ddd, MMM D, YYYY')}`,
						subtitle: '11:30am-12:45pm'
					},
					{
						icon: { customIcon: ServiceIcon, isLineIcon: true },
						title: 'Services',
						subtitle: '<p>24k Gold Facial</p><p>$100 | 1hr 15min</p>',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'add' }
							},
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { customIcon: StatusIcon, isLineIcon: true },
						title: 'Status',
						subtitle: 'Late',
						contextMenu: {
							isSimple: true,
							icon: { name: 'edit', isLineIcon: true },
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
		startAt: today.set({ hour: 14, minute: 15 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: 'd9ce818a-0ef1-46ba-b44c-b293f5dbd0ff',
		className: '',
		details: {
			header: { title: 'Franco Carter', label: 'Appointment' },
			list: {
				items: [
					{
						avatar:
							'https://images.unsplash.com/photo-1535441577682-5a7bc0702a7d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=077e17fb017e1258f3d5d3709729640a&auto=format&fit=crop&w=80&h=80&q=80',
						title: 'Franco Carter',
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
						icon: { customIcon: NoteIcon, isLineIcon: true },
						title: 'Prefers products that aren’t tested on animals.',
						subtitle: 'Caleigh Jerde, 4 months ago',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { name: 'date', isLineIcon: true },
						title: `${today.format('ddd, MMM D, YYYY')}`,
						subtitle: '2:15-3pm'
					},
					{
						icon: { customIcon: ServiceIcon, isLineIcon: true },
						title: 'Services',
						subtitle: '<p>Brow Wax</p><p>$10 | 45min</p>',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'add' }
							},
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { customIcon: StatusIcon, isLineIcon: true },
						title: 'Status',
						subtitle: 'Confirmed',
						contextMenu: {
							isSimple: true,
							icon: { name: 'edit', isLineIcon: true },
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
		startAt: today.set({ hour: 9, minute: 15 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: '909beac7-42f7-443f-bd86-c762705c0c18',
		className: 'event-fill-crit',
		details: {
			header: { title: 'Kip Wilkinson', label: 'Appointment' },
			list: {
				items: [
					{
						avatar:
							'https://images.unsplash.com/photo-1535441577682-5a7bc0702a7d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=077e17fb017e1258f3d5d3709729640a&auto=format&fit=crop&w=80&h=80&q=80',
						title: 'Kip Wilkinson',
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
						icon: { customIcon: NoteIcon, isLineIcon: true },
						title: 'Prefers products that aren’t tested on animals.',
						subtitle: 'Caleigh Jerde, 4 months ago',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { name: 'date', isLineIcon: true },
						title: `${today.format('ddd, MMM D, YYYY')}`,
						subtitle: '1-3pm'
					},
					{
						icon: { customIcon: ServiceIcon, isLineIcon: true },
						title: 'Services',
						subtitle: '<p>Hair Tinting</p><p>$70 | 2hrs</p>',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'add' }
							},
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { customIcon: StatusIcon, isLineIcon: true },
						title: 'Status',
						subtitle: 'Confirmed',
						contextMenu: {
							isSimple: true,
							icon: { name: 'edit', isLineIcon: true },
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
		startAt: today.set({ hour: 11, minute: 0 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: '909beac7-42f7-443f-bd86-c762705c0c18',
		className: 'event-fill-4',
		details: {
			header: { title: 'Vincenza Jerde', label: 'Appointment' },
			list: {
				items: [
					{
						avatar:
							'https://images.unsplash.com/photo-1535441577682-5a7bc0702a7d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=077e17fb017e1258f3d5d3709729640a&auto=format&fit=crop&w=80&h=80&q=80',
						title: 'Vincenza Jerde',
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
						icon: { customIcon: NoteIcon, isLineIcon: true },
						title: 'Prefers products that aren’t tested on animals.',
						subtitle: 'Caleigh Jerde, 4 months ago',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { name: 'date', isLineIcon: true },
						title: `${today.format('ddd, MMM D, YYYY')}`,
						subtitle: '8:45-9:30am'
					},
					{
						icon: { customIcon: ServiceIcon, isLineIcon: true },
						title: 'Services',
						subtitle: '<p>The Ultimate</p><p>$70 | 45min</p>',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'add' }
							},
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { customIcon: StatusIcon, isLineIcon: true },
						title: 'Status',
						subtitle: 'Late',
						contextMenu: {
							isSimple: true,
							icon: { name: 'edit', isLineIcon: true },
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
		startAt: today.set({ hour: 14, minute: 15 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: 'ce914128-c77c-40fa-b5ef-d6faa3ed26a1',
		className: '',
		details: {
			header: { title: 'Hector Smith', label: 'Appointment' },
			list: {
				items: [
					{
						avatar:
							'https://images.unsplash.com/photo-1535441577682-5a7bc0702a7d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=077e17fb017e1258f3d5d3709729640a&auto=format&fit=crop&w=80&h=80&q=80',
						title: 'Hector Smith',
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
						icon: { customIcon: NoteIcon, isLineIcon: true },
						title: 'Prefers products that aren’t tested on animals.',
						subtitle: 'Caleigh Jerde, 4 months ago',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { name: 'date', isLineIcon: true },
						title: `${today.format('ddd, MMM D, YYYY')}`,
						subtitle: '2:15-3pm'
					},
					{
						icon: { customIcon: ServiceIcon, isLineIcon: true },
						title: 'Services',
						subtitle: '<p>Head Shave</p><p>$30 | 45min</p>',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'add' }
							},
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { customIcon: StatusIcon, isLineIcon: true },
						title: 'Status',
						subtitle: 'Confirmed',
						contextMenu: {
							isSimple: true,
							icon: { name: 'edit', isLineIcon: true },
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
		startAt: today.set({ hour: 15, minute: 15 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: 'ce914128-c77c-40fa-b5ef-d6faa3ed26a1',
		className: '',
		details: {
			header: { title: 'Khalid Adams', label: 'Appointment' },
			list: {
				items: [
					{
						avatar:
							'https://images.unsplash.com/photo-1535441577682-5a7bc0702a7d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=077e17fb017e1258f3d5d3709729640a&auto=format&fit=crop&w=80&h=80&q=80',
						title: 'Khalid Adams',
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
						icon: { customIcon: NoteIcon, isLineIcon: true },
						title: 'Prefers products that aren’t tested on animals.',
						subtitle: 'Caleigh Jerde, 4 months ago',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { name: 'date', isLineIcon: true },
						title: `${today.format('ddd, MMM D, YYYY')}`,
						subtitle: '3:15-4pm'
					},
					{
						icon: { customIcon: ServiceIcon, isLineIcon: true },
						title: 'Services',
						subtitle: '<p>Young Spruce</p><p>$23 | 45min</p>',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'add' }
							},
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { customIcon: StatusIcon, isLineIcon: true },
						title: 'Status',
						subtitle: 'Confirmed',
						contextMenu: {
							isSimple: true,
							icon: { name: 'edit', isLineIcon: true },
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
		startAt: today.set({ hour: 10, minute: 0 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: '7a96fb12-b01c-45f3-9c09-d0922d5eaa44',
		className: 'event-fill-5',
		details: {
			header: { title: 'Eric Romaguera', label: 'Appointment' },
			list: {
				items: [
					{
						avatar:
							'https://images.unsplash.com/photo-1535441577682-5a7bc0702a7d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=077e17fb017e1258f3d5d3709729640a&auto=format&fit=crop&w=80&h=80&q=80',
						title: 'Eric Romaguera',
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
						icon: { customIcon: NoteIcon, isLineIcon: true },
						title: 'Prefers products that aren’t tested on animals.',
						subtitle: 'Caleigh Jerde, 4 months ago',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { name: 'date', isLineIcon: true },
						title: `${today.format('ddd, MMM D, YYYY')}`,
						subtitle: '10:15-11am'
					},
					{
						icon: { customIcon: ServiceIcon, isLineIcon: true },
						title: 'Services',
						subtitle: '<p>Beard Trim</p><p>$12 | 45min</p>',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'add' }
							},
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { customIcon: StatusIcon, isLineIcon: true },
						title: 'Status',
						subtitle: 'Unpaid',
						contextMenu: {
							isSimple: true,
							icon: { name: 'edit', isLineIcon: true },
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
		startAt: today.set({ hour: 12, minute: 15 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: '7a96fb12-b01c-45f3-9c09-d0922d5eaa44',
		className: '',
		details: {
			header: { title: 'Karl Johnson', label: 'Appointment' },
			list: {
				items: [
					{
						avatar:
							'https://images.unsplash.com/photo-1535441577682-5a7bc0702a7d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=077e17fb017e1258f3d5d3709729640a&auto=format&fit=crop&w=80&h=80&q=80',
						title: 'Karl Johnson',
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
						icon: { customIcon: NoteIcon, isLineIcon: true },
						title: 'Prefers products that aren’t tested on animals.',
						subtitle: 'Caleigh Jerde, 4 months ago',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { name: 'date', isLineIcon: true },
						title: `${today.format('ddd, MMM D, YYYY')}`,
						subtitle: '12:15-2pm'
					},
					{
						icon: { customIcon: ServiceIcon, isLineIcon: true },
						title: 'Services',
						subtitle: '<p>The Ultimate</p><p>$70 | 1hr 45min</p>',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'add' }
							},
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { customIcon: StatusIcon, isLineIcon: true },
						title: 'Status',
						subtitle: 'Confirmed',
						contextMenu: {
							isSimple: true,
							icon: { name: 'edit', isLineIcon: true },
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
		startAt: today.set({ hour: 11, minute: 30 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: '061bb108-7795-4f62-972c-7ee426b71668',
		className: 'event-fill-past',
		details: {
			header: { title: 'Shane Vandervort', label: 'Appointment' },
			list: {
				items: [
					{
						avatar:
							'https://images.unsplash.com/photo-1535441577682-5a7bc0702a7d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=077e17fb017e1258f3d5d3709729640a&auto=format&fit=crop&w=80&h=80&q=80',
						title: 'Shane Vandervort',
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
						icon: { customIcon: NoteIcon, isLineIcon: true },
						title: 'Prefers products that aren’t tested on animals.',
						subtitle: 'Caleigh Jerde, 4 months ago',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { name: 'date', isLineIcon: true },
						title: `${today.format('ddd, MMM D, YYYY')}`,
						subtitle: '11:30am-12:45pm'
					},
					{
						icon: { customIcon: ServiceIcon, isLineIcon: true },
						title: 'Services',
						subtitle: '<p>Signature</p><p>$40 | 1hr 15min</p>',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'add' }
							},
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { customIcon: StatusIcon, isLineIcon: true },
						title: 'Status',
						subtitle: 'Checked In',
						contextMenu: {
							isSimple: true,
							icon: { name: 'edit', isLineIcon: true },
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
		startAt: today.set({ hour: 14, minute: 0 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: '061bb108-7795-4f62-972c-7ee426b71668',
		className: '',
		details: {
			header: { title: 'Cal Moore', label: 'Appointment' },
			list: {
				items: [
					{
						avatar:
							'https://images.unsplash.com/photo-1535441577682-5a7bc0702a7d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=077e17fb017e1258f3d5d3709729640a&auto=format&fit=crop&w=80&h=80&q=80',
						title: 'Cal Moore',
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
						icon: { customIcon: NoteIcon, isLineIcon: true },
						title: 'Prefers products that aren’t tested on animals.',
						subtitle: 'Caleigh Jerde, 4 months ago',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { name: 'date', isLineIcon: true },
						title: `${today.format('ddd, MMM D, YYYY')}`,
						subtitle: '2-2:45pm'
					},
					{
						icon: { customIcon: ServiceIcon, isLineIcon: true },
						title: 'Services',
						subtitle: '<p>Head Shave</p><p>$70 | 45min</p>',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'add' }
							},
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { customIcon: StatusIcon, isLineIcon: true },
						title: 'Status',
						subtitle: 'Confirmed',
						contextMenu: {
							isSimple: true,
							icon: { name: 'edit', isLineIcon: true },
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
		startAt: today.set({ hour: 15, minute: 0 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: '061bb108-7795-4f62-972c-7ee426b71668',
		className: 'event-fill-1',
		details: {
			header: { title: 'Lyle Johnson', label: 'Appointment' },
			list: {
				items: [
					{
						avatar:
							'https://images.unsplash.com/photo-1535441577682-5a7bc0702a7d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=077e17fb017e1258f3d5d3709729640a&auto=format&fit=crop&w=80&h=80&q=80',
						title: 'Lyle Johnson',
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
						icon: { customIcon: NoteIcon, isLineIcon: true },
						title: 'Prefers products that aren’t tested on animals.',
						subtitle: 'Caleigh Jerde, 4 months ago',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { name: 'date', isLineIcon: true },
						title: `${today.format('ddd, MMM D, YYYY')}`,
						subtitle: '3-3:45pm'
					},
					{
						icon: { customIcon: ServiceIcon, isLineIcon: true },
						title: 'Services',
						subtitle: '<p>Signature Follow-up</p><p>Free | 45min</p>',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'add' }
							},
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { customIcon: StatusIcon, isLineIcon: true },
						title: 'Status',
						subtitle: 'Unconfirmed',
						contextMenu: {
							isSimple: true,
							icon: { name: 'edit', isLineIcon: true },
							actions: [
								{
									text: 'Confirm appointment'
								},
								{
									text: 'Check guest in'
								},
								{
									text: 'Mark as late'
								}
							]
						}
					}
				]
			},
			footer: {
				primaryCTA: {
					text: 'Confirm appointment'
				}
			}
		},
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
		startAt: today.set({ hour: 9, minute: 45 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: '724d2986-ba56-4560-a1ab-74088b974274',
		className: 'event-fill-past',
		details: {
			header: { title: 'Alex Lang', label: 'Appointment' },
			list: {
				items: [
					{
						avatar:
							'https://images.unsplash.com/photo-1535441577682-5a7bc0702a7d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=077e17fb017e1258f3d5d3709729640a&auto=format&fit=crop&w=80&h=80&q=80',
						title: 'Alex Lang',
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
						icon: { customIcon: NoteIcon, isLineIcon: true },
						title: 'Prefers products that aren’t tested on animals.',
						subtitle: 'Caleigh Jerde, 4 months ago',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { name: 'date', isLineIcon: true },
						title: `${today.format('ddd, MMM D, YYYY')}`,
						subtitle: '9:45-10:15am'
					},
					{
						icon: { customIcon: ServiceIcon, isLineIcon: true },
						title: 'Services',
						subtitle: '<p>Beard Tinting</p><p>$70 | 1hr 30min</p>',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'add' }
							},
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { customIcon: StatusIcon, isLineIcon: true },
						title: 'Status',
						subtitle: 'Checked In',
						contextMenu: {
							isSimple: true,
							icon: { name: 'edit', isLineIcon: true },
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
		startAt: today.set({ hour: 12, minute: 0 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: '724d2986-ba56-4560-a1ab-74088b974274',
		className: '',
		details: {
			header: { title: 'Jared Hilpert', label: 'Appointment' },
			list: {
				items: [
					{
						avatar:
							'https://images.unsplash.com/photo-1535441577682-5a7bc0702a7d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=077e17fb017e1258f3d5d3709729640a&auto=format&fit=crop&w=80&h=80&q=80',
						title: 'Jared Hilpert',
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
						icon: { customIcon: NoteIcon, isLineIcon: true },
						title: 'Prefers products that aren’t tested on animals.',
						subtitle: 'Caleigh Jerde, 4 months ago',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { name: 'date', isLineIcon: true },
						title: `${today.format('ddd, MMM D, YYYY')}`,
						subtitle: '12-12:45pm'
					},
					{
						icon: { customIcon: ServiceIcon, isLineIcon: true },
						title: 'Services',
						subtitle: '<p>Brow Wax</p><p>$20 | 45min</p>',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'add' }
							},
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { customIcon: StatusIcon, isLineIcon: true },
						title: 'Status',
						subtitle: 'Confirmed',
						contextMenu: {
							isSimple: true,
							icon: { name: 'edit', isLineIcon: true },
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
		startAt: today.set({ hour: 14, minute: 0 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: '724d2986-ba56-4560-a1ab-74088b974274',
		className: '',
		details: {
			header: { title: 'Anderson Corwin', label: 'Appointment' },
			list: {
				items: [
					{
						avatar:
							'https://images.unsplash.com/photo-1535441577682-5a7bc0702a7d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=077e17fb017e1258f3d5d3709729640a&auto=format&fit=crop&w=80&h=80&q=80',
						title: 'Anderson Corwin',
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
						icon: { customIcon: NoteIcon, isLineIcon: true },
						title: 'Prefers products that aren’t tested on animals.',
						subtitle: 'Caleigh Jerde, 4 months ago',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { name: 'date', isLineIcon: true },
						title: `${today.format('ddd, MMM D, YYYY')}`,
						subtitle: '2-2:45pm'
					},
					{
						icon: { customIcon: ServiceIcon, isLineIcon: true },
						title: 'Services',
						subtitle: '<p>Nose Wax</p><p>$15 | 45min</p>',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'add' }
							},
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { customIcon: StatusIcon, isLineIcon: true },
						title: 'Status',
						subtitle: 'Confirmed',
						contextMenu: {
							isSimple: true,
							icon: { name: 'edit', isLineIcon: true },
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
		startAt: today.set({ hour: 10, minute: 30 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: 'df65bf1f-efae-41bd-af5f-a8714807dfef',
		className: 'event-fill-past',
		details: {
			header: { title: 'Fred Hudson', label: 'Appointment' },
			list: {
				items: [
					{
						avatar:
							'https://images.unsplash.com/photo-1535441577682-5a7bc0702a7d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=077e17fb017e1258f3d5d3709729640a&auto=format&fit=crop&w=80&h=80&q=80',
						title: 'Fred Hudson',
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
						icon: { customIcon: NoteIcon, isLineIcon: true },
						title: 'Prefers products that aren’t tested on animals.',
						subtitle: 'Caleigh Jerde, 4 months ago',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { name: 'date', isLineIcon: true },
						title: `${today.format('ddd, MMM D, YYYY')}`,
						subtitle: '10:30-11:45am'
					},
					{
						icon: { customIcon: ServiceIcon, isLineIcon: true },
						title: 'Services',
						subtitle: '<p>24k Gold Facial</p><p>$100 | 1hr 15min</p>',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'add' }
							},
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { customIcon: StatusIcon, isLineIcon: true },
						title: 'Status',
						subtitle: 'Checked In',
						contextMenu: {
							isSimple: true,
							icon: { name: 'edit', isLineIcon: true },
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
		startAt: today.set({ hour: 13, minute: 30 }).format('YYYY-MM-DD HH:mm:ss'),
		isAllDay: false,
		userId: 'df65bf1f-efae-41bd-af5f-a8714807dfef',
		className: 'event-fill-1',
		details: {
			header: { title: 'Tom Quigley', label: 'Appointment' },
			list: {
				items: [
					{
						avatar:
							'https://images.unsplash.com/photo-1535441577682-5a7bc0702a7d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=077e17fb017e1258f3d5d3709729640a&auto=format&fit=crop&w=80&h=80&q=80',
						title: 'Tom Quigley',
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
						icon: { customIcon: NoteIcon, isLineIcon: true },
						title: 'Prefers products that aren’t tested on animals.',
						subtitle: 'Caleigh Jerde, 4 months ago',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { name: 'date', isLineIcon: true },
						title: `${today.format('ddd, MMM D, YYYY')}`,
						subtitle: '1:30-2:15pm'
					},
					{
						icon: { customIcon: ServiceIcon, isLineIcon: true },
						title: 'Services',
						subtitle: '<p>Clothing Consult</p><p>$70 | 45min</p>',
						actions: [
							{
								kind: 'simple',
								icon: { name: 'add' }
							},
							{
								kind: 'simple',
								icon: { name: 'edit', isLineIcon: true }
							}
						]
					},
					{
						icon: { customIcon: StatusIcon, isLineIcon: true },
						title: 'Status',
						subtitle: 'Unconfirmed',
						contextMenu: {
							isSimple: true,
							icon: { name: 'edit', isLineIcon: true },
							actions: [
								{
									text: 'Confirm appointment'
								},
								{
									text: 'Check guest in'
								},
								{
									text: 'Mark as late'
								}
							]
						}
					}
				]
			},
			footer: {
				primaryCTA: {
					text: 'Confirm appointment'
				}
			}
		},
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
