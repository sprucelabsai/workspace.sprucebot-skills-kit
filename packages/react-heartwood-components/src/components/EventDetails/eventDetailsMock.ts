import { IEventDetailsItemProps } from './components/EventDetailsItem/EventDetailsItem'
import { IEventDetailsProps } from './EventDetails'
import { IListProps, IWrappedItemProps } from '../List'
import {
	IHWCalendarEventDetailsItemType,
	IHWListItemSelectableType,
	IHWContextMenuSize,
	IHWCardBuilderBodyItemType,
	IHWActionTypes
} from '@sprucelabs/spruce-types'
import { ButtonKinds } from '../Button/Button'

const avatar =
	'https://images.unsplash.com/photo-1542080681-b52d382432af?ixlib=rb-1.2.1&auto=format&fit=crop&w=96&h=96&q=80'

const services: IEventDetailsItemProps = {
	type: IHWCalendarEventDetailsItemType.List,
	viewModel: {
		id: 'services',
		items: [
			{
				id: 'first',
				icon: { name: 'unordered_list', isLineIcon: true, id: 'unordered' },
				title: 'Accent Highlight',
				subtitle: '$65 | 1hr',
				note: 'Vicenta Maggio',
				contextMenu: {
					icon: { id: 'edit', name: 'edit', isLineIcon: true },
					isSimple: true,
					isSmall: true,
					size: IHWContextMenuSize.Large,
					actions: [
						{
							id: 'save-teammate',
							text: 'Change teammate',
							action: {
								type: IHWActionTypes.EmitEvent,
								payload: {
									eventName: 'change-teammate'
								}
							}
						},
						{
							id: 'remove-appointment',
							text: 'Remove from appointment',
							action: {
								type: IHWActionTypes.EmitEvent,
								payload: {
									eventName: 'remove-from-appointment'
								}
							}
						}
					]
				}
			},
			{
				id: 'second',
				icon: { id: 'second-icon', name: 'unordered_list', isLineIcon: true },
				isIconHidden: true,
				title: 'Haircut',
				subtitle: '$40 | 1hr',
				note: 'Vicenta Maggio',
				contextMenu: {
					icon: { id: 'edit', name: 'edit', isLineIcon: true },
					isSimple: true,
					isSmall: true,
					size: IHWContextMenuSize.Large,
					actions: [
						{
							id: 'change-teammate',
							text: 'Change teammate',
							action: {
								type: IHWActionTypes.EmitEvent,
								payload: {
									eventName: 'change-teammate'
								}
							}
						},
						{
							id: 'remove',
							text: 'Remove from appointment',
							action: {
								type: IHWActionTypes.EmitEvent,
								payload: {
									eventName: 'remove-from-appointment'
								}
							}
						}
					]
				}
			},
			{
				id: 'last',
				title: 'Add service',
				icon: { id: 'add', name: 'add' },
				primaryAction: {
					id: 'add',
					icon: { id: 'add', name: 'add' },
					kind: ButtonKinds.Simple,
					action: {
						type: IHWActionTypes.EmitEvent,
						payload: {
							eventName: 'add-service'
						}
					}
				}
			}
		]
	}
}

const inclusiveStatuses: IWrappedItemProps[] = [
	{
		id: 'status',
		title: 'Confirmed',
		selectableId: 'confirmed',
		selectableProps: {
			name: 'checkbox',
			action: {
				type: IHWActionTypes.EmitEvent,
				payload: {
					eventName: 'checkbox-checked'
				}
			}
		}
	},
	{
		id: 'checked-in',
		title: 'Checked in',
		selectableId: 'checkedIn',
		selectableProps: {
			name: 'checkbox',
			action: {
				type: IHWActionTypes.EmitEvent,
				payload: {
					eventName: 'checkbox-checked'
				}
			}
		}
	}
]
const exclusiveStatuses: IWrappedItemProps[] = [
	{
		id: 'on-time',
		title: 'On time',
		selectableId: 'onTime',
		selectableProps: {
			name: 'radio',
			action: {
				type: IHWActionTypes.EmitEvent,
				payload: {
					eventName: 'radio-checked'
				}
			}
		}
	},
	{
		id: 'late',
		title: 'Late',
		selectableId: 'late',
		selectableProps: {
			name: 'radio',
			action: {
				type: IHWActionTypes.EmitEvent,
				payload: {
					eventName: 'radio-checked'
				}
			}
		}
	},
	{
		id: 'ghosted',
		title: 'Ghosted 👻',
		selectableId: 'noShow',
		selectableProps: {
			name: 'radio',
			action: {
				type: IHWActionTypes.EmitEvent,
				payload: {
					eventName: 'radio-checked'
				}
			}
		}
	}
]

const paidStatuses = [
	{
		id: 'unpaid',
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
							size: IHWContextMenuSize.Large,
							actions: [
								{
									text: 'Edit guest',
									action: {
										type: IHWActionTypes.EmitEvent,
										payload: {
											eventName: 'edit-guest'
										}
									}
								},
								{
									text: 'Book for someone else',
									action: {
										type: IHWActionTypes.EmitEvent,
										payload: {
											eventName: 'book-for-someone-else'
										}
									}
								}
							]
						}
					},
					{
						id: 'pinned-note',
						icon: { name: 'note', isLineIcon: true },
						title: 'Prefers products that aren’t tested on animals.',
						subtitle: 'Caleigh Jerde, 4 months ago',
						actions: [
							{
								icon: { name: 'edit' },
								kind: ButtonKinds.Simple,
								action: {
									type: IHWActionTypes.EmitEvent,
									payload: {
										eventName: 'edit-note'
									}
								}
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
								kind: ButtonKinds.Simple,
								action: {
									type: IHWActionTypes.EmitEvent,
									payload: {
										eventName: 'edit-date'
									}
								}
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
			type: IHWCalendarEventDetailsItemType.Markdown,
			viewModel: {
				source: '**Subtotal: ** $65\n\n**Duration: ** 2hr'
			}
		},
		{
			type: IHWCalendarEventDetailsItemType.SplitButton,
			viewModel: {
				kind: ButtonKinds.Primary,
				isFullWidth: true,
				defaultAction: {
					text: 'Check guest in',
					isFullWidth: true,
					action: {
						type: IHWActionTypes.EmitEvent,
						payload: {
							eventName: 'guest-check-in'
						}
					}
				},
				actions: [
					{
						text: 'Unconfirm appointment',
						action: {
							type: IHWActionTypes.EmitEvent,
							payload: {
								eventName: 'unconfirm'
							}
						}
					},
					{
						text: 'Mark guest as late',
						action: {
							type: IHWActionTypes.EmitEvent,
							payload: {
								eventName: 'mark-late'
							}
						}
					},
					{
						text: 'Mark as no show',
						action: {
							type: IHWActionTypes.EmitEvent,
							payload: {
								eventName: 'mark-no-show'
							}
						}
					},
					{
						text: 'Book again',
						action: {
							type: IHWActionTypes.EmitEvent,
							payload: {
								eventName: 'book-again'
							}
						}
					},
					{
						text: 'Cancel appointment',
						action: {
							type: IHWActionTypes.EmitEvent,
							payload: {
								eventName: 'cancel-appointment'
							}
						}
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
							size: IHWContextMenuSize.Large,
							actions: [
								{
									text: 'Edit guest',
									action: {
										type: IHWActionTypes.EmitEvent,
										payload: {
											eventName: 'edit-guest'
										}
									}
								},
								{
									text: 'Book for someone else',
									action: {
										type: IHWActionTypes.EmitEvent,
										payload: {
											eventName: 'book-for-someone-else'
										}
									}
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
								kind: ButtonKinds.Simple,
								action: {
									type: IHWActionTypes.EmitEvent,
									payload: {
										eventName: 'edit-note'
									}
								}
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
					items: [
						{
							type: IHWCardBuilderBodyItemType.List,
							viewModel: {
								id: 'list',
								items: [
									{
										id: '1',
										icon: { id: 'foo', name: 'calendar', isLineIcon: true },
										title: 'Web, Nov 28, 2018',
										subtitle: '11am–12:15pm',
										actions: [
											{
												id: 'foo',
												icon: { id: 'foo', name: 'edit' },
												kind: ButtonKinds.Simple,
												action: {
													type: IHWActionTypes.EmitEvent,
													payload: {
														eventName: 'edit-date'
													}
												}
											}
										],
										warnings: {
											subtitle: true
										}
									}
								]
							}
						},
						{
							type: IHWCardBuilderBodyItemType.Toast,
							viewModel: {
								id: 'toastWarning',
								headline: 'Uh-oh',
								text: 'Vicenta Maggio will be double-booked at this time',
								kind: 'warn',
								canRemove: false
							}
						}
					]
				},
				footer: {
					buttonGroup: {
						actions: [
							{
								text: 'Dismiss',
								kind: ButtonKinds.Simple,
								isSmall: true,
								id: 'foo',
								action: {
									type: IHWActionTypes.EmitEvent,
									payload: {
										eventName: 'dismiss'
									}
								}
							},
							{
								text: 'Find a different time',
								kind: ButtonKinds.Secondary,
								isSmall: true,
								id: 'bar',
								action: {
									type: IHWActionTypes.EmitEvent,
									payload: {
										eventName: 'find-different-time'
									}
								}
							}
						]
					}
				}
			}
		},
		services,
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
				kind: ButtonKinds.Primary,
				isFullWidth: true,
				defaultAction: {
					text: 'Check guest in',
					isFullWidth: true,
					action: {
						type: IHWActionTypes.EmitEvent,
						payload: {
							eventName: 'check-in'
						}
					}
				},
				actions: [
					{
						text: 'Unconfirm appointment',
						action: {
							type: IHWActionTypes.EmitEvent,
							payload: {
								eventName: 'unconfirm'
							}
						}
					},
					{
						text: 'Mark guest as late',
						action: {
							type: IHWActionTypes.EmitEvent,
							payload: {
								eventName: 'mark-late'
							}
						}
					},
					{
						text: 'Mark as no show',
						action: {
							type: IHWActionTypes.EmitEvent,
							payload: {
								eventName: 'mark-no-show'
							}
						}
					},
					{
						text: 'Book again',
						action: {
							type: IHWActionTypes.EmitEvent,
							payload: {
								eventName: 'book-again'
							}
						}
					},
					{
						text: 'Cancel appointment',
						action: {
							type: IHWActionTypes.EmitEvent,
							payload: {
								eventName: 'cancel-appointment'
							}
						}
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
								kind: ButtonKinds.Simple,
								action: {
									type: IHWActionTypes.EmitEvent,
									payload: {
										eventName: 'edit-guest'
									}
								}
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
								kind: ButtonKinds.Simple,
								action: {
									type: IHWActionTypes.EmitEvent,
									payload: {
										eventName: 'edit-note'
									}
								}
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
				kind: ButtonKinds.Primary,
				isFullWidth: true,
				defaultAction: {
					text: 'Book again',
					isFullWidth: true,
					action: {
						type: IHWActionTypes.EmitEvent,
						payload: {
							eventName: 'book-again'
						}
					}
				},
				actions: [
					{
						text: 'Edit past appointment',
						action: {
							type: IHWActionTypes.EmitEvent,
							payload: {
								eventName: 'edit-past-appointment'
							}
						}
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
				kind: ButtonKinds.Secondary,
				isFullWidth: true,
				action: {
					type: IHWActionTypes.EmitEvent,
					payload: {
						eventName: 'reschedule'
					}
				}
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
				kind: ButtonKinds.Secondary,
				isFullWidth: true,
				action: {
					type: IHWActionTypes.EmitEvent,
					payload: {
						eventName: 'edit-pto-block'
					}
				}
			}
		}
	]
}
