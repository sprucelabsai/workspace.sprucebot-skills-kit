const userMenu = document.getElementsByClassName('user-menu')

userMenu[0].addEventListener('click', function() {
	userMenu[0].classList.toggle('user-menu--menu-is-visible')
})
