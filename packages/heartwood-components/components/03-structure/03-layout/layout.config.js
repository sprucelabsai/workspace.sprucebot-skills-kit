module.exports = {
	title: 'Layout',
	status: 'wip',
	collated: true,
	collator: function(markup, item) {
		return `<!-- Start: @${item.handle} -->\n<h2 style="margin: 3rem 0;">${
			item.title
		}</h2><div>${markup}</div>\n<!-- End: @${item.handle} -->\n`
	},
	context: {
		sections: [
			{
				secondary: false,
				card: {
					title: 'Get the most out of Sprucebot',
					children:
						'<div class="card__body-inner">Two roads diverged in a wood, and I took the one less traveled by, And that has made all the difference.</div>',
					footerActions: [
						{
							text: 'Get some skills',
							className: 'btn-secondary btn-small'
						}
					]
				}
			},
			{
				secondary: false,
				card: {
					title: 'Get the most out of Sprucebot',
					children:
						'<div class="card__body-inner">Two roads diverged in a wood, and I took the one less traveled by, And that has made all the difference.</div>',
					footerActions: [
						{
							text: 'Get some skills',
							className: 'btn-secondary btn-small'
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
						secondary: true,
						card: {
							title: 'Get the most out of Sprucebot',
							children:
								'<div class="card__body-inner">Two roads diverged in a wood, and I took the one less traveled by, And that has made all the difference.</div>',
							footerActions: [
								{
									text: 'Get some skills',
									className: 'btn-secondary btn-small'
								}
							]
						}
					},
					{
						secondary: true,
						card: {
							title: 'Get the most out of Sprucebot',
							children:
								'<div class="card__body-inner">Two roads diverged in a wood, and I took the one less traveled by, And that has made all the difference.</div>',
							footerActions: [
								{
									text: 'Get some skills',
									className: 'btn-secondary btn-small'
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
						secondary: true,
						card: {
							title: 'Get the most out of Sprucebot',
							children:
								'<div class="card__body-inner">Two roads diverged in a wood, and I took the one less traveled by, And that has made all the difference.</div>',
							footerActions: [
								{
									text: 'Get some skills',
									className: 'btn-secondary btn-small'
								}
							]
						}
					},
					{
						secondary: true,
						card: {
							title: 'Get the most out of Sprucebot',
							children:
								'<div class="card__body-inner">Two roads diverged in a wood, and I took the one less traveled by, And that has made all the difference.</div>',
							footerActions: [
								{
									text: 'Get some skills',
									className: 'btn-secondary btn-small'
								}
							]
						}
					},
					{
						secondary: true,
						card: {
							title: 'Get the most out of Sprucebot',
							children:
								'<div class="card__body-inner">Two roads diverged in a wood, and I took the one less traveled by, And that has made all the difference.</div>',
							footerActions: [
								{
									text: 'Get some skills',
									className: 'btn-secondary btn-small'
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
						secondary: false,
						card: {
							title: 'Get the most out of Sprucebot',
							children:
								'<div class="card__body-inner">Two roads diverged in a wood, and I took the one less traveled by, And that has made all the difference.</div>',
							footerActions: [
								{
									text: 'Get some skills',
									className: 'btn-secondary btn-small'
								}
							]
						}
					},
					{
						secondary: true,
						card: {
							title: 'Get the most out of Sprucebot',
							children:
								'<div class="card__body-inner">Two roads diverged in a wood, and I took the one less traveled by, And that has made all the difference.</div>',
							footerActions: [
								{
									text: 'Get some skills',
									className: 'btn-secondary btn-small'
								}
							]
						}
					}
				]
			}
		}
	]
}
