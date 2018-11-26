module.exports = {
	title: 'Text Input',
	status: 'wip',
	collated: true,
	collator: function(markup, item) {
        return `<!-- Start: @${item.handle} -->\n<div style="margin-bottom: 1rem;">${markup}</div>\n<!-- End: @${item.handle} -->\n`
	},
	context: {
		label: 'Email Address',
		placeholder: 'johndoe@gmail.com',
		type: 'email',
		id: 'email-address',
		name: 'emailAddress'
	},
	variants: [
		{
			name: 'small',
			context: {
				class: 'text-input-small'
			}
		},
		{
			name: 'with helper',
			context: {
				type: 'text',
				label: 'First Name',
				placeholder: 'Pat',
				helper: 'We use this information to improve your shopping experience',
				id: 'first-name',
				name: 'firstName'
			}
		},
		{
			name: 'with error',
			context: {
				class: 'text-input--has-error',
				value: 'jon ronson',
				error: 'Please include a valid email address'
			}
		},
		{
			name: 'read only',
			context: {
				value: 'hello@sprucelabs.ai',
				readonly: true
			}
		}
	]
  }