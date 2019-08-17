const itemActions = [
	{
		icon:
			'<path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M11.8708 12.7801L8.7775 13.2226L9.21916 10.1284L17.1742 2.17345C17.9064 1.44121 19.0936 1.44121 19.8258 2.17345C20.5581 2.90568 20.5581 4.09287 19.8258 4.82511L11.8708 12.7801Z" stroke="#0076D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M16.29 3.05762L18.9417 5.70928" stroke="#0076D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M16.625 12.875V19.125C16.625 19.8154 16.0654 20.375 15.375 20.375H2.875C2.18464 20.375 1.625 19.8154 1.625 19.125V6.625C1.625 5.93464 2.18464 5.375 2.875 5.375H9.125" stroke="#0076D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
		width: '22',
		height: '22'
	}
]

module.exports = {
	title: 'Store Schedule Overrides',
	context: {
		listHeaderTitle: 'Store Schedule Overrides',
		items: [
			{
				title:
					'<span class="u-ff-proportional-oldstyle">Mon, Sep 3, 2018</span>',
				subtitle: '<span class="u-ff-proportional-oldstyle">12–5pm</span>',
				actions: itemActions
			},
			{
				title:
					'<span class="u-ff-proportional-oldstyle">Wed, Oct 31, 2018</span>',
				subtitle: '<span class="u-ff-proportional-oldstyle">8am–1pm</span>',
				actions: itemActions
			},
			{
				title:
					'<span class="u-ff-proportional-oldstyle">Thu, Nov 22, 2018</span>',
				subtitle: 'Closed',
				actions: itemActions
			},
			{
				title:
					'<span class="u-ff-proportional-oldstyle">Fri, Nov 23, 2018</span>',
				subtitle: '<span class="u-ff-proportional-oldstyle">6am–6pm</span>',
				actions: itemActions
			},
			{
				title:
					'<span class="u-ff-proportional-oldstyle">Wed, Nov 28, 2018</span>',
				subtitle: 'Closed',
				actions: itemActions
			},
			{
				title:
					'<span class="u-ff-proportional-oldstyle">Wed, Dec 25, 2018</span>',
				subtitle: 'Closed',
				actions: itemActions
			}
		]
	}
}
