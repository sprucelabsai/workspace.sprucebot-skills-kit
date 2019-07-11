// @flow

export type CardIcon = {
	icon: ?string,
	isLineIcon?: ?boolean,
	className?: ?string
}

export type CardButton = {
	key: ?string,
	className?: ?string,
	kind?: ?string,
	isSmall?: ?boolean,
	isFullWidth?: ?boolean,
	isLoading?: ?boolean,
	isIconOnly?: ?boolean,
	text: ?string,
	href?: ?string,
	icon?: ?CardIcon,
	target?: ?string,
	payload?: ?Object,
	props?: ?Object
}

export type CardImage = {
	src: ?string,
	width: ?number,
	height: ?number,
	props?: ?Object
}

export type CardContextMenu = {
	actions: ?Array<CardButton>,
	isLeftAligned?: ?boolean,
	isBottomAligned?: ?boolean,
	size?: ?string,
	text?: ?string,
	icon?: ?CardIcon,
	isSimple?: ?boolean,
	isSmall?: ?boolean,
	closeOnSelectAction?: ?boolean,
	isTextOnly?: ?boolean,
	className?: ?string
}

export type CardHeader = {
	title?: ?string,
	labelText?: string,
	labelIcon?: CardIcon,
	actions?: Array<CardButton>,
	contextMenu?: CardContextMenu
}

export type CardFooter = {
	actions: ?Array<CardButton>
}

export type CardBodyListItem = {
	key: ?string,
	title: ?string,
	subtitle?: ?string,
	image?: ?CardImage | CardIcon,
	actions?: ?Array<CardButton>,
	contextMenu?: ?CardContextMenu,
	props?: ?Object
}

export type CardBodyHeading = {
	key?: string,
	title?: string,
	subtitle: string,
	props?: ?Object
}

export type CardBodyList = {
	key: ?string,
	items: ?Array<CardBodyListItem>,
	heading?: ?CardBodyHeading,
	props?: ?Object
}

export type CardBodyScore = {
	key: ?string,
	label: ?string,
	value: ?string,
	props?: ?Object
}

export type CardBodyText = {
	key: ?string,
	text: ?string,
	props?: ?Object
}

export type CardBodyScores = {
	key: ?string,
	scores: ?Array<CardBodyScore>,
	props?: ?Object
}

export type CardBodyImage = {
	key: ?string,
	src: ?string,
	style: ?string,
	type: ?string,
	props?: ?Object
}

export type CardBodyButton = {
	key: ?string,
	actions: ?Array<CardButton>,
	props?: ?Object
}

export type CardBody = {
	isSectioned?: ?boolean,
	// prettier-ignore
	children: ?Array<CardBodyText
		| CardBodyList
		| CardBodyScores
		| CardBodyImage
		| CardBodyButton
		| CardBodyHeading>
}

export type CardOnboardingStep = {
	id: ?string,
	tabTitle: ?string,
	panelTitle: ?string,
	panelCopy: ?string,
	panelCTA: ?Button,
	panelIcon: ?CardIcon
}

export type CardOnboarding = {
	title: ?string,
	steps: ?Array<CardOnboardingStep>,
	className?: ?string
}

export type CardBuilder = {
	header?: ?CardHeader,
	headerImage?: ?CardImage,
	onboarding?: ?CardOnboarding,
	body?: ?CardBody,
	footer?: ?CardFooter
}

export type CardResponse = {
	id: ?string,
	comment?: ?string,
	title: ?string,
	skillSlug: ?string,
	page: ?string,
	roles: ?Array<string>,
	description: ?string,
	order: ?string,
	isTemporary?: ?boolean,
	isCentered?: ?boolean,
	canDismiss?: ?boolean,
	cardBuilder: ?CardBuilder
}
