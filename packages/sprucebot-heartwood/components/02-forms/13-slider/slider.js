const slider = document.getElementsByClassName('slider');

for (let i = 0; i < slider.length; i++) {
	slider[i].parentNode.classList.add('slider--split-color')
	slider[i].addEventListener('input', e => {
		console.log('slide', e)
		slider[i].style.setProperty('--val', slider[i].value)
	})
}