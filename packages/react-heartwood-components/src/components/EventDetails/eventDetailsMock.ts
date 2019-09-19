import { IEventDetailsItemProps } from './components/EventDetailsItem/EventDetailsItem'
import { IEventDetailsProps } from './EventDetails'
import { IListProps } from '../List'
import {
	IHWCalendarEventDetailsItemType,
	IHWActionKinds,
	IHWListItemSelectableType
} from '@sprucelabs/spruce-types'

const avatar =
	'https://images.unsplash.com/photo-1542080681-b52d382432af?ixlib=rb-1.2.1&auto=format&fit=crop&w=96&h=96&q=80'

const services: IEventDetailsItemProps = {
	type: IHWCalendarEventDetailsItemType.List,
	viewModel: {
		id: 'services',
		items: [
			{
				id: 'first',
				icon: { name: 'unordered_list', isLineIcon: true },
				title: 'Accent Highlight',
				subtitle: '$65 | 1hr',
				note: 'Vicenta Maggio',
				contextMenu: {
					id: 'menu',
					icon: { name: 'edit', isLineIcon: true },
					isSimple: true,
					isSmall: true,
					size: 'large',
					actions: [
						{
							text: 'Change teammate'
						},
						{
							text: 'Remove from appointment'
						}
					]
				}
			},
			{
				id: 'second',
				icon: { name: 'unordered_list', isLineIcon: true },
				iconIsHidden: true,
				title: 'Haircut',
				subtitle: '$40 | 1hr',
				note: 'Vicenta Maggio',
				contextMenu: {
					id: 'another-menu',
					icon: { name: 'edit', isLineIcon: true, isVisible: false },
					isSimple: true,
					isSmall: true,
					size: 'large',
					actions: [
						{
							text: 'Change teammate'
						},
						{
							text: 'Remove from appointment'
						}
					]
				}
			},
			{
				id: 'last',
				title: 'Add service',
				icon: { name: 'add' },
				primaryAction: {
					icon: { name: 'add' },
					kind: IHWActionKinds.Simple
				}
			}
		]
	}
}

const inclusiveStatuses = [
	{
		id: 'status',
		title: 'Confirmed',
		selectableId: 'confirmed',
		selectableProps: {
			name: 'checkbox'
		}
	},
	{
		id: 'checked-in',
		title: 'Checked in',
		selectableId: 'checkedIn',
		selectableProps: {
			name: 'checkbox'
		}
	}
]
const exclusiveStatuses = [
	{
		id: 'on-time',
		title: 'On time',
		selectableId: 'onTime',
		selectableProps: {
			name: 'radio'
		}
	},
	{
		id: 'late',
		title: 'Late',
		selectableId: 'late',
		selectableProps: {
			name: 'radio'
		}
	},
	{
		id: 'ghosted',
		title: 'Ghosted 👻',
		selectableId: 'noShow',
		selectableProps: {
			name: 'radio'
		}
	}
]

const paidStatuses = [
	{
		title: 'Unpaid',
		icon: { name: 'edit' },
		iconIsHidden: true
	}
]

const statusLists: IListProps[] = [
	{
		selectableType: IHWListItemSelectableType.Checkbox,
		items: inclusiveStatuses,
		areSeparatorsVisible: false
	},
	{
		selectableType: IHWListItemSelectableType.Radio,
		items: exclusiveStatuses,
		areSeparatorsVisible: false
	},
	{
		items: paidStatuses,
		areSeparatorsVisible: false
	}
]

export const appointment: { items: IEventDetailsItemProps[] } = {
	items: [
		{
			type: IHWCalendarEventDetailsItemType.List,
			viewModel: {
				id: 'guestInfo',
				items: [
					{
						id: 'first',
						avatar,
						title: 'Alejandra Pollich',
						subtitle: '(605) 230-5253',
						contextMenu: {
							icon: { name: 'edit', isLineIcon: true },
							isSimple: true,
							isSmall: true,
							size: 'large',
							actions: [
								{
									text: 'Edit guest'
								},
								{
									text: 'Book for someone else'
								}
							]
						}
					},
					{
						icon: { name: 'note', isLineIcon: true },
						title: 'Prefers products that aren’t tested on animals.',
						subtitle: 'Caleigh Jerde, 4 months ago',
						actions: [
							{
								icon: { name: 'edit' },
								kind: IHWActionKinds.Simple
							}
						]
					}
				]
			}
		},
		{
			type: IHWCalendarEventDetailsItemType.List,
			viewModel: {
				id: 'dateAndTime',
				items: [
					{
						id: 'first',
						icon: { name: 'calendar', isLineIcon: true },
						title: 'Web, Nov 28, 2018',
						subtitle: '11am–12:15pm',
						actions: [
							{
								id: 'first',
								icon: { name: 'edit' },
								kind: IHWActionKinds.Simple
							}
						]
					}
				]
			}
		},
		{ ...services },
		{
			type: IHWCalendarEventDetailsItemType.List,
			viewModel: {
				id: 'status',
				items: [
					{
						id: 'first',
						icon: { name: 'status' },
						title: 'Status',
						subtitle: 'Confirmed',
						isExpandable: true,
						collapsedIconName: 'edit',
						expandedIconName: 'close',
						lists: statusLists
					}
				]
			}
		},
		{
			id: 'subtotalAndDuration',
			type: IHWCalendarEventDetailsItemType.Markdown,
			viewModel: {
				source: '**Subtotal: ** $65\n\n**Duration: ** 2hr'
			}
		},
		{
			id: 'primaryCTA',
			type: IHWCalendarEventDetailsItemType.SplitButton,
			viewModel: {
				kind: IHWActionKinds.Primary,
				isFullWidth: true,
				defaultAction: {
					text: 'Check guest in',
					isFullWidth: true
				},
				actions: [
					{
						text: 'Unconfirm appointment'
					},
					{
						text: 'Mark guest as late'
					},
					{
						text: 'Mark as no show'
					},
					{
						text: 'Book again'
					},
					{
						text: 'Cancel appointment'
					}
				]
			}
		}
	]
}

export const warningAppointment: IEventDetailsProps = {
	items: [
		{
			type: IHWCalendarEventDetailsItemType.List,
			viewModel: {
				id: 'guestInfo',
				items: [
					{
						id: 'first',
						avatar,
						title: 'Alejandra Pollich',
						subtitle: '(605) 230-5253',
						contextMenu: {
							icon: { name: 'edit', isLineIcon: true },
							isSimple: true,
							isSmall: true,
							size: 'large',
							actions: [
								{
									text: 'Edit guest'
								},
								{
									text: 'Book for someone else'
								}
							]
						}
					},
					{
						id: 'second',
						icon: { name: 'note', isLineIcon: true },
						title: 'Prefers products that aren’t tested on animals.',
						subtitle: 'Caleigh Jerde, 4 months ago',
						actions: [
							{
								icon: { name: 'edit' },
								kind: IHWActionKinds.Simple
							}
						]
					}
				]
			}
		},
		{
			type: IHWCalendarEventDetailsItemType.CardBuilder,
			viewModel: {
				id: 'dateAndTime',
				body: {
					children: [
						{
							id: 'dateAndTime',
							key: 'list',
							type: IHWCalendarEventDetailsItemType.List,
							items: [
								{
									key: '1',
									icon: { name: 'calendar', isLineIcon: true },
									title: 'Web, Nov 28, 2018',
									subtitle: '11am–12:15pm',
									actions: [
										{
											icon: { name: 'edit' },
											kind: IHWActionKinds.Simple
										}
									],
									warnings: {
										subtitle: true
									}
								}
							]
						},
						{
							id: 'toastWarning',
							type: 'toast',
							props: {
								headline: 'Uh-oh',
								text: 'Vicenta Maggio will be double-booked at this time',
								kind: 'warn',
								canRemove: false
							}
						}
					]
				},
				footer: {
					actions: [
						{
							text: 'Dismiss',
							kind: IHWActionKinds.Simple,
							isSmall: true
						},
						{
							text: 'Find a different time',
							kind: IHWActionKinds.Secondary,
							isSmall: true
						}
					]
				}
			}
		},
		{ ...services },
		{
			type: IHWCalendarEventDetailsItemType.List,
			viewModel: {
				id: 'status',
				items: [
					{
						id: 'first',
						item: {
							id: 'first',
							icon: { name: 'status' },
							title: 'Status',
							subtitle: 'Confirmed'
						},
						collapsedIconName: 'edit',
						expandedIconName: 'close',
						lists: statusLists
					}
				]
			}
		},
		{
			type: IHWCalendarEventDetailsItemType.Markdown,
			viewModel: {
				id: 'subtotalAndDuration',
				// NOTE: This would work with a markdown rendering component
				// Question: Can we deliver MD from the API?
				source: '**Subtotal: ** $65\n\n**Duration: ** 2hr'
			}
		},
		{
			type: IHWCalendarEventDetailsItemType.SplitButton,
			viewModel: {
				id: 'primaryCTA',
				kind: IHWActionKinds.Primary,
				isFullWidth: true,
				defaultAction: {
					text: 'Check guest in',
					isFullWidth: true
				},
				actions: [
					{
						text: 'Unconfirm appointment'
					},
					{
						text: 'Mark guest as late'
					},
					{
						text: 'Mark as no show'
					},
					{
						text: 'Book again'
					},
					{
						text: 'Cancel appointment'
					}
				]
			}
		}
	]
}

export const pastAppointment: IEventDetailsProps = {
	items: [
		{
			type: IHWCalendarEventDetailsItemType.List,
			viewModel: {
				id: 'guestInfo',
				items: [
					{
						id: 'first',
						avatar,
						title: 'Alejandra Pollich',
						subtitle: '(605) 230-5253',
						actions: [
							{
								icon: { name: 'edit' },
								kind: IHWActionKinds.Simple
							}
						]
					},
					{
						id: 'second',
						icon: { name: 'note', isLineIcon: true },
						title: 'Prefers products that aren’t tested on animals.',
						subtitle: 'Caleigh Jerde, 4 months ago',
						actions: [
							{
								icon: { name: 'edit' },
								kind: IHWActionKinds.Simple
							}
						]
					}
				]
			}
		},
		{
			type: IHWCalendarEventDetailsItemType.List,
			viewModel: {
				id: 'dateAndTime',
				items: [
					{
						id: 'first',
						icon: { name: 'calendar', isLineIcon: true },
						title: 'Web, Nov 28, 2018',
						subtitle: '11am–12:15pm'
					}
				]
			}
		},
		{
			type: IHWCalendarEventDetailsItemType.List,
			viewModel: {
				id: 'services',
				items: [
					{
						id: 'first',
						icon: { name: 'unordered_list', isLineIcon: true },
						title: 'Accent Highlight',
						subtitle: '$65 | 1hr',
						note: 'Vicenta Maggio'
					},
					{
						id: 'second',
						icon: { name: 'unordered_list', isLineIcon: true },
						isIconHidden: true,
						title: 'Haircut',
						subtitle: '$40 | 1hr',
						note: 'Vicenta Maggio'
					}
				]
			}
		},
		{
			type: IHWCalendarEventDetailsItemType.List,
			viewModel: {
				id: 'status',
				items: [
					{
						id: 'first',
						icon: { name: 'payment_success_solid' },
						title: 'Status',
						subtitle: 'Paid'
					}
				]
			}
		},
		{
			type: IHWCalendarEventDetailsItemType.Markdown,
			viewModel: {
				id: 'subtotalAndDuration',
				source: '**Subtotal: ** $65\n\n**Duration: ** 2hr'
			}
		},
		{
			type: IHWCalendarEventDetailsItemType.SplitButton,
			viewModel: {
				id: 'primaryCTA',
				kind: IHWActionKinds.Primary,
				isFullWidth: true,
				defaultAction: {
					text: 'Book again',
					isFullWidth: true
				},
				actions: [
					{
						text: 'Edit past appointment'
					}
				]
			}
		}
	]
}

export const lunchBreak: IEventDetailsProps = {
	items: [
		{
			type: IHWCalendarEventDetailsItemType.List,
			viewModel: {
				id: 'dateAndTime',
				items: [
					{
						id: 'first',
						icon: { name: 'calendar' },
						title: 'Sat, Jul 6, 2019',
						subtitle: '8am–8pm',
						note: 'Repeats every Saturday until 8/31/2019'
					}
				]
			}
		},
		{
			type: IHWCalendarEventDetailsItemType.List,
			viewModel: {
				id: 'person',
				items: [
					{
						id: 'first',
						avatar,
						title: 'Vicenta Maggio',
						subtitle: 'Stylist'
					}
				]
			}
		},
		{
			type: IHWCalendarEventDetailsItemType.List,
			viewModel: {
				id: 'breakType',
				items: [
					{
						id: 'first',
						icon: { name: 'info' },
						title: 'Paid break',
						subtitle: 'Teammates are paid during their lunch breaks'
					}
				]
			}
		},
		{
			type: IHWCalendarEventDetailsItemType.Button,
			viewModel: {
				id: 'actions',
				text: 'Reschedule',
				kind: IHWActionKinds.Secondary,
				isFullWidth: true
			}
		}
	]
}

export const ptoBlock: IEventDetailsProps = {
	items: [
		{
			type: IHWCalendarEventDetailsItemType.List,
			viewModel: {
				id: 'dateAndTime',
				items: [
					{
						id: 'first',
						icon: { name: 'calendar' },
						title: 'Sat, Jul 6, 2019',
						subtitle: '8am–8pm',
						note: 'Repeats every Saturday until 8/31/2019'
					}
				]
			}
		},
		{
			type: IHWCalendarEventDetailsItemType.List,
			viewModel: {
				id: 'person',
				items: [
					{
						id: 'person',
						avatar,
						title: 'Vicenta Maggio',
						subtitle: 'Stylist'
					}
				]
			}
		},
		{
			type: IHWCalendarEventDetailsItemType.List,
			viewModel: {
				id: 'breakType',
				items: [
					{
						id: 'breakType',
						icon: { name: 'info' },
						title: 'Paid time off',
						subtitle: '32 hours of PTO'
					}
				]
			}
		},
		{
			type: IHWCalendarEventDetailsItemType.Button,
			viewModel: {
				id: 'actions',
				text: 'Edit PTO Block',
				kind: IHWActionKinds.Secondary,
				isFullWidth: true
			}
		}
	]
}
