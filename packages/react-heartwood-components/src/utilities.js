// @flow

export const checkDeprecatedProps = ({
	componentName,
	props,
	deprecatedProps
}: {
	componentName: string,
	props: Object,
	deprecatedProps: Object
}) => {
	const propKeys = Object.keys(props)
	propKeys.forEach(key => {
		const deprecatedProp = deprecatedProps[key]
		if (deprecatedProp) {
			console.warn(
				`${componentName}: ${key} is deprecated.${
					deprecatedProp.details ? ` ${deprecatedProp.details}` : ''
				}`
			)
		}
	})
}
