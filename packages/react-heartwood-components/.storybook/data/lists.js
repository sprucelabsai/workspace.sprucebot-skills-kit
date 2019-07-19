import { threeTextActions } from '..//data/actions'
export const dateList = [
	{
		title: 'Wed, Nov 28, 2018',
		subtitle: 'Closed'
	},
	{
		title: 'Thu, Nov 29, 2018',
		subtitle: 'Closed'
	},
	{
		title: 'Wed, Dec 25, 2018',
		subtitle: 'Closed'
	}
]

export const serviceList = [
	{
		title: 'Clean Up',
		subtitle: '$20 | 15min',
		contextMenu: {
			icon: {
				name: 'edit',
				isLineIcon: true
			},
			size: 'large',
			isSimple: true,
			actions: threeTextActions
		}
	},
	{
		title: 'Shampoo',
		subtitle: '$7 | 45min',
		contextMenu: {
			icon: {
				name: 'edit',
				isLineIcon: true
			},
			size: 'large',
			isSimple: true,
			actions: threeTextActions
		}
	},
	{
		title: 'Young Spruce',
		subtitle: '$23 | 50min',
		contextMenu: {
			icon: {
				name: 'edit',
				isLineIcon: true
			},
			size: 'large',
			isSimple: true,
			actions: threeTextActions
		}
	}
]

export const listHiddenIcons = [
	{
		icon: {
			name: 'calendar',
			isLineIcon: true
		},
		title: 'Wed, Nov 28, 2018',
		subtitle: 'Closed'
	},
	{
		icon: {
			name: 'calendar',
			isLineIcon: true
		},
		title: 'Thu, Nov 29, 2018',
		subtitle: 'Closed',
		iconIsHidden: true
	},
	{
		icon: {
			name: 'calendar',
			isLineIcon: true
		},
		title: 'Wed, Dec 25, 2018',
		subtitle: 'Closed',
		iconIsHidden: true
	}
]

export const nestedList = [
	{
		title: 'This is an item',
		subtitle: 'It has a nested list',
		list: {
			items: [
				{
					title: 'Nested one',
					subtitle: 'First nested item'
				},
				{
					title: 'Nested two',
					subtitle: 'Second nested item',
					list: {
						items: [
							{
								title: 'Double-nested one',
								subtitle: 'First double-nested item'
							},
							{
								title: 'Double-nested two',
								subtitle: 'Second double-nested item'
							}
						]
					}
				},
				{
					title: 'Nested three',
					subtitle: 'Third nested item'
				}
			]
		}
	}
]

export const listWithAction = [
	{
		title: 'Item one',
		subtitle: 'The first item'
	},
	{
		title: 'Item two',
		subtitle: 'The second item'
	},
	{
		title: 'Add something',
		icon: { name: 'add' },
		primaryAction: {
			text: 'Add someting',
			icon: { name: 'add' },
			kind: 'simple'
		}
	}
]

export const settingsList = [
	{
		title: 'Barber',
		toggleId: 'barber'
	},
	{
		title: 'Brow & Wax',
		toggleId: 'brow-and-wax'
	},
	{
		title: 'Featured',
		toggleId: 'featured'
	},
	{
		title: 'Gucci & Fire',
		toggleId: 'gucci-and-fire'
	},
	{
		title: 'Style Consulting',
		toggleId: 'style-consulting'
	}
]

export const selectableList = [
	{
		title: 'Clean Up',
		subtitle: '$20 | 15min',
		selectableId: 'cleanUp',
		selectableProps: {
			name: 'radio'
		}
	},
	{
		title: 'Shampoo',
		subtitle: '$7 | 45min',
		selectableId: 'shampoo',
		selectableProps: {
			name: 'radio'
		}
	},
	{
		title: 'Young Spruce',
		subtitle: '$23 | 50min',
		selectableId: 'youngSpruce',
		selectableProps: {
			name: 'radio'
		}
	}
]

export const expandableList = [
	{
		isExpandable: true,
		title: 'Parent item one',
		subtitle: 'The parent item',
		collapsedIcon: 'edit',
		expandedIcon: 'close',
		list: {
			items: [
				{
					title: 'Item one',
					subtitle: 'The first item'
				},
				{
					title: 'Item two',
					subtitle: 'The second item'
				}
			]
		}
	}
]
