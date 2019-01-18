const rules = [
	{ method: 'query', option: 'query', suffix: 'QueryString' },
	{ method: 'mutate', option: 'mutation', suffix: 'MutationString' }
]

module.exports = {
	rules: {
		'utils-graphql': {
			create: function(context) {
				return {
					CallExpression(node) {
						rules.forEach(rule => {
							if (node.callee.name === rule.method) {
								// Get value of the primary option, validate.
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

								// Deprecate `token`.
								const TokenQueryOption = node.arguments[0].properties.find(
									o => o.key.name === 'token'
								)

								if (TokenQueryOption) {
									context.report(
										node,
										`\`token\` is deprecated on this API; \`token\` should be provided with \`.setToken()\` once per client.`
									)
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
							context.report(
								node,
								'No nested interpolation in GraphQL documents.'
							)
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
	}
}
