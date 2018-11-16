var btn = document.querySelectorAll('button,a')
for (var i = 0; i < btn.length; i++) {
	btn[i].addEventListener(
		'click',
		function() {
			if (this.parentNode.classList.contains('hw-context-menu')) {
				this.parentNode.classList.toggle('hw-context-menu--is-hidden')
				this.parentNode.classList.toggle('hw-context-menu--is-visible')
			}
		},
		false
	)
}
