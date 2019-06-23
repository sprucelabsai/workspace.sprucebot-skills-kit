// TODO: Add example of scoreboard card

const contextMenu = {
	actions: [
		{
			text: 'Edit Service',
			className: 'btn-simple btn-full-width'
		},
		{
			text: 'Hide Service',
			className: 'btn-simple btn-full-width'
		},
		{
			text: 'Move to Category',
			className: 'btn-simple btn-full-width'
		}
	]
}

module.exports = {
	title: 'Card',
	collated: true,
	collator: function(markup, item) {
		return `<!-- Start: @${item.handle} -->\n${markup}\n<!-- End: @${
			item.handle
		} -->\n`
	},
	context: {
		title: 'Get the most out of Sprucebot',
		children: [
			'Two roads diverged in a wood, and I took the one less traveled by, And that has made all the difference.'
		],
		footerActions: [
			{
				text: 'Get some skills',
				className: 'btn-secondary btn-small'
			}
		]
	},
	variants: [
		{
			name: 'Actions',
			context: {
				title: 'Add your teammates',
				children: [
					'<p>Whatever you can do, or dream you can, begin it. Boldness has genius, power and magic in it.</p>'
				],
				headerActions: [
					{
						text: 'Go to team',
						className: 'btn-simple btn-small'
					}
				],
				footerActions: [
					{
						text: 'Add teammates',
						className: 'btn-primary btn-small'
					}
				]
			}
		},
		{
			name: 'Labelled',
			context: {
				title: 'This card has a label',
				label: {
					text: 'Private',
					icon:
						'<path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M2.5 9C2.5 8.17157 3.17157 7.5 4 7.5H12C12.8284 7.5 13.5 8.17157 13.5 9V15C13.5 15.8284 12.8284 16.5 12 16.5H4C3.17157 16.5 2.5 15.8284 2.5 15V9Z" stroke="#737780" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M4.5 7.5V5C4.5 3.067 6.067 1.5 8 1.5C9.933 1.5 11.5 3.067 11.5 5V7.5" stroke="#737780" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M8 13.5C8.82843 13.5 9.5 12.8284 9.5 12C9.5 11.1716 8.82843 10.5 8 10.5C7.17157 10.5 6.5 11.1716 6.5 12C6.5 12.8284 7.17157 13.5 8 13.5Z" stroke="#737780" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
					iconWidth: '16',
					iconHeight: '18'
				},
				children: [
					'Whatever you can do, or dream you can, begin it. Boldness has genius, power and magic in it.'
				],
				headerActions: true,
				contextMenu: contextMenu
			}
		},
		{
			name: 'Label Only',
			context: {
				title: null,
				label: {
					text: 'Private',
					icon:
						'<path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M2.5 9C2.5 8.17157 3.17157 7.5 4 7.5H12C12.8284 7.5 13.5 8.17157 13.5 9V15C13.5 15.8284 12.8284 16.5 12 16.5H4C3.17157 16.5 2.5 15.8284 2.5 15V9Z" stroke="#737780" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M4.5 7.5V5C4.5 3.067 6.067 1.5 8 1.5C9.933 1.5 11.5 3.067 11.5 5V7.5" stroke="#737780" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M8 13.5C8.82843 13.5 9.5 12.8284 9.5 12C9.5 11.1716 8.82843 10.5 8 10.5C7.17157 10.5 6.5 11.1716 6.5 12C6.5 12.8284 7.17157 13.5 8 13.5Z" stroke="#737780" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
					iconWidth: '16',
					iconHeight: '18'
				},
				children: [
					'Unapologetic travel nerd. Professional entrepreneur. Explorer. Bacon buff. Proud communicator. Introvert. Avid writer.'
				],
				headerActions: true,
				contextMenu: contextMenu,
				footerActions: null
			}
		},
		{
			name: 'Context only',
			context: {
				title: null,
				children: [
					'Unapologetic travel nerd. Professional entrepreneur. Explorer. Bacon buff. Proud communicator. Introvert. Avid writer.'
				],
				headerActions: true,
				contextMenu: contextMenu,
				footerActions: null
			}
		},
		{
			name: 'Actions 02',
			context: {
				title: 'If you could time travel, what would you do?',
				children: [
					'Twenty years from now you will be more disappointed by the things that you didn’t do than by the ones you did do, so throw off the bowlines, sail away from safe harbor, catch the trade winds in your sails. Explore, Dream, Discover.'
				],
				headerActions: true,
				contextMenu: contextMenu,
				footerActions: [
					{
						text: 'Catch fireflies at night',
						className: 'btn-secondary btn-small'
					}
				]
			}
		},
		{
			name: 'centered',
			context: {
				title: null,
				children: [
					'<div class="avatar-wrapper avatar-wrapper-large"><div class="avatar__image-wrapper"><img class="avatar" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=5d43ec18ec2cf6ff854513b9e8395c1e&auto=format&fit=crop&w=192&h=192&q=80" alt="avatar" width="96" height="96" /></div></div><h3 class="card-header__title">Say "Happy Birthday"</h3><p>It’s Rosamond Mueller’s birthday today. Don’t forget to say happy birthday!</p>'
				],
				centered: true,
				footerActions: [
					{
						text: 'Send a birthday message',
						className: 'btn-secondary btn-small'
					}
				]
			}
		}
	]
}
