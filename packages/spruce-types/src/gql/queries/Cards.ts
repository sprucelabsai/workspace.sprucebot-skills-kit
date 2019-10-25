import gql from 'graphql-tag'

export default gql`
	query cards(
		$page: String!
		$pageUserId: ID
		$skillId: ID
		$locationId: ID
		$organizationId: ID!
		$useMockData: Boolean
	) {
		Cards(
			page: $page
			pageUserId: $pageUserId
			skillId: $skillId
			locationId: $locationId
			organizationId: $organizationId
			useMockData: $useMockData
		) {
			id
			title
			page
			description
			isTemporary
			canDismiss
			cardBuilder {
				...Cardbuilder
			}
		}
	}

	fragment List on List {
		header {
			headerTitle: title
			subtitle
			isSmall
			headerActions: actions {
				...Button
			}
		}
		areSeparatorsVisible
		isSmall
		items {
			... on ListItem {
				...ListItem
			}
			... on ExpandableListItem {
				...ExpandableListItem
			}
		}
	}

	fragment Button on Button {
		id
		buttonKind: kind
		isSmall
		isFullWidth
		isLoading
		isIconOnly
		isDisabled
		buttonText: text
		href
		icon {
			...Icon
		}
		type
		action {
			...Action
		}
	}

	fragment Icon on Icon {
		name
		isLineIcon
	}

	fragment Toggle on Toggle {
		id
		postText
	}

	fragment ContextMenu on ContextMenu {
		actions {
			...Button
		}
		size
		text
		icon {
			...Icon
		}
		isSmall
		isSimple
		closeOnSelectAction
		isTextOnly
	}

	fragment WarningConfig on ListItemWarningConfig {
		title
		subtitle
		note
	}

	fragment ListItem on ListItem {
		title
		subtitle
		note
		isExpandable
		avatar
		image
		icon {
			...Icon
		}
		isIconHidden
		isLeftIndented
		isDraggable
		isDisabled
		toggleId
		toggleProps {
			...Toggle
		}
		primaryAction {
			...Button
		}
		actions {
			...Button
		}
		contextMenu {
			...ContextMenu
		}
		isSeparatorVisible
		className
		selectableProps {
			... on Checkbox {
				...Checkbox
			}
			... on Radio {
				...Radio
			}
		}
		selectableType
		warnings {
			...WarningConfig
		}
		#   list {
		#     ...List
		#   }
		#   lists {
		#     ...List
		#   }
	}

	fragment ExpandableListItem on ExpandableListItem {
		item {
			...ListItem
		}
		#   list {
		#     ...List
		#   }
		#   lists {
		#     ...List
		#   }
		collapsedIconName
		expandedIconName
	}

	fragment Image on Image {
		src
		id
		alt
	}

	fragment Cardbuilder on CardBuilder {
		id
		header {
			title
			labelText
			labelIcon {
				...Icon
			}
			actions {
				...Button
			}
			contextMenu {
				...ContextMenu
			}
		}
		headerImage {
			...Image
		}
		onboarding {
			title
			steps {
				id
				tabTitle
				tabIcon {
					...Icon
				}
				panelTitle
				panelCopy
				isComplete
				panelCTA {
					kind
					isSmall
					isFullWidth
					isLoading
					isIconOnly
					text
					href
					icon {
						name
						isLineIcon
					}
					type
					action {
						...Action
					}
				}
			}
		}

		body {
			isFullBleed
			areSectionSeparatorsVisible
			isSectioned
			items {
				type
				viewModel {
					... on Button {
						...Button
					}
					... on Image {
						...Image
					}
					... on Text {
						textText: text
					}
					... on List {
						...List
					}
					... on ScoreCard {
						scores {
							id
							label
							value
						}
					}
					... on Toast {
						...Toast
					}
				}
			}
		}

		footer {
			buttonGroup {
				actions {
					...Button
				}
			}
		}
	}

	fragment Radio on Radio {
		id
		name
		label
		postText
		isDisabled
		action {
			...Action
		}
	}

	fragment Checkbox on Checkbox {
		id
		name
		label
		action {
			...Action
		}
		isChecked
		isIndeterminate
		postText
	}

	fragment Toast on Toast {
		id
		headline
		text
		canRemove
		kind
		followupText
	}

	fragment Action on Action {
		__typename

		... on ActionSkillViewRedirect {
			type
			payload {
				slug
				route
				routeParams
			}
		}

		... on ActionQuickEditUser {
			type
			payload {
				quickEditUserId: userId
				locationId
				organizationId
			}
		}

		... on ActionDismissComponent {
			type
			payload {
				componentIds
			}
		}

		... on ActionCalendarJumpTo {
			type
			payload {
				dateTime
				calendarId
				userId
			}
		}

		... on ActionCoreRedirect {
			type
			payload {
				route
				routeParams
			}
		}

		... on ActionBigSearch {
			type
			payload {
				roles
			}
		}

		... on ActionEmitEvent {
			type
			payload {
				eventName
				payload
			}
		}

		... on ActionShowModal {
			type
			payload {
				slug
				route
				routeParams
				modalTitle: title
				footerPrimaryActionText
				footerSecondaryActionText
				isDialogFooterPrimaryActionDisabled
				isDialogFooterSecondaryActionDisabled
				size
				isFullHeight
			}
		}

		... on ActionConfirm {
			type
			payload {
				title
				text
				context
				doesRequireConfirmation
				confirmInputLabel
				confirmInputValidString
				confirmInputIgnoreCase
				cancelButtonText
				confirmButtonText
				isDestructive
			}
		}
	}
`
