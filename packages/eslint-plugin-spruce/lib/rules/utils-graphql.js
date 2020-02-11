const rules = [
	{
		method: 'query',
		option: 'query',
		suffix: 'QueryString',
		allowedParents: ['gqlClient']
	},
	{
		method: 'mutate',
		option: 'mutation',
		suffix: 'MutationString',
		allowedParents: ['gqlClient']
	}
]

module.exports = {
	create: function(context) {
		return {
			CallExpression(node) {
				rules.forEach(rule => {
					if (
						node.callee.name === rule.method ||
						(node.callee.property &&
							node.callee.property.name === rule.method &&
							node.callee.object &&
							rule.allowedParents.indexOf(node.callee.object.name) >= 0)
					) {
						if (node.arguments[0].type !== 'ObjectExpression') {
							return context.report(
								node,
								`The first argument to \`${
									rule.method
								}\` must be an object of options.`
							)
						}

						const QueryOption = node.arguments[0].properties.find(
							o => o.key.name === rule.option
						)

						const QueryOptionType = QueryOption.value.type

						if (QueryOptionType === 'TemplateLiteral') {
							context.report(
								node,
								'Tag template literal with `gql` from `graphql-tag`.'
							)
						} else if (QueryOptionType !== 'TaggedTemplateExpression') {
							if (QueryOptionType === 'Identifier') {
								if (
									!QueryOption.value.name.match(
										new RegExp(`.*${rule.suffix}$`, 'gi')
									)
								) {
									context.report(
										node,
										`Indentifiers passed to the ${
											rule.option
										} option should end with \`${
											rule.suffix
										}\` (i.e. \`location${rule.suffix}\`)`
									)
								}
							} else {
								context.report(
									node,
									`Value of option \`${
										rule.option
									}\` should be a template literal tagged with \`gql\` from \`graphql-tag\`.`
								)
							}
						}
					}
				})
			},
			TemplateLiteral(node) {
				// `value` will return up until the `${` (if one exists).
				// Bad: { ${
				// Good: { {} } ${
				// Good: { {} }
				const source = context.getSourceCode()
				const tokens = source.getTokens(node)
				const previousTokens = source.getTokensBefore(node, { count: 1 })

				const openBrackets = tokens[0].value.match(/{/gi)
				const closeBrackets = tokens[0].value.match(/}/gi)

				if (
					previousTokens[0].value === 'gql' &&
					(openBrackets && openBrackets.length - 1) >
						(closeBrackets && closeBrackets.length)
				) {
					context.report(node, 'No nested interpolation in GraphQL documents.')
				}
			},
			Identifier(node) {
				rules.forEach(rule => {
					if (node.name.match(new RegExp(`.*${rule.suffix}$`, 'gi'))) {
						const source = context.getSourceCode()
						const tokens = source.getTokensAfter(node, { count: 3 })

						if (tokens[0].value === '=' && tokens[1].type === 'Template') {
							context.report(
								node,
								'Tag template literal with `gql` from `graphql-tag`.'
							)
						}
					}
				})
			}
		}
	}
}
