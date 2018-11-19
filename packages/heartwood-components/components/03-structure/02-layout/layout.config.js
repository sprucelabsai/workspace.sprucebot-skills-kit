const Classes = require('../../classes')

module.exports = {
	title: 'Layout',
	status: 'wip',
	collated: true,
	collator: function(markup, item) {
		return `<!-- Start: @${item.handle} -->\n<h2 style="margin: 3rem 0;">${
			item.label
		}</h2><div>${markup}</div>\n<!-- End: @${item.handle} -->\n`
	},
	context: {
		sections: [
			{
				Classes: Classes,
				secondary: false,
				card: {
					Classes: Classes,
					title: 'Get the most out of Sprucebot',
					children:
						'Two roads diverged in a wood, and I took the one less traveled by, And that has made all the difference.',
					footerActions: [
						{
							Classes: Classes,
							text: 'Get some skills',
							className: `${Classes.ButtonSecondary} ${Classes.Button_Small}`
						}
					]
				}
			},
			{
				Classes: Classes,
				secondary: false,
				card: {
					Classes: Classes,
					title: 'Get the most out of Sprucebot',
					children:
						'Two roads diverged in a wood, and I took the one less traveled by, And that has made all the difference.',
					footerActions: [
						{
							Classes: Classes,
							text: 'Get some skills',
							className: `${Classes.ButtonSecondary} ${Classes.Button_Small}`
						}
					]
				}
			}
		]
	},
	variants: [
		{
			name: '2 Columns Equal Width',
			context: {
				sections: [
					{
						Classes: Classes,
						secondary: true,
						card: {
							Classes: Classes,
							title: 'Get the most out of Sprucebot',
							children:
								'Two roads diverged in a wood, and I took the one less traveled by, And that has made all the difference.',
							footerActions: [
								{
									Classes: Classes,
									text: 'Get some skills',
									className: `${Classes.ButtonSecondary} ${
										Classes.Button_Small
									}`
								}
							]
						}
					},
					{
						Classes: Classes,
						secondary: true,
						card: {
							Classes: Classes,
							title: 'Get the most out of Sprucebot',
							children:
								'Two roads diverged in a wood, and I took the one less traveled by, And that has made all the difference.',
							footerActions: [
								{
									Classes: Classes,
									text: 'Get some skills',
									className: `${Classes.ButtonSecondary} ${
										Classes.Button_Small
									}`
								}
							]
						}
					}
				]
			}
		},
		{
			name: '3 Columns Equal Width',
			context: {
				sections: [
					{
						Classes: Classes,
						secondary: true,
						card: {
							Classes: Classes,
							title: 'Get the most out of Sprucebot',
							children:
								'Two roads diverged in a wood, and I took the one less traveled by, And that has made all the difference.',
							footerActions: [
								{
									Classes: Classes,
									text: 'Get some skills',
									className: `${Classes.ButtonSecondary} ${
										Classes.Button_Small
									}`
								}
							]
						}
					},
					{
						Classes: Classes,
						secondary: true,
						card: {
							Classes: Classes,
							title: 'Get the most out of Sprucebot',
							children:
								'Two roads diverged in a wood, and I took the one less traveled by, And that has made all the difference.',
							footerActions: [
								{
									Classes: Classes,
									text: 'Get some skills',
									className: `${Classes.ButtonSecondary} ${
										Classes.Button_Small
									}`
								}
							]
						}
					},
					{
						Classes: Classes,
						secondary: true,
						card: {
							Classes: Classes,
							title: 'Get the most out of Sprucebot',
							children:
								'Two roads diverged in a wood, and I took the one less traveled by, And that has made all the difference.',
							footerActions: [
								{
									Classes: Classes,
									text: 'Get some skills',
									className: `${Classes.ButtonSecondary} ${
										Classes.Button_Small
									}`
								}
							]
						}
					}
				]
			}
		},
		{
			name: '2 Columns Primary and Secondary Width',
			context: {
				sections: [
					{
						Classes: Classes,
						secondary: false,
						card: {
							Classes: Classes,
							title: 'Get the most out of Sprucebot',
							children:
								']Two roads diverged in a wood, and I took the one less traveled by, And that has made all the difference.',
							footerActions: [
								{
									Classes: Classes,
									text: 'Get some skills',
									className: `${Classes.ButtonSecondary} ${
										Classes.Button_Small
									}`
								}
							]
						}
					},
					{
						Classes: Classes,
						secondary: true,
						card: {
							Classes: Classes,
							title: 'Get the most out of Sprucebot',
							children:
								'Two roads diverged in a wood, and I took the one less traveled by, And that has made all the difference.',
							footerActions: [
								{
									Classes: Classes,
									text: 'Get some skills',
									className: `${Classes.ButtonSecondary} ${
										Classes.Button_Small
									}`
								}
							]
						}
					}
				]
			}
		}
	]
}
