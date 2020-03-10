////////////////////////////////////////////////////////////
// DO NOT EDIT! THIS FILE IS GENERATED BY "yarn build:types"
/* eslint-disable */
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  JSON: any,
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any,
  /** 
 * A date string, such as 2007-12-03, compliant with the `full-date` format
   * outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for
   * representation of dates and times using the Gregorian calendar.
 **/
  Date: any,
  /** 
 * A time string at UTC, such as 10:15:30Z, compliant with the `full-time` format
   * outlined in section 5.6 of the RFC 3339profile of the ISO 8601 standard for
   * representation of dates and times using the Gregorian calendar.
 **/
  Time: any,
  /** 
 * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the
   * `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO
   * 8601 standard for representation of dates and times using the Gregorian calendar.
 **/
  DateTime: any,
};

export type IHWAction = IHWActionCoreRedirect | IHWActionSkillViewRedirect | IHWActionConfirm | IHWActionShowModal | IHWActionEmitEvent | IHWActionBigSearch | IHWActionQuickEditUser | IHWActionDismissComponent | IHWActionCalendarJumpTo;

/** Pop up big search */
export type IHWActionBigSearch = {
  __typename?: 'ActionBigSearch',
  type?: Maybe<IHWActionTypes>,
  payload: IHWActionBigSearchPayload,
  onComplete?: Maybe<IHWAction>,
  onCancel?: Maybe<IHWAction>,
};

/** Bring up big search with the specific roles (teammate, guest, manager, groupManager, owner) */
export type IHWActionBigSearchPayload = {
  __typename?: 'ActionBigSearchPayload',
  roles?: Maybe<Array<Scalars['String']>>,
  /** If this action is set as the onComplete of another action, this will hold the response from the previous action */
  actionResponse?: Maybe<Scalars['JSON']>,
};

/** Jump to a place on the calendar */
export type IHWActionCalendarJumpTo = {
  __typename?: 'ActionCalendarJumpTo',
  type?: Maybe<IHWActionTypes>,
  payload: IHWActionCalendarJumpToPayload,
  onComplete?: Maybe<IHWAction>,
  onCancel?: Maybe<IHWAction>,
};

/** control the calendar if you are on a page with a calendar */
export type IHWActionCalendarJumpToPayload = {
  __typename?: 'ActionCalendarJumpToPayload',
  /** Which day and time to focus */
  dateTime: Scalars['Date'],
  /** Make sure the right calendar is selected */
  calendarId: Scalars['String'],
  /** Show the selected user */
  userId?: Maybe<Scalars['String']>,
  /** If this action is set as the onComplete of another action, this will hold the response from the previous action */
  actionResponse?: Maybe<Scalars['JSON']>,
};

/** Pop up a confirmation */
export type IHWActionConfirm = {
  __typename?: 'ActionConfirm',
  type?: Maybe<IHWActionTypes>,
  payload: IHWConfirmModal,
  onComplete?: Maybe<IHWAction>,
  onCancel?: Maybe<IHWAction>,
};

/** Redirect a user in the main viewport (browser or native mobile) */
export type IHWActionCoreRedirect = {
  __typename?: 'ActionCoreRedirect',
  type?: Maybe<IHWActionTypes>,
  payload: IHWActionCoreRedirectPayload,
  onComplete?: Maybe<IHWAction>,
  onCancel?: Maybe<IHWAction>,
};

/** payload used for core redirect */
export type IHWActionCoreRedirectPayload = {
  __typename?: 'ActionCoreRedirectPayload',
  /** the destination route */
  route: Scalars['String'],
  /** Params for the route, like organizationId or locationId */
  routeParams?: Maybe<Scalars['JSON']>,
  /** If this action is set as the onComplete of another action, this will hold the response from the previous action */
  actionResponse?: Maybe<Scalars['JSON']>,
};

/** Dismiss/hide components on the page whose ID's match. */
export type IHWActionDismissComponent = {
  __typename?: 'ActionDismissComponent',
  type?: Maybe<IHWActionTypes>,
  payload: IHWActionDismissComponentPayload,
  onComplete?: Maybe<IHWAction>,
  onCancel?: Maybe<IHWAction>,
};

/** Dismiss a component by it's ID */
export type IHWActionDismissComponentPayload = {
  __typename?: 'ActionDismissComponentPayload',
  /** Ids of the components you want to hide */
  componentIds: Array<Scalars['String']>,
  /** If this action is set as the onComplete of another action, this will hold the response from the previous action */
  actionResponse?: Maybe<Scalars['JSON']>,
};

/** Emit an event to your skill */
export type IHWActionEmitEvent = {
  __typename?: 'ActionEmitEvent',
  type?: Maybe<IHWActionTypes>,
  payload: IHWActionEmitEventPayload,
  onComplete?: Maybe<IHWAction>,
  onCancel?: Maybe<IHWAction>,
};

/** Emit an event to your skill when this action is invoked */
export type IHWActionEmitEventPayload = {
  __typename?: 'ActionEmitEventPayload',
  /** Name of the event, like 'booking:update-appointment' */
  eventName?: Maybe<Scalars['String']>,
  /** optional location id */
  locationId?: Maybe<Scalars['String']>,
  /** optional organizationId */
  organizationId?: Maybe<Scalars['String']>,
  /** Arbitrary payload sent with the event */
  payload?: Maybe<Scalars['JSON']>,
  /** If this action is set as the onComplete of another action, this will hold the response from the previous action */
  actionResponse?: Maybe<Scalars['JSON']>,
};

export type IHWActionExecutor = {
  action?: Maybe<IHWAction>,
  id: Scalars['ID'],
};

/** Pop up dialog to edit the user */
export type IHWActionQuickEditUser = {
  __typename?: 'ActionQuickEditUser',
  type?: Maybe<IHWActionTypes>,
  payload: IHWActionQuickEditUserPayload,
  onComplete?: Maybe<IHWAction>,
  onCancel?: Maybe<IHWAction>,
};

/** 
 * Pop up quick edit to update a user record. You have to have permission and
 * should pass location and organization unelss you are editing yourself
 **/
export type IHWActionQuickEditUserPayload = {
  __typename?: 'ActionQuickEditUserPayload',
  /** The id of the user */
  userId: Scalars['String'],
  /** optional location id */
  locationId?: Maybe<Scalars['String']>,
  /** optional organizationId */
  organizationId?: Maybe<Scalars['String']>,
  /** If this action is set as the onComplete of another action, this will hold the response from the previous action */
  actionResponse?: Maybe<Scalars['JSON']>,
};

/** Load a skill view in a modal dialog */
export type IHWActionShowModal = {
  __typename?: 'ActionShowModal',
  type?: Maybe<IHWActionTypes>,
  payload: IHWActionShowModalPayload,
  onComplete?: Maybe<IHWAction>,
  onCancel?: Maybe<IHWAction>,
};

/** Props passed to a modal you want to pop up when invoking this action */
export type IHWActionShowModalPayload = {
  __typename?: 'ActionShowModalPayload',
  /** the skill that owns the skill view loading in the skill view */
  slug: Scalars['String'],
  /** the destination route */
  route: Scalars['String'],
  /** Params for the route, like organizationId or locationId */
  routeParams?: Maybe<Scalars['JSON']>,
  /** Title of the dialog */
  title: Scalars['String'],
  /** Drop a primary action button into the footer */
  footerPrimaryActionText?: Maybe<Scalars['String']>,
  /** Drop in a secondary action into the footer, only works if primary action is also set */
  footerSecondaryActionText?: Maybe<Scalars['String']>,
  /** Does the primary action button start off disabled? */
  isDialogFooterPrimaryActionDisabled?: Maybe<Scalars['Boolean']>,
  /** Does the secondary action button start off disabled? */
  isDialogFooterSecondaryActionDisabled?: Maybe<Scalars['Boolean']>,
  /** How does the dialog size itself width wise? */
  size?: Maybe<IHWModalSize>,
  /** Does the dialog fill the screen vertically? */
  isFullHeight?: Maybe<Scalars['Boolean']>,
  /** If this action is set as the onComplete of another action, this will hold the response from the previous action */
  actionResponse?: Maybe<Scalars['JSON']>,
};

/** Redirect inside of a skill view */
export type IHWActionSkillViewRedirect = {
  __typename?: 'ActionSkillViewRedirect',
  type?: Maybe<IHWActionTypes>,
  payload: IHWActionSkillViewRedirectPayload,
  onComplete?: Maybe<IHWAction>,
  onCancel?: Maybe<IHWAction>,
};

/** payload used when redirecting a skill view */
export type IHWActionSkillViewRedirectPayload = {
  __typename?: 'ActionSkillViewRedirectPayload',
  /** the skill slug to redirect to */
  slug: Scalars['String'],
  /** the destination route */
  route: Scalars['String'],
  /** Params for the route, like organizationId or locationId */
  routeParams?: Maybe<Scalars['JSON']>,
  /** If this action is set as the onComplete of another action, this will hold the response from the previous action */
  actionResponse?: Maybe<Scalars['JSON']>,
};

export enum IHWActionTypes {
  CoreRedirect = 'CoreRedirect',
  SkillViewRedirect = 'SkillViewRedirect',
  Confirm = 'Confirm',
  ShowModal = 'ShowModal',
  EmitEvent = 'EmitEvent',
  BigSearch = 'BigSearch',
  QuickEditUser = 'QuickEditUser',
  DismissComponent = 'DismissComponent',
  CalendarJumpTo = 'CalendarJumpTo'
}

export type IHWButton = IHWActionExecutor & {
  __typename?: 'Button',
  /** Unique ID for rendering in lists */
  id: Scalars['ID'],
  /** Sets the visual appearance of the button. May be primary, secondary, simple, or caution. */
  kind?: Maybe<IHWButtonKinds>,
  /** Set true to make the button less tall. */
  isSmall?: Maybe<Scalars['Boolean']>,
  /** Set true to make the button fill its parent's width. */
  isFullWidth?: Maybe<Scalars['Boolean']>,
  /** Set true to hide any text or icon in the button and show a loader instead. */
  isLoading?: Maybe<Scalars['Boolean']>,
  /** Set true to hide any text in the button. Text should still be provided for accessibility. */
  isIconOnly?: Maybe<Scalars['Boolean']>,
  /** Text for the button. */
  text?: Maybe<Scalars['String']>,
  /** Will render a link. May be relative or absolute. */
  href?: Maybe<Scalars['String']>,
  /** Icon for the button. */
  icon?: Maybe<IHWIcon>,
  /** Type attribute for HTML button element. Defaults to 'button'. */
  type?: Maybe<IHWButtonTypes>,
  /** Otherwise unspecified attributes that will be applied to the underlying button element */
  htmlAttributes?: Maybe<Scalars['JSON']>,
  /** Set true to disable the button */
  isDisabled?: Maybe<Scalars['Boolean']>,
  /** Optional action to invoke when tapped */
  action?: Maybe<IHWAction>,
};

export type IHWButtonGroup = {
  __typename?: 'ButtonGroup',
  /** Array of actions to render the group's buttons. */
  actions?: Maybe<Array<IHWButton>>,
  /** Visual appearance of the group. */
  kind?: Maybe<IHWButtonGroupKind>,
  /** Set true to fill parent width */
  isFullWidth?: Maybe<Scalars['Boolean']>,
  /** Optional: Index of the button that is currently highlighted, e.g. by arrow keys */
  highlightedIndex?: Maybe<Scalars['Int']>,
};

export enum IHWButtonGroupKind {
  Default = 'default',
  Segmented = 'segmented',
  Floating = 'floating'
}

/** How an action is rendered is impacted by the kind of action it is */
export enum IHWButtonKinds {
  Primary = 'primary',
  Secondary = 'secondary',
  Simple = 'simple',
  Caution = 'caution'
}

/** Type of button */
export enum IHWButtonTypes {
  Button = 'button',
  Submit = 'submit',
  Reset = 'reset'
}

/** An event that is rendered on the calendar. */
export type IHWCalendarEvent = {
  __typename?: 'CalendarEvent',
  /** Id of the calendar event */
  id: Scalars['ID'],
  /** When the event starts ISO */
  startAt: Scalars['DateTime'],
  /** 
 * A way to arbitarily bundle appointments. Events with the same collection are
   * all highlighted at the same time in the calendar
 **/
  collection?: Maybe<Scalars['String']>,
  /** Can this event be resized on the calendar? */
  isResizable?: Maybe<Scalars['Boolean']>,
  /** The kind on an event impacts its color */
  kind?: Maybe<IHWCalendarEventKind>,
  /** A calendar is comprised of blocks of time. You need at least 1 block to have a valid event. */
  blocks: Array<IHWCalendarEventBlock>,
  /** Additioal details shown after someone taps on an event */
  details?: Maybe<IHWCalendarEventDetails>,
  /** The ID of the user this event will render under */
  userId: Scalars['ID'],
  /** If this is a draft event (meaning it's not booked, but being setup) */
  isDraft?: Maybe<Scalars['Boolean']>,
  /** Should I render a border for this event? */
  hasBorder?: Maybe<Scalars['Boolean']>,
};

/** A block of time that comprises a calendar. */
export type IHWCalendarEventBlock = {
  __typename?: 'CalendarEventBlock',
  /** An optional identifier for this block */
  id?: Maybe<Scalars['ID']>,
  /** Any title rendered on the event */
  title?: Maybe<Scalars['String']>,
  /** Displayed right under the title */
  subtitle?: Maybe<Scalars['String']>,
  /** How long this block is for, in seconds */
  durationSec: Scalars['Int'],
  /** An array of icons show on the left of the calendar event */
  leftIcons?: Maybe<Array<IHWIcon>>,
  /** An array of icons shown on the right of the calendar event */
  rightIcons?: Maybe<Array<IHWIcon>>,
  /** Is the person tied to this event busy during this time? */
  isBusy?: Maybe<Scalars['Boolean']>,
};

/** The additional details attached to an event. Rendered after someone taps on an event in the calendar */
export type IHWCalendarEventDetails = {
  __typename?: 'CalendarEventDetails',
  items: Array<IHWCalendarEventDetailsItem>,
};

/** Control the rendering of the list item */
export type IHWCalendarEventDetailsItem = {
  __typename?: 'CalendarEventDetailsItem',
  /** An optional ID for this item; used to allow association with UI Enhancements */
  id?: Maybe<Scalars['String']>,
  /** How the view should be rendered */
  type: IHWCalendarEventDetailsItemType,
  /** The data fed into the view to configure it. */
  viewModel: IHWCalendarEventDetailsItemViewModel,
};

export enum IHWCalendarEventDetailsItemType {
  List = 'list',
  Button = 'button',
  SplitButton = 'splitButton',
  CardBuilder = 'cardBuilder',
  Toast = 'toast',
  Text = 'text',
  Markdown = 'markdown',
  UiEnhancementSection = 'uiEnhancementSection'
}

export type IHWCalendarEventDetailsItemViewModel = IHWList | IHWButton | IHWCardBuilder | IHWToast | IHWText | IHWMarkdown | IHWSplitButton | IHWUiEnhancementSection;

/** How an event will be rendered in the calendar. Each time represents a standard state of an event. */
export enum IHWCalendarEventKind {
  /** How a calendar event renders by default. */
  Default = 'default',
  /** If an event is not confirmed. */
  Tentative = 'tentative',
  /** When an event is happening right now */
  Active = 'active',
  /** If the event represents a time when the person is not available for additional events (usually matches isBusy) */
  Unavailable = 'unavailable',
  /** If the event represents a time where the user us unavailable (break or block) */
  Blocked = 'blocked',
  /** The event is ready to go, everyone has confirmed, it just hasn't happened yet */
  Upcoming = 'upcoming',
  /** If the event is in the past */
  Past = 'past',
  /** The user should pay attention to this event (maybe the event is unconfirmed and starting in 30 minutes!) */
  Warn = 'warn',
  /** Renders the event in red (the event could have already started but attendees have not confirmed) */
  Critical = 'critical'
}

/** The builder for all things cards */
export type IHWCardBuilder = {
  __typename?: 'CardBuilder',
  /** The id of the used for view caching */
  id: Scalars['ID'],
  /** Card Header props */
  header?: Maybe<IHWCardHeader>,
  /** optionally pass props to an image tag to be rendered in the header */
  headerImage?: Maybe<IHWImage>,
  /** all onboarding props */
  onboarding?: Maybe<IHWOnboardingCard>,
  /** Card Body props */
  body?: Maybe<IHWCardBuilderBody>,
  /** The footer of the card */
  footer?: Maybe<IHWCardFooter>,
};

/** The body of the card builder */
export type IHWCardBuilderBody = {
  __typename?: 'CardBuilderBody',
  /** Children to show in the Card */
  items: Array<IHWCardBuilderBodyItem>,
  /** Whether to wrap children in CardSection */
  isSectioned?: Maybe<Scalars['Boolean']>,
  /** Set true to display line separators between CardSection components */
  areSectionSeparatorsVisible?: Maybe<Scalars['Boolean']>,
  /** Does card include top padding */
  hasTopPadding?: Maybe<Scalars['Boolean']>,
  /** Does card include bottom padding */
  hasBottomPadding?: Maybe<Scalars['Boolean']>,
  /** Set to true to remove horizontal padding */
  isFullBleed?: Maybe<Scalars['Boolean']>,
};

export type IHWCardBuilderBodyItem = {
  __typename?: 'CardBuilderBodyItem',
  /** The type of ui component to use */
  type: IHWCardBuilderBodyItemType,
  /** The view model that renders the UI */
  viewModel: IHWCardBuilderBodyItemViewModel,
};

export enum IHWCardBuilderBodyItemType {
  Button = 'button',
  Image = 'image',
  Heading = 'heading',
  Text = 'text',
  ScoreCard = 'scoreCard',
  Toast = 'toast',
  List = 'list'
}

export type IHWCardBuilderBodyItemViewModel = IHWButton | IHWImage | IHWHeading | IHWText | IHWScoreCard | IHWToast | IHWList;

/** The footer of the card */
export type IHWCardBuilderFooter = {
  __typename?: 'CardBuilderFooter',
  /** Render buttons in the Card Footer */
  buttonGroup?: Maybe<IHWButtonGroup>,
  /** Helper for the footer */
  helper?: Maybe<Scalars['String']>,
};

/** The footer component of a card */
export type IHWCardFooter = {
  __typename?: 'CardFooter',
  /** Button group that is can be rendered in the footer */
  buttonGroup?: Maybe<IHWButtonGroup>,
  /** Any help text you'd like rendered in the footer */
  helper?: Maybe<Scalars['String']>,
};

/** Header of a card */
export type IHWCardHeader = {
  __typename?: 'CardHeader',
  /** Title for the card */
  title?: Maybe<Scalars['String']>,
  /** Optional label to show above title */
  labelText?: Maybe<Scalars['String']>,
  /** Optional icon to show above the title and before the label */
  labelIcon?: Maybe<IHWIcon>,
  /** Render buttons in the Card Header */
  actions?: Maybe<Array<IHWButton>>,
  /** Renders a Context Menu in the Card Header */
  contextMenu?: Maybe<IHWContextMenu>,
};

export type IHWCheckbox = IHWActionExecutor & {
  __typename?: 'Checkbox',
  /** Unique identifier */
  id: Scalars['ID'],
  /** A name attached to this checkbox */
  name?: Maybe<Scalars['String']>,
  /** Input label and text after checkbox icon */
  label?: Maybe<Scalars['String']>,
  /** Optional text to show below the label */
  postText?: Maybe<Scalars['String']>,
  /** is this checkbox disabled */
  isDisabled?: Maybe<Scalars['Boolean']>,
  /** Set true if the checkbox is indeterminate */
  isIndeterminate: Scalars['Boolean'],
  /** is this checkbox checked? */
  isChecked?: Maybe<Scalars['Boolean']>,
  /** Optional action to invoke when tapped */
  action?: Maybe<IHWAction>,
};

/** a confirmation dialog */
export type IHWConfirmModal = {
  /** Title of the confirmation dialog */
  title?: Maybe<Scalars['String']>,
  /** Text shown in the dialog */
  text?: Maybe<Scalars['String']>,
  /** Context used to populate the text if the text contains {{handlebars}} */
  context?: Maybe<Scalars['JSON']>,
  /** Do we require the person to type confirmInputValidString to be able to confirm */
  doesRequireConfirmation?: Maybe<Scalars['Boolean']>,
  /** Label next to the confirmation input (if doesRequireConfirmation is true} */
  confirmInputLabel?: Maybe<Scalars['String']>,
  /** The words they have to type if doesRequireConfirmation is true */
  confirmInputValidString?: Maybe<Scalars['String']>,
  /** Does typing the confirmation message match case */
  confirmInputIgnoreCase?: Maybe<Scalars['Boolean']>,
  /** What is the text on the cancel button? Defaults to 'Cancel' */
  cancelButtonText?: Maybe<Scalars['String']>,
  /** What is the text on the confirm button? Defaults to 'Confirm' */
  confirmButtonText?: Maybe<Scalars['String']>,
  /** If true, the confirm button will be red */
  isDestructive?: Maybe<Scalars['Boolean']>,
  /** If this action is set as the onComplete of another action, this will hold the response from the previous action */
  actionResponse?: Maybe<Scalars['JSON']>,
};

export type IHWContextMenu = {
  __typename?: 'ContextMenu',
  /** The actions to be shown on tap/click */
  actions: Array<IHWButton>,
  /** Set the width of the menu. Helpful for longer text in buttons */
  size?: Maybe<IHWContextMenuSize>,
  /** Adds text to the collapsed menu */
  text?: Maybe<Scalars['String']>,
  /** Overrides the default icon */
  icon?: Maybe<IHWIcon>,
  /** Set true to make the button blue */
  isSimple?: Maybe<Scalars['Boolean']>,
  /** Set true to make the button smaller */
  isSmall?: Maybe<Scalars['Boolean']>,
  /** Set to true makes the menu close when any action is selected */
  closeOnSelectAction?: Maybe<Scalars['Boolean']>,
  /** Hide the icon entirely */
  isTextOnly?: Maybe<Scalars['Boolean']>,
};

export enum IHWContextMenuSize {
  Medium = 'medium',
  Large = 'large'
}



/** An event error. */
export type IHWEventError = {
  __typename?: 'EventError',
  /** An http code */
  code: Scalars['Int'],
  /** A name that can be used to identify this error. INVALID_PARAMETERS for example */
  name: Scalars['String'],
  /** A description of the error that will be useful to a developer */
  reason: Scalars['String'],
  /** A description of the error that can be displayed to the user */
  friendlyReason: Scalars['String'],
  /** The status */
  status: Scalars['String'],
};

/** An event warning. */
export type IHWEventWarning = {
  __typename?: 'EventWarning',
  /** A name that can be used to identify this warning. INVALID_PARAMETERS for example */
  name: Scalars['String'],
  /** A description of the warning that will be useful to a developer */
  reason: Scalars['String'],
  /** A description of the warning that can be displayed to the user */
  friendlyReason: Scalars['String'],
};

/** Wraps a standard list or list item and makes it collapsable */
export type IHWExpandableListItem = {
  __typename?: 'ExpandableListItem',
  /** Unique id for UI caching */
  id: Scalars['ID'],
  /** Base list item props */
  item: IHWListItem,
  /** Optional; adds a nested list */
  list?: Maybe<IHWList>,
  /** Optional; adds multiple lists nested at the same level */
  lists?: Maybe<Array<IHWList>>,
  /** Optional icon for collapsed state */
  collapsedIconName?: Maybe<Scalars['String']>,
  /** Optional icon for expanded state */
  expandedIconName?: Maybe<Scalars['String']>,
};

export type IHWGetUiEnhancementsResponse = {
  __typename?: 'GetUIEnhancementsResponse',
  /** The UI enhancements by section */
  sections?: Maybe<Array<IHWUiEnhancementSection>>,
};

export type IHWHeading = {
  __typename?: 'Heading',
  /** Id for view caching */
  id: Scalars['ID'],
  /** HTML rendered directly */
  html?: Maybe<Scalars['String']>,
  /** Text rendered in the header */
  text?: Maybe<Scalars['String']>,
  /** The weight of the heading, H1 and beyond */
  weight?: Maybe<IHWHeadingWeight>,
};

export enum IHWHeadingWeight {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
  P = 'p'
}

export type IHWIcon = {
  __typename?: 'Icon',
  /** Id for ui caching */
  id: Scalars['ID'],
  /** The name of the icon to render. If not found, this will return null. */
  name?: Maybe<Scalars['String']>,
  /** Set true to render an icon with a stroke, but no fill */
  isLineIcon?: Maybe<Scalars['Boolean']>,
};

/** A basic image tag */
export type IHWImage = {
  __typename?: 'Image',
  /** For UI caching */
  id: Scalars['ID'],
  /** Where to pull the image from */
  src: Scalars['String'],
  /** Rendered as the alt tag for hovers */
  alt?: Maybe<Scalars['String']>,
};



/** A list of list items */
export type IHWList = {
  __typename?: 'List',
  /** Unique id for UI caching */
  id: Scalars['ID'],
  /** List Header */
  header?: Maybe<IHWListHeader>,
  /** List items */
  items?: Maybe<Array<IHWListItemTypes>>,
  /** Set true to make the list smaller */
  isSmall?: Maybe<Scalars['Boolean']>,
  /** Set to true to show separators between list items */
  areSeparatorsVisible?: Maybe<Scalars['Boolean']>,
  /** Optional: set whether to use checkbox or radio for selectable list items */
  selectableType?: Maybe<IHWListItemSelectableType>,
};

export type IHWListHeader = {
  __typename?: 'ListHeader',
  /** Title to render in the header */
  title: Scalars['String'],
  /** Optional subtitle text */
  subtitle?: Maybe<Scalars['String']>,
  /** Set true for small lists */
  isSmall?: Maybe<Scalars['Boolean']>,
  /** Buttons to associate with the list header */
  actions?: Maybe<Array<IHWButton>>,
};

/** A List is made up of ListItems */
export type IHWListItem = {
  __typename?: 'ListItem',
  /** Unique id for UI caching */
  id: Scalars['ID'],
  /** Title text */
  title: Scalars['String'],
  /** Optional subtitle text */
  subtitle?: Maybe<Scalars['String']>,
  /** Optional note text */
  note?: Maybe<Scalars['String']>,
  /** Can render this item as expandable */
  isExpandable?: Maybe<Scalars['Boolean']>,
  /** URL to show a user avatar */
  avatar?: Maybe<Scalars['String']>,
  /** URL to show an image */
  image?: Maybe<Scalars['String']>,
  /** Inline svg icon */
  icon?: Maybe<IHWIcon>,
  /** Optional; visually hides the icon without removing it */
  isIconHidden?: Maybe<Scalars['Boolean']>,
  /** Set true to add left spacing. useful in aligning with other list items that have icons or images */
  isLeftIndented?: Maybe<Scalars['Boolean']>,
  /** Set true when the list can be reordered */
  isDraggable?: Maybe<Scalars['Boolean']>,
  /** Set true when the list can be reordered */
  isDisabled?: Maybe<Scalars['Boolean']>,
  /** Makes the list item a setting */
  toggleId?: Maybe<Scalars['String']>,
  /** Props passed to the toggle if toggleId is set */
  toggleProps?: Maybe<IHWToggle>,
  /** A primary action that turns the entire list item into a clickable action */
  primaryAction?: Maybe<IHWButton>,
  /** Actions associated with the list item */
  actions?: Maybe<Array<Maybe<IHWButton>>>,
  /** Context Menu associated with the list it */
  contextMenu?: Maybe<IHWContextMenu>,
  /** Set to true to show separator for this list item if followed by another list item. */
  isSeparatorVisible?: Maybe<Scalars['Boolean']>,
  /** Optional class name for list item */
  className?: Maybe<Scalars['String']>,
  /** Optional: set whether to use checkbox or radio for selectable list items */
  selectableType?: Maybe<IHWListItemSelectableType>,
  /** Any props you want sent down to the selectable component being rendered */
  selectableProps?: Maybe<IHWListItemSelectablePropsType>,
  /** Highlight title, subtitle, note with warning colors */
  warnings?: Maybe<IHWListItemWarningConfig>,
  /** Optional; adds a nested list */
  list?: Maybe<IHWList>,
  /** Optional; adds multiple lists nested at the same level */
  lists?: Maybe<Array<IHWList>>,
};

export type IHWListItemSelectablePropsType = IHWCheckbox | IHWRadio;

export enum IHWListItemSelectableType {
  Checkbox = 'checkbox',
  Radio = 'radio'
}

export type IHWListItemTypes = IHWListItem | IHWExpandableListItem;

/** Which parts should be highlighted in red */
export type IHWListItemWarningConfig = {
  __typename?: 'ListItemWarningConfig',
  title?: Maybe<Scalars['Boolean']>,
  subtitle?: Maybe<Scalars['Boolean']>,
  note?: Maybe<Scalars['Boolean']>,
};

/** Render markdown beautifully */
export type IHWMarkdown = {
  __typename?: 'Markdown',
  /** Unique ID for view caching. */
  id: Scalars['ID'],
  /** Markdown text to be rendered */
  source: Scalars['String'],
};

export enum IHWModalSize {
  Small = 'small',
  Medium = 'medium',
  FullWidth = 'fullWidth'
}

/** An awesome card for onboarding people! */
export type IHWOnboardingCard = {
  __typename?: 'OnboardingCard',
  /** Title of the entire card */
  title?: Maybe<Scalars['String']>,
  /** Steps for onboarding */
  steps: Array<IHWOnboardingCardStep>,
};

/** One step in the onboarding process */
export type IHWOnboardingCardStep = {
  __typename?: 'OnboardingCardStep',
  /** Unique identifier */
  id: Scalars['ID'],
  /** Title that shows in the tab */
  tabTitle: Scalars['String'],
  /** Icon for the tab */
  tabIcon?: Maybe<IHWIcon>,
  /** Title that shows in the panel */
  panelTitle: Scalars['String'],
  /** Copy describing the step in the card's body */
  panelCopy: Scalars['String'],
  /** Primary CTA of this step */
  panelCTA?: Maybe<IHWButton>,
  /** Is this step complete? */
  isComplete?: Maybe<Scalars['Boolean']>,
};

/** A radio control. Give a bunch the same name to keep them as part of the same group */
export type IHWRadio = IHWActionExecutor & {
  __typename?: 'Radio',
  /** Unique identifier */
  id: Scalars['ID'],
  /** A name attached to this radio button */
  name?: Maybe<Scalars['String']>,
  /** Label and text for the radio */
  label?: Maybe<Scalars['String']>,
  /** Optional text to show after the label */
  postText?: Maybe<Scalars['String']>,
  /** is this control disabled? */
  isDisabled?: Maybe<Scalars['Boolean']>,
  /** Is this control checked? */
  isChecked?: Maybe<Scalars['Boolean']>,
  /** Optional action to invoke when tapped */
  action?: Maybe<IHWAction>,
};

/** A score card! */
export type IHWScoreCard = {
  __typename?: 'ScoreCard',
  scores?: Maybe<Array<IHWScoreCardPanel>>,
};

/** Panels make up the score card */
export type IHWScoreCardPanel = {
  __typename?: 'ScoreCardPanel',
  /** Unique id for React loops */
  id: Scalars['ID'],
  /** The label for this score, e.g. Today's Sales */
  label?: Maybe<Scalars['String']>,
  /** The score, e.g. $234.30 */
  value?: Maybe<Scalars['String']>,
};

/** A button with a dropdown of actions on the right */
export type IHWSplitButton = {
  __typename?: 'SplitButton',
  /** ID for view caching */
  id: Scalars['ID'],
  /** The main action readily surfaced to the user */
  defaultAction: IHWButton,
  /** All the secondary nested actions */
  actions?: Maybe<Array<IHWButton>>,
  /** Sets the visual hierarchy of the button */
  kind?: Maybe<IHWButtonKinds>,
  /** Set true to fill the parent’s width */
  isFullWidth?: Maybe<Scalars['Boolean']>,
  /** Sets the visual hierarchy of the button */
  isSmall?: Maybe<Scalars['Boolean']>,
  /** Optional; use a portal to render the menu. By default, it renders below the button */
  usePortal?: Maybe<Scalars['Boolean']>,
};

/** Your friendly neighborhood Sprucebot Avatar! */
export type IHWSprucebotAvatar = {
  __typename?: 'SprucebotAvatar',
  /** The unique id for this avatar */
  id: Scalars['ID'],
  /** How does Sprucebot feel? */
  stateOfMind?: Maybe<IHWSprucebotAvatarStateOfMind>,
  /** How big should the avatar be? */
  size?: Maybe<IHWSprucebotAvatarSize>,
};

export enum IHWSprucebotAvatarSize {
  /** This size renders perfectly inline with body text */
  Small = 'small',
  /** This size is for rendiring in a subheadings and card headers */
  Medium = 'medium',
  /** This size is for rendering in a heading or as a bigform question */
  Large = 'large'
}

/** Sprucebot's current state of mind */
export enum IHWSprucebotAvatarStateOfMind {
  /** When Sprucebot is saying something informative or a salutation, like a status update or a 'Happy Monday!' */
  Chill = 'chill',
  /** When Sprucebot is loading or sending data */
  Contemplative = 'contemplative',
  /** When Sprucebot is asking a question and expecting input from a human */
  Curious = 'curious',
  /** When Sprucebot is celebrating because a process has completed, like finishing a setup wizard or submitting a form */
  Accomplished = 'accomplished'
}

/** Used for testing only */
export type IHWTestType = {
  __typename?: 'TestType',
  /** a simple id combining the passed id and i suffix like '-1' */
  id: Scalars['ID'],
  /** is The First or The Second */
  name: Scalars['String'],
  /** This field is overridden by a resolver and should be 'hello world' */
  address: Scalars['String'],
};

/** Basic text to be rendered */
export type IHWText = {
  __typename?: 'Text',
  /** Unique id for UI caching */
  id: Scalars['String'],
  /** the text to render */
  text?: Maybe<Scalars['String']>,
  /** Context used to populate text if it's a template {{handlebar_style}} */
  context?: Maybe<Scalars['JSON']>,
};


/** Call out information so it's impossible to miss! */
export type IHWToast = {
  __typename?: 'Toast',
  /** Unique id for UI caching */
  id: Scalars['ID'],
  /** Headline text */
  headline: Scalars['String'],
  /** Optional; Text after the headline */
  text?: Maybe<Scalars['String']>,
  /** Optional; controls whether the toast can be removed. Defaults to true */
  canRemove?: Maybe<Scalars['Boolean']>,
  /** Action to be invoked when hitting the dismiss button */
  removeAction?: Maybe<IHWAction>,
  /** Sets the variation of toast */
  kind?: Maybe<Scalars['String']>,
  /** Text for the followup action */
  followupText?: Maybe<Scalars['String']>,
  /** Action to be invoked when hitting the followup CTA */
  followupAction?: Maybe<IHWAction>,
};

export type IHWToggle = IHWActionExecutor & {
  __typename?: 'Toggle',
  /** Unique id for UI caching */
  id: Scalars['ID'],
  /** Text after the toggle */
  postText?: Maybe<Scalars['String']>,
  /** Optional action to invoke when tapped */
  action?: Maybe<IHWAction>,
};

export type IHWUiEnhancementSection = {
  __typename?: 'UIEnhancementSection',
  /** The ID of the section that is acting as a placeholder for ui enhancements */
  id: Scalars['ID'],
  /** Calendar items to add as enhancements */
  calendarEventDetailsItems?: Maybe<Array<IHWCalendarEventDetailsItem>>,
  /** [PLACEHOLDER] Card builder items to add as enhancements */
  cardBuilderBodyItems?: Maybe<Array<IHWCardBuilderBodyItem>>,
  /** Context menu items to add as enhancements */
  contextMenuItems?: Maybe<Array<IHWButton>>,
  /** Items to add as actions in the section context menu */
  actions?: Maybe<Array<IHWAction>>,
};
