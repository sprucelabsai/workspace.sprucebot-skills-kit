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
												new RegExp(`.*${rule.suffix}`, 'gi')
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
					Identifier(node) {
						rules.forEach(rule => {
							if (node.name.match(new RegExp(`.*${rule.suffix}`, 'gi'))) {
								const source = context.getSourceCode()
								const tokens = source.getTokensAfter(node, { count: 3 })

								if (
									tokens[0].value === '=' &&
									tokens[1].value === 'gql' &&
									tokens[2].type === 'Template'
								) {
									// `value` will return up until the `${` (if one exists).
									// Bad: { ${
									// Good: { {} } ${
									// Good: { {} }
									const openBrackets = tokens[2].value.match(/{/gi)
									const closeBrackets = tokens[2].value.match(/}/gi)

									if (
										(openBrackets && openBrackets.length - 1) >
										(closeBrackets && closeBrackets.length)
									) {
										context.report(
											node,
											'No nested interpolation in GraphQL documents.'
										)
									}
								}

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
