const sidebarCollapse = document.getElementsByClassName('sidebar-collapse')

sidebarCollapse[0].addEventListener('click', function() {
	const sidebar = this.parentNode
	sidebar.classList.toggle('sidebar--is-collapsed')
	document.body.classList.toggle('sidebar--is-collapsed')
})
