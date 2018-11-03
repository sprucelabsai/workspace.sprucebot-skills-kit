const buttons = document.getElementsByTagName('button');

const handleClick = (button) => {
	const parent = button.parentNode;
	parent.classList.toggle('accordion__item--expanded');
}

for (let i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener('click', () => handleClick(buttons[i]), false);
}