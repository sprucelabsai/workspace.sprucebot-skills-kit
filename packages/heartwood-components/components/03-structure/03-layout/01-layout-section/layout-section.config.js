module.exports = {
	title: "Layout Sections",
	status: "wip",
	context: {
		sections: [
			'<p style="min-width: 10rem;">Section Content</p>'
		]
	},
	variants: [
	{
		name: "2 Columns Equal Width",
		context: {
			sections: [
			'<p style="min-width: 10rem;">Section Content</p>',
			'<p style="min-width: 10rem;">Section Content</p>'
			]
		}
	},
		{
			name: "3 Columns Equal Width",
			context: {
				sections: [
					'<p style="min-width: 10rem;">Section Content</p>',
					'<p style="min-width: 10rem;">Section Content</p>',
					'<p style="min-width: 10rem;">Section Content</p>'
				]
			}
		}
]
};
