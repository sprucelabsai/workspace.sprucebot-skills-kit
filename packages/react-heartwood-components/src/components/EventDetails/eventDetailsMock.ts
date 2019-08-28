import { IEventDetailsItemProps } from './components/EventDetailsItem/EventDetailsItem'
import { IEventDetailsProps } from './EventDetails'
import { IListProps } from '../List'
import { ButtonKinds } from '../Button/Button'

const avatar =
	'https://images.unsplash.com/photo-1542080681-b52d382432af?ixlib=rb-1.2.1&auto=format&fit=crop&w=96&h=96&q=80'

const services: IEventDetailsItemProps = {
	id: 'services',
	type: 'list',
	viewModel: {
		items: [
			{
				icon: { name: 'unordered_list', isLineIcon: true },
				title: 'Accent Highlight',
				subtitle: '$65 | 1hr',
				note: 'Vicenta Maggio',
				contextMenu: {
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
				icon: { name: 'unordered_list', isLineIcon: true },
				iconIsHidden: true,
				title: 'Haircut',
				subtitle: '$40 | 1hr',
				note: 'Vicenta Maggio',
				contextMenu: {
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
				title: 'Add service',
				icon: { name: 'add' },
				primaryAction: {
					icon: { name: 'add' },
					kind: ButtonKinds.Simple
				}
			}
		]
	}
}

const inclusiveStatuses = [
	{
		title: 'Confirmed',
		selectableId: 'confirmed',
		selectableProps: {
			name: 'checkbox'
		}
	},
	{
		title: 'Checked in',
		selectableId: 'checkedIn',
		selectableProps: {
			name: 'checkbox'
		}
	}
]
const exclusiveStatuses = [
	{
		title: 'On time',
		selectableId: 'onTime',
		selectableProps: {
			name: 'radio'
		}
	},
	{
		title: 'Late',
		selectableId: 'late',
		selectableProps: {
			name: 'radio'
		}
	},
	{
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
		selectableType: 'checkbox',
		items: inclusiveStatuses,
		areSeparatorsVisible: false
	},
	{
		selectableType: 'radio',
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
			id: 'guestInfo',
			type: 'list',
			viewModel: {
				items: [
					{
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
								kind: ButtonKinds.Simple
							}
						]
					}
				]
			}
		},
		{
			id: 'dateAndTime',
			type: 'list',
			viewModel: {
				items: [
					{
						icon: { name: 'calendar', isLineIcon: true },
						title: 'Web, Nov 28, 2018',
						subtitle: '11am–12:15pm',
						actions: [
							{
								icon: { name: 'edit' },
								kind: ButtonKinds.Simple
							}
						]
					}
				]
			}
		},
		{ ...services },
		{
			id: 'status',
			type: 'list',
			viewModel: {
				items: [
					{
						icon: { name: 'status' },
						title: 'Status',
						subtitle: 'Confirmed',
						isExpandable: true,
						collapsedIcon: 'edit',
						expandedIcon: 'close',
						lists: statusLists
					}
				]
			}
		},
		{
			id: 'subtotalAndDuration',
			type: 'markdown',
			viewModel: {
				source: '**Subtotal: ** $65\n\n**Duration: ** 2hr'
			}
		},
		{
			id: 'primaryCTA',
			type: 'splitButton',
			viewModel: {
				kind: ButtonKinds.Primary,
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
			id: 'guestInfo',
			type: 'list',
			viewModel: {
				items: [
					{
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
								kind: ButtonKinds.Simple
							}
						]
					}
				]
			}
		},
		{
			id: 'dateAndTime',
			type: 'card',
			viewModel: {
				body: {
					children: [
						{
							id: 'dateAndTime',
							key: 'list',
							type: 'list',
							items: [
								{
									key: '1',
									icon: { name: 'calendar', isLineIcon: true },
									title: 'Web, Nov 28, 2018',
									subtitle: '11am–12:15pm',
									actions: [
										{
											icon: { name: 'edit' },
											kind: ButtonKinds.Simple
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
							kind: ButtonKinds.Simple,
							isSmall: true
						},
						{
							text: 'Find a different time',
							kind: ButtonKinds.Secondary,
							isSmall: true
						}
					]
				}
			}
		},
		{ ...services },
		{
			id: 'status',
			type: 'list',
			viewModel: {
				items: [
					{
						icon: { name: 'status' },
						title: 'Status',
						subtitle: 'Confirmed',
						// TODO: Make list item expandable to make this work
						isExpandable: true,
						collapsedIcon: 'edit',
						expandedIcon: 'close',
						lists: statusLists
					}
				]
			}
		},
		{
			id: 'subtotalAndDuration',
			type: 'markdown',
			viewModel: {
				// NOTE: This would work with a markdown rendering component
				// Question: Can we deliver MD from the API?
				source: '**Subtotal: ** $65\n\n**Duration: ** 2hr'
			}
		},
		{
			id: 'primaryCTA',
			type: 'splitButton',
			viewModel: {
				kind: ButtonKinds.Primary,
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
			id: 'guestInfo',
			type: 'list',
			viewModel: {
				items: [
					{
						avatar,
						title: 'Alejandra Pollich',
						subtitle: '(605) 230-5253',
						actions: [
							{
								icon: { name: 'edit' },
								kind: ButtonKinds.Simple
							}
						]
					},
					{
						icon: { name: 'note', isLineIcon: true },
						title: 'Prefers products that aren’t tested on animals.',
						subtitle: 'Caleigh Jerde, 4 months ago',
						actions: [
							{
								icon: { name: 'edit' },
								kind: ButtonKinds.Simple
							}
						]
					}
				]
			}
		},
		{
			id: 'dateAndTime',
			type: 'list',
			viewModel: {
				items: [
					{
						icon: { name: 'calendar', isLineIcon: true },
						title: 'Web, Nov 28, 2018',
						subtitle: '11am–12:15pm'
					}
				]
			}
		},
		{
			id: 'services',
			type: 'list',
			viewModel: {
				items: [
					{
						icon: { name: 'unordered_list', isLineIcon: true },
						title: 'Accent Highlight',
						subtitle: '$65 | 1hr',
						note: 'Vicenta Maggio'
					},
					{
						icon: { name: 'unordered_list', isLineIcon: true },
						iconIsHidden: true,
						title: 'Haircut',
						subtitle: '$40 | 1hr',
						note: 'Vicenta Maggio'
					}
				]
			}
		},
		{
			id: 'status',
			type: 'list',
			viewModel: {
				items: [
					{
						icon: { name: 'payment_success_solid' },
						title: 'Status',
						subtitle: 'Paid'
					}
				]
			}
		},
		{
			id: 'subtotalAndDuration',
			type: 'markdown',
			viewModel: {
				// NOTE: This would work with a markdown rendering component
				// Question: Can we deliver MD from the API?
				source: '**Subtotal: ** $65\n\n**Duration: ** 2hr'
			}
		},
		{
			id: 'primaryCTA',
			type: 'splitButton',
			viewModel: {
				kind: ButtonKinds.Primary,
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
			id: 'dateAndTime',
			type: 'list',
			viewModel: {
				items: [
					{
						icon: { name: 'calendar' },
						title: 'Sat, Jul 6, 2019',
						subtitle: '8am–8pm',
						note: 'Repeats every Saturday until 8/31/2019'
					}
				]
			}
		},
		{
			id: 'person',
			type: 'list',
			viewModel: {
				items: [
					{
						avatar,
						title: 'Vicenta Maggio',
						subtitle: 'Stylist'
					}
				]
			}
		},
		{
			id: 'breakType',
			type: 'list',
			viewModel: {
				items: [
					{
						icon: { name: 'info' },
						title: 'Paid break',
						subtitle: 'Teammates are paid during their lunch breaks'
					}
				]
			}
		},
		{
			id: 'actions',
			type: 'button',
			viewModel: {
				text: 'Reschedule',
				kind: ButtonKinds.Secondary,
				isFullWidth: true
			}
		}
	]
}

export const ptoBlock: IEventDetailsProps = {
	items: [
		{
			id: 'dateAndTime',
			type: 'list',
			viewModel: {
				items: [
					{
						icon: { name: 'calendar' },
						title: 'Sat, Jul 6, 2019',
						subtitle: '8am–8pm',
						note: 'Repeats every Saturday until 8/31/2019'
					}
				]
			}
		},
		{
			id: 'person',
			type: 'list',
			viewModel: {
				items: [
					{
						avatar,
						title: 'Vicenta Maggio',
						subtitle: 'Stylist'
					}
				]
			}
		},
		{
			id: 'breakType',
			type: 'list',
			viewModel: {
				items: [
					{
						icon: { name: 'info' },
						title: 'Paid time off',
						subtitle: '32 hours of PTO'
					}
				]
			}
		},
		{
			id: 'actions',
			type: 'button',
			viewModel: {
				text: 'Edit PTO Block',
				kind: ButtonKinds.Secondary,
				isFullWidth: true
			}
		}
	]
}
