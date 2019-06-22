let btn = document.querySelectorAll('button,a')
for (let i = 0; i < btn.length; i++) {
	btn[i].addEventListener(
		'click',
		function() {
			this.blur()
		},
		false
	)
}
