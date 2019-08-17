const inputs = document.getElementsByTagName('input')

for (let i = 0; i < inputs.length; i++) {
	const input = inputs[i]
	input.addEventListener(
		'focus',
		() => {
			console.log(input.parentNode)
			const autosuggestWrapper = input.parentNode.parentNode
			const autosuggest = autosuggestWrapper.querySelector('.autosuggest')
			autosuggest.classList.add('autosuggest--show-suggestions')
		},
		false
	)
	input.addEventListener(
		'blur',
		() => {
			console.log(input.parentNode)
			const autosuggestWrapper = input.parentNode.parentNode
			const autosuggest = autosuggestWrapper.querySelector('.autosuggest')
			autosuggest.classList.remove('autosuggest--show-suggestions')
		},
		false
	)
}
