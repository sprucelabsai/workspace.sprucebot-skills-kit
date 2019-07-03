export const checkDeprecatedProps = ({
	componentName,
	props,
	deprecatedProps
}: {
	componentName: string,
	props: Object,
	deprecatedProps: Array<string>
}) => {
	const propKeys = Object.keys(props)
	propKeys.forEach(key => {
		if (deprecatedProps.includes(key)) {
			console.warn(`${componentName}: ${key} is deprecated.`)
		}
	})
}
