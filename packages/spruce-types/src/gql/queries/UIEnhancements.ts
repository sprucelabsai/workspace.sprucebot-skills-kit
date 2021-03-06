import gql from 'graphql-tag'

export default gql`
	query UIEnhancements(
		$view: String!
		$sections: [String!]!
		$payload: JSON
		$organizationId: ID
		$locationId: ID
	) {
		getUIEnhancements(
			locationId: $locationId
			organizationId: $organizationId
			payload: $payload
			sections: $sections
			view: $view
		) {
			sections {
				id
				calendarEventDetailsItems {
					type
					viewModel {
						... on List {
							...List
						}
						... on Button {
							...Button
						}
						... on CardBuilder {
							...Cardbuilder
						}
						... on Toast {
							...Toast
						}
						... on Text {
							textId: id
							text
						}
						... on Markdown {
							source
						}
						... on SplitButton {
							defaultAction {
								...Button
							}
							actions {
								...Button
							}
							kind
							isFullWidth
							isSmall
							usePortal
						}
					}
				}
				contextMenuItems {
					kind
					text
					action {
						...Action
					}
				}
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
		selectableType
		selectableProps {
			... on Checkbox {
				...Checkbox
			}
			... on Radio {
				...Radio
			}
		}
		warnings {
			...WarningConfig
		}
	}

	fragment ExpandableListItem on ExpandableListItem {
		item {
			...ListItem
		}
		collapsedIconName
		expandedIconName
	}

	fragment Image on Image {
		src
		id
		alt
	}

	fragment Cardbuilder on CardBuilder {
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
					...Button
				}
			}
		}

		body {
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
			helper
		}
	}

	fragment Radio on Radio {
		id
		name
		label
		postText
		isDisabled
		isChecked
		action {
			...Action
		}
	}

	fragment Checkbox on Checkbox {
		id
		name
		isIndeterminate
		postText
		label
		isChecked
		action {
			...Action
		}
	}

	fragment Toast on Toast {
		id
		headline
		text
		canRemove
		toastKind: kind
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
