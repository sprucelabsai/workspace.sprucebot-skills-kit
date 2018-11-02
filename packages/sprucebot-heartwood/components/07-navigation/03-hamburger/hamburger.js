const hamburger = document.getElementsByClassName('hamburger')
hamburger[0].addEventListener('click', function() {
	console.log('Burger click')
	document.body.classList.toggle('menu--is-visible')
	this.classList.toggle('hamburger--is-open')
}, false)