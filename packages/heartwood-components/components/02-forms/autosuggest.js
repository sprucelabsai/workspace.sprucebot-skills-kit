const inputs = document.getElementsByTagName('input')

for (let i = 0; i < inputs.length; i++) {
	const input = inputs[i]
	input.addEventListener(
		'focus',
		() => {
			console.log(input.parentNode)
			const autosuggestWrapper = input.parentNode.parentNode
			const autosuggest = autosuggestWrapper.querySelector('.hw-autosuggest')
			autosuggest.classList.add('hw-autosuggest--show-suggestions')
		},
		false
	)
	input.addEventListener(
		'blur',
		() => {
			console.log(input.parentNode)
			const autosuggestWrapper = input.parentNode.parentNode
			const autosuggest = autosuggestWrapper.querySelector('.hw-autosuggest')
			autosuggest.classList.remove('hw-autosuggest--show-suggestions')
		},
		false
	)
}
