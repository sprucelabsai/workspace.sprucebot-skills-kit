const image = 'https://images.unsplash.com/photo-1524593689594-aae2f26b75ab?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4c06a1bc6123a9ac6645a269314334b2&auto=format&fit=crop&w=192&h=192&q=80' 


module.exports = {
	title: 'Layouts',
	context: {
		openIcon: '<path d="M0 0h24v24H0z" fill="none"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>',
		closeIcon: '<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/>'
	},
	variants: [
		{
			name: 'View',
			context: {
				showHeader: true,
				showSidebar: true,
				business: 'Chimera Hair Salon',
				address: '7678 N High St, Denver, CO',
				user: {
					name: 'Erica Romaguera',
					phoneNumber: '(605) 230-5253',
					image
				},
				pageTitle: 'Booking Dashboard',
				items: [
					{
						text: 'Dashboard',
						icon: '<path fill="none" d="M8.5 13.7434V13.5059C8.5 12.1251 9.61929 11.0059 11 11.0059C12.3807 11.0059 13.5 12.1251 13.5 13.5059V13.7434" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M12.8766 5.38086L11.0016 11.0059" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M6.31415 7.25586C6.14156 7.25586 6.00165 7.39577 6.00165 7.56836C6.00165 7.74095 6.14156 7.88086 6.31415 7.88086C6.48674 7.88086 6.62665 7.74095 6.62665 7.56836C6.62665 7.39577 6.48674 7.25586 6.31415 7.25586V7.25586" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M16.9391 10.3809C16.7666 10.3809 16.6266 10.5208 16.6266 10.6934C16.6266 10.8659 16.7666 11.0059 16.9391 11.0059C17.1117 11.0059 17.2516 10.8659 17.2516 10.6934C17.2516 10.5208 17.1117 10.3809 16.9391 10.3809V10.3809" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M15.6892 7.25586C15.5626 7.25519 15.4482 7.3309 15.3993 7.44762C15.3504 7.56433 15.3767 7.69902 15.4659 7.78874C15.5552 7.87846 15.6897 7.9055 15.8067 7.85723C15.9237 7.80896 16 7.69491 16 7.56836C16 7.39577 15.8601 7.25586 15.6875 7.25586V7.25586" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M8.81415 4.75586C8.64156 4.75586 8.50165 4.89577 8.50165 5.06836C8.50165 5.24095 8.64156 5.38086 8.81415 5.38086C8.98674 5.38086 9.12665 5.24095 9.12665 5.06836C9.12665 4.89577 8.98674 4.75586 8.81415 4.75586V4.75586" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M18.8591 16.1184C14.1987 12.635 7.80129 12.635 3.14081 16.1184" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M11 20.3809C16.1777 20.3809 20.375 16.1835 20.375 11.0059C20.375 5.82819 16.1777 1.63086 11 1.63086C5.82233 1.63086 1.625 5.82819 1.625 11.0059C1.625 16.1835 5.82233 20.3809 11 20.3809Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M5.06415 10.3809C4.89156 10.3809 4.75165 10.5208 4.75165 10.6934C4.75165 10.8659 4.89156 11.0059 5.06415 11.0059C5.23674 11.0059 5.37665 10.8659 5.37665 10.6934C5.37665 10.5208 5.23674 10.3809 5.06415 10.3809" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
						width: '22',
						height: '22'
					}, {
						text: 'Guests',
						icon: '<path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M4.75 7.875C5.78553 7.875 6.625 7.03553 6.625 6C6.625 4.96447 5.78553 4.125 4.75 4.125C3.71447 4.125 2.875 4.96447 2.875 6C2.875 7.03553 3.71447 7.875 4.75 7.875Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M4.75 9.125C3.02411 9.125 1.625 10.5241 1.625 12.25V14.125H2.875L3.5 19.125H6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M17.25 7.875C18.2855 7.875 19.125 7.03553 19.125 6C19.125 4.96447 18.2855 4.125 17.25 4.125C16.2145 4.125 15.375 4.96447 15.375 6C15.375 7.03553 16.2145 7.875 17.25 7.875Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M17.25 9.125C18.9759 9.125 20.375 10.5241 20.375 12.25V14.125H19.125L18.5 19.125H16" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M11 6.625C12.3807 6.625 13.5 5.50571 13.5 4.125C13.5 2.74429 12.3807 1.625 11 1.625C9.61929 1.625 8.5 2.74429 8.5 4.125C8.5 5.50571 9.61929 6.625 11 6.625Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M15.375 12.25C15.375 9.83375 13.4162 7.875 11 7.875C8.58375 7.875 6.625 9.83375 6.625 12.25V14.125H8.5L9.125 20.375H12.875L13.5 14.125H15.375V12.25Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
						width: '22',
						height: '22'
					}, {
						text: 'Team',
						icon: '<path fill="none" d="M9.125 4.375H2.875C2.18464 4.375 1.625 4.93464 1.625 5.625V16.875C1.625 17.5654 2.18464 18.125 2.875 18.125H19.125C19.8154 18.125 20.375 17.5654 20.375 16.875V5.625C20.375 4.93464 19.8154 4.375 19.125 4.375H12.875" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M12.875 3.75C12.875 2.71447 12.0355 1.875 11 1.875C9.96447 1.875 9.125 2.71447 9.125 3.75V6.25C9.125 6.41576 9.19085 6.57473 9.30806 6.69194C9.42527 6.80915 9.58424 6.875 9.75 6.875H12.25C12.5952 6.875 12.875 6.59518 12.875 6.25V3.75Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M7.875 13.75C9.08312 13.75 10.0625 12.7706 10.0625 11.5625C10.0625 10.3544 9.08312 9.375 7.875 9.375C6.66688 9.375 5.6875 10.3544 5.6875 11.5625C5.6875 12.7706 6.66688 13.75 7.875 13.75Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M4.125 18.125C4.125 16.0539 5.80393 14.375 7.875 14.375C9.94607 14.375 11.625 16.0539 11.625 18.125H4.125Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M12.875 10.625H16.625" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M12.875 13.125H17.875" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
						width: '22',
						height: '22'
					}, {
						text: 'Store',
						icon: '<path fill="none" d="M19.125 11.625V19.125C19.125 19.8154 18.5654 20.375 17.875 20.375H4.125C3.43464 20.375 2.875 19.8154 2.875 19.125V11.625" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M18.6233 1.625H3.37667C3.08365 1.62495 2.82982 1.82822 2.76583 2.11417L1.625 7.25C1.625 8.28553 2.46447 9.125 3.5 9.125C4.53553 9.125 5.375 8.28553 5.375 7.25C5.375 8.28553 6.21447 9.125 7.25 9.125C8.28553 9.125 9.125 8.28553 9.125 7.25C9.125 8.28553 9.96447 9.125 11 9.125C12.0355 9.125 12.875 8.28553 12.875 7.25C12.875 8.28553 13.7145 9.125 14.75 9.125C15.7855 9.125 16.625 8.28553 16.625 7.25C16.625 8.28553 17.4645 9.125 18.5 9.125C19.5355 9.125 20.375 8.28553 20.375 7.25L19.2333 2.11417C19.17 1.82817 18.9163 1.62472 18.6233 1.625Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M16.625 14.75C16.625 13.3693 15.5057 12.25 14.125 12.25C12.7443 12.25 11.625 13.3693 11.625 14.75V20.375H16.625V14.75Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M5.375 14.875C5.375 14.4608 5.71079 14.125 6.125 14.125H8.375C8.78921 14.125 9.125 14.4608 9.125 14.875V17.125C9.125 17.5392 8.78921 17.875 8.375 17.875H6.125C5.71079 17.875 5.375 17.5392 5.375 17.125V14.875Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M14.4375 16C14.6101 16 14.75 16.1399 14.75 16.3125C14.75 16.4851 14.6101 16.625 14.4375 16.625C14.2649 16.625 14.125 16.4851 14.125 16.3125C14.125 16.1399 14.2649 16 14.4375 16" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
						width: '22',
						height: '22'
					}, {
						text: 'Skills',
						icon: '<path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M17.25 14.125L20.0092 11.3659C20.4972 10.8777 20.4972 10.0865 20.0092 9.59836L18.25 7.84336C17.7026 9.14235 16.3533 9.91402 14.9561 9.72716C13.5589 9.54031 12.4597 8.44118 12.2729 7.04399C12.086 5.6468 12.8577 4.29747 14.1567 3.75003L12.4017 1.99086C11.9136 1.50288 11.1223 1.50288 10.6342 1.99086L7.87503 4.75003C7.87503 3.02414 6.47592 1.62503 4.75003 1.62503C3.02414 1.62503 1.62503 3.02414 1.62503 4.75003C1.62503 6.47592 3.02414 7.87503 4.75003 7.87503L1.99086 10.6342C1.50288 11.1223 1.50288 11.9136 1.99086 12.4017L3.75003 14.1567C4.29747 12.8577 5.6468 12.086 7.04399 12.2729C8.44118 12.4597 9.54031 13.5589 9.72716 14.9561C9.91402 16.3533 9.14235 17.7026 7.84336 18.25L9.59836 20.0059C10.0865 20.4938 10.8777 20.4938 11.3659 20.0059L14.125 17.25C14.125 18.9759 15.5241 20.375 17.25 20.375C18.9759 20.375 20.375 18.9759 20.375 17.25C20.375 15.5241 18.9759 14.125 17.25 14.125Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
						width: '22',
						height: '22',
						isCurrent: false,
						isCurrentParent: true,
						action: {
							text: 'Get Skills',
							// NOTE: Uncomment to make this the current item
							// class: 'btn-small sidebar-item__action  sidebar-item__action--is-current'
						},
						items: [
							{
								text: 'My Skills',
								isCurrentParent: false,
								class: 'sidebar__sub-list-header'
							}, {
								text: 'Booking',
								isCurrentParent: true,
								items: [
									{
										text: 'Calendar'
									}, {
										text: 'Services',
										isCurrent: true
									}, {
										text: 'Teammates'
									}, {
										text: 'Reports'
									}, {
										text: 'Settings'
									}
								]
							}, {
								text: 'Scheduling'
							}
						]
					}
				]
			}
		}, {
			name: 'Detail View',
			context: {
				isDetail: true,
				showHeader: true,
				showSidebar: true,
				business: 'Chimera Hair Salon',
				address: '7678 N High St, Denver, CO',
				user: {
					name: 'Erica Romaguera',
					phoneNumber: '(605) 230-5253',
					image
				},
				pageTitle: 'Alejandra Pollich',
				parentView: {
					href: '#',
					title: 'Guests'
				},
				items: [
					{
						text: 'Dashboard',
						icon: '<path fill="none" d="M8.5 13.7434V13.5059C8.5 12.1251 9.61929 11.0059 11 11.0059C12.3807 11.0059 13.5 12.1251 13.5 13.5059V13.7434" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M12.8766 5.38086L11.0016 11.0059" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M6.31415 7.25586C6.14156 7.25586 6.00165 7.39577 6.00165 7.56836C6.00165 7.74095 6.14156 7.88086 6.31415 7.88086C6.48674 7.88086 6.62665 7.74095 6.62665 7.56836C6.62665 7.39577 6.48674 7.25586 6.31415 7.25586V7.25586" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M16.9391 10.3809C16.7666 10.3809 16.6266 10.5208 16.6266 10.6934C16.6266 10.8659 16.7666 11.0059 16.9391 11.0059C17.1117 11.0059 17.2516 10.8659 17.2516 10.6934C17.2516 10.5208 17.1117 10.3809 16.9391 10.3809V10.3809" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M15.6892 7.25586C15.5626 7.25519 15.4482 7.3309 15.3993 7.44762C15.3504 7.56433 15.3767 7.69902 15.4659 7.78874C15.5552 7.87846 15.6897 7.9055 15.8067 7.85723C15.9237 7.80896 16 7.69491 16 7.56836C16 7.39577 15.8601 7.25586 15.6875 7.25586V7.25586" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M8.81415 4.75586C8.64156 4.75586 8.50165 4.89577 8.50165 5.06836C8.50165 5.24095 8.64156 5.38086 8.81415 5.38086C8.98674 5.38086 9.12665 5.24095 9.12665 5.06836C9.12665 4.89577 8.98674 4.75586 8.81415 4.75586V4.75586" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M18.8591 16.1184C14.1987 12.635 7.80129 12.635 3.14081 16.1184" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M11 20.3809C16.1777 20.3809 20.375 16.1835 20.375 11.0059C20.375 5.82819 16.1777 1.63086 11 1.63086C5.82233 1.63086 1.625 5.82819 1.625 11.0059C1.625 16.1835 5.82233 20.3809 11 20.3809Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M5.06415 10.3809C4.89156 10.3809 4.75165 10.5208 4.75165 10.6934C4.75165 10.8659 4.89156 11.0059 5.06415 11.0059C5.23674 11.0059 5.37665 10.8659 5.37665 10.6934C5.37665 10.5208 5.23674 10.3809 5.06415 10.3809" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
						width: '22',
						height: '22'
					}, {
						text: 'Guests',
						icon: '<path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M4.75 7.875C5.78553 7.875 6.625 7.03553 6.625 6C6.625 4.96447 5.78553 4.125 4.75 4.125C3.71447 4.125 2.875 4.96447 2.875 6C2.875 7.03553 3.71447 7.875 4.75 7.875Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M4.75 9.125C3.02411 9.125 1.625 10.5241 1.625 12.25V14.125H2.875L3.5 19.125H6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M17.25 7.875C18.2855 7.875 19.125 7.03553 19.125 6C19.125 4.96447 18.2855 4.125 17.25 4.125C16.2145 4.125 15.375 4.96447 15.375 6C15.375 7.03553 16.2145 7.875 17.25 7.875Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M17.25 9.125C18.9759 9.125 20.375 10.5241 20.375 12.25V14.125H19.125L18.5 19.125H16" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M11 6.625C12.3807 6.625 13.5 5.50571 13.5 4.125C13.5 2.74429 12.3807 1.625 11 1.625C9.61929 1.625 8.5 2.74429 8.5 4.125C8.5 5.50571 9.61929 6.625 11 6.625Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M15.375 12.25C15.375 9.83375 13.4162 7.875 11 7.875C8.58375 7.875 6.625 9.83375 6.625 12.25V14.125H8.5L9.125 20.375H12.875L13.5 14.125H15.375V12.25Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
						width: '22',
						height: '22',
						isCurrent: true
					}, {
						text: 'Team',
						icon: '<path fill="none" d="M9.125 4.375H2.875C2.18464 4.375 1.625 4.93464 1.625 5.625V16.875C1.625 17.5654 2.18464 18.125 2.875 18.125H19.125C19.8154 18.125 20.375 17.5654 20.375 16.875V5.625C20.375 4.93464 19.8154 4.375 19.125 4.375H12.875" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M12.875 3.75C12.875 2.71447 12.0355 1.875 11 1.875C9.96447 1.875 9.125 2.71447 9.125 3.75V6.25C9.125 6.41576 9.19085 6.57473 9.30806 6.69194C9.42527 6.80915 9.58424 6.875 9.75 6.875H12.25C12.5952 6.875 12.875 6.59518 12.875 6.25V3.75Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M7.875 13.75C9.08312 13.75 10.0625 12.7706 10.0625 11.5625C10.0625 10.3544 9.08312 9.375 7.875 9.375C6.66688 9.375 5.6875 10.3544 5.6875 11.5625C5.6875 12.7706 6.66688 13.75 7.875 13.75Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M4.125 18.125C4.125 16.0539 5.80393 14.375 7.875 14.375C9.94607 14.375 11.625 16.0539 11.625 18.125H4.125Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M12.875 10.625H16.625" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M12.875 13.125H17.875" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
						width: '22',
						height: '22'
					}, {
						text: 'Store',
						icon: '<path fill="none" d="M19.125 11.625V19.125C19.125 19.8154 18.5654 20.375 17.875 20.375H4.125C3.43464 20.375 2.875 19.8154 2.875 19.125V11.625" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M18.6233 1.625H3.37667C3.08365 1.62495 2.82982 1.82822 2.76583 2.11417L1.625 7.25C1.625 8.28553 2.46447 9.125 3.5 9.125C4.53553 9.125 5.375 8.28553 5.375 7.25C5.375 8.28553 6.21447 9.125 7.25 9.125C8.28553 9.125 9.125 8.28553 9.125 7.25C9.125 8.28553 9.96447 9.125 11 9.125C12.0355 9.125 12.875 8.28553 12.875 7.25C12.875 8.28553 13.7145 9.125 14.75 9.125C15.7855 9.125 16.625 8.28553 16.625 7.25C16.625 8.28553 17.4645 9.125 18.5 9.125C19.5355 9.125 20.375 8.28553 20.375 7.25L19.2333 2.11417C19.17 1.82817 18.9163 1.62472 18.6233 1.625Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M16.625 14.75C16.625 13.3693 15.5057 12.25 14.125 12.25C12.7443 12.25 11.625 13.3693 11.625 14.75V20.375H16.625V14.75Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M5.375 14.875C5.375 14.4608 5.71079 14.125 6.125 14.125H8.375C8.78921 14.125 9.125 14.4608 9.125 14.875V17.125C9.125 17.5392 8.78921 17.875 8.375 17.875H6.125C5.71079 17.875 5.375 17.5392 5.375 17.125V14.875Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="none" d="M14.4375 16C14.6101 16 14.75 16.1399 14.75 16.3125C14.75 16.4851 14.6101 16.625 14.4375 16.625C14.2649 16.625 14.125 16.4851 14.125 16.3125C14.125 16.1399 14.2649 16 14.4375 16" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
						width: '22',
						height: '22'
					}, {
						text: 'Skills',
						icon: '<path fill="none" fill-rule="evenodd" clip-rule="evenodd" d="M17.25 14.125L20.0092 11.3659C20.4972 10.8777 20.4972 10.0865 20.0092 9.59836L18.25 7.84336C17.7026 9.14235 16.3533 9.91402 14.9561 9.72716C13.5589 9.54031 12.4597 8.44118 12.2729 7.04399C12.086 5.6468 12.8577 4.29747 14.1567 3.75003L12.4017 1.99086C11.9136 1.50288 11.1223 1.50288 10.6342 1.99086L7.87503 4.75003C7.87503 3.02414 6.47592 1.62503 4.75003 1.62503C3.02414 1.62503 1.62503 3.02414 1.62503 4.75003C1.62503 6.47592 3.02414 7.87503 4.75003 7.87503L1.99086 10.6342C1.50288 11.1223 1.50288 11.9136 1.99086 12.4017L3.75003 14.1567C4.29747 12.8577 5.6468 12.086 7.04399 12.2729C8.44118 12.4597 9.54031 13.5589 9.72716 14.9561C9.91402 16.3533 9.14235 17.7026 7.84336 18.25L9.59836 20.0059C10.0865 20.4938 10.8777 20.4938 11.3659 20.0059L14.125 17.25C14.125 18.9759 15.5241 20.375 17.25 20.375C18.9759 20.375 20.375 18.9759 20.375 17.25C20.375 15.5241 18.9759 14.125 17.25 14.125Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>',
						width: '22',
						height: '22'
					}
				]
			}

		}
	]
}