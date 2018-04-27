import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import moment from 'moment-timezone'
import Container from '../Container/Container'
import BotText from '../BotText/BotText'
import Loader from '../Loader/Loader'
import {
	H1,
	H2,
	H3,
	H4,
	H5,
	H6,
	SectionHeading,
	Paragraph as P,
	A
} from '../Typography/Typography'
import Avatar from '../Avatar/Avatar'
import Button from '../Button/Button'
import Form from '../Form/Form'
import Switch from '../Switch/Switch'
import InputField from '../InputField/InputField'
import SelectField from '../SelectField/SelectField'
import { List, ListItem } from '../List/List'
import { Tabs, TabPane } from '../Tabs/Tabs'
import LinkPile from '../LinkPile/LinkPile'
import Pager from '../Pager/Pager'
import StatsSlider from '../StatsSlider/StatsSlider'
import { GridButton, ButtonGrid } from '../ButtonGrid/ButtonGrid'
import Stars from '../Stars/Stars'
import ImageCropper from '../ImageCropper/ImageCropper'
import Callout from '../Callout/Callout'
import Feed from '../Feed/Feed'
import TrainingGuide from '../TrainingGuide/TrainingGuide'
import Onboarding from '../Onboarding/Onboarding'
import Dialog from '../Dialog/Dialog'
import Pre from '../Pre/Pre'
import Error from '../Error/Error'
import skill from '../../skillskit/index'
import * as actions from '../../skillskit/store/actions'
import reducers from '../../skillskit/store/reducers'
import withStore from '../../skillskit/store/withStore'

import FormExample from './FormExample'

const Dark = styled(Pre)`
	background-color: #333;
	padding: 3px;
`

const demoGuest = {
	id: 'b8d62e17-a511-4b9b-ae8a-56710f89af48',
	role: 'guest',
	status: 'offline',
	visits: 1,
	LocationId: '1975559c-e071-4198-8ab3-eccbeb00e1d0',
	UserId: 'a2ca3026-ef80-408f-9a39-4ab9fa44a87d',
	User: {
		id: 'a2ca3026-ef80-408f-9a39-4ab9fa44a87d',
		firstName: 'Niki',
		name: 'Niki R.',
		profileImageUUID: null,
		profileImages: {
			profile60: 'https://hello.sprucebot.com/avatar.jpg',
			'profile60@2x': 'https://hello.sprucebot.com/avatar.jpg',
			profile150: 'https://hello.sprucebot.com/avatar.jpg',
			'profile150@2x': 'https://hello.sprucebot.com/avatar.jpg'
		},
		defaultProfileImages: {
			profile60:
				'https://s3.amazonaws.com/sprucebot-dev/default-profile--X60.jpg',
			'profile60@2x':
				'https://s3.amazonaws.com/sprucebot-dev/default-profile--X60@2x.jpg',
			profile150:
				'https://s3.amazonaws.com/sprucebot-dev/default-profile--X150.jpg',
			'profile150@2x':
				'https://s3.amazonaws.com/sprucebot-dev/default-profile--X150@2x.jpg'
		}
	},
	isConnected: true,
	lastRecordedVisit: '2017-12-01T23:05:35.705Z',
	updatedAt: '2017-12-02T00:06:05.448Z',
	Location: {
		id: '1975559c-e071-4198-8ab3-eccbeb00e1d0',
		name: 'Spruce',
		addressLine1: '4347 Tennyson St',
		addressLine2: null,
		addressCity: 'Denver',
		addressState: 'CO',
		addressZip: '80212',
		addressCountry: 'US',
		geo: { lat: 39.775644, lng: -105.044258 },
		OrganizationId: 'fcdd548b-fe3b-42dc-8c66-6810411cd84d'
	}
}
let NOW
if (process.env.NODE_ENV === 'test') {
	NOW = moment(946738800000).tz('America/Los_Angeles') // Snapshot testing requires an unchanging date
} else {
	NOW = new Date()
}

class Styleguide extends Component {
	constructor(props) {
		super(props)
		this.state = {
			calloutOn: false,
			errorMessage: ''
		}
		this.didCompleteOnboarding = this.didCompleteOnboarding.bind(this)
	}
	didCompleteOnboarding() {
		const { onboardingComplete } = this.props.onboarding
		if (!onboardingComplete) {
			this.props.actions.onboarding.finishOnboarding()
			console.log(
				'Posting to your database that you completed onboarding.  Check your Skill Data now!'
			)
		} else {
			console.log(
				"You've already completed the onboarding.  Check your Skill Data now!"
			)
		}
	}
	render() {
		const HR = <hr style="border-top-width:10px;" />
		const { calloutOn } = this.state
		return (
			<div>
				<H1>Importing Components</H1>
				<Container>
					<BotText>
						All the components you need to build your skill are available in the
						'react-sprucebot' module. Any modules you create yourself are
						subject to rejection from the Skills Marketplace.
					</BotText>
					<Pre>{`import {
	Container,
	BotText,
	Loader,
	H1,
	H2,
	H3,
	H4,
	H5,
	H6,
	SectionHeading,
	Paragraph as P,
	A,
	Avatar,
	Button,
	Form,
	Switch,
	InputField,
	SelectField,
	SubmitWrapper,
	List,
	ListItem,
	Tabs,
	TabPane,
	LinkPile,
	Pager,
	StatsSlider,
	ButtonGrid,
	GridButton,
	Stars,
	ImageCropper,
	Callout,
	Feed
} from 'react-sprucebot'`}</Pre>
				</Container>
				<H1>Headings</H1>
				<Container>
					<BotText>
						Notice the use of the Component with a capitalized tag, e.g. 'H' vs
						'h'. This is intentional and is actively enforced.
					</BotText>
					<H1>I'm an H1</H1>
					<Pre>{`<H1>I'm an H1</H1>`}</Pre>
					<H2>I'm an H2</H2>
					<Pre>{`<H2>I'm an H2</H2>`}</Pre>
					<H3>I'm an H3</H3>
					<Pre>{`<H3>I'm an H3</H3>`}</Pre>
					<H4>I'm an H4</H4>
					<Pre>{`<H4>I'm an H4</H4>`}</Pre>
					<H5>I'm an H5</H5>
					<Pre>{`<H5>I'm an H5</H5>`}</Pre>
					<H6>I'm an H6</H6>
					<Pre>{`<H6>I'm an H6</H6>`}</Pre>
					<P>I'm a paragraph of some text</P>
					<Pre>{`<P>I'm a paragraph of some text</P>`}</Pre>
					<A href="#">I'm an anchor tag</A>
					<Pre>{`<A href="#">I'm an anchor tag</A>`}</Pre>
					<SectionHeading>Section Heading</SectionHeading>
					<Pre>{`<SectionHeading>Section Heading</SectionHeading>`}</Pre>
					<BotText>
						Use SectionHeading to break up sections of your page and to label
						forms, similar to a fieldset.
					</BotText>
				</Container>
				<H1>Sub Headings</H1>
				<Container>
					<H1 with_subheader>Header</H1>
					<H2 subheader>Sub Headings</H2>
					<Pre
					>{`<H1 with_subheader>Header</H1>\n<H2 subheader>Sub Headings</H2>`}</Pre>
				</Container>
				<H1>Bot Text</H1>
				<Container>
					<BotText>
						I'm some bot text. I'm great for quick hints, tips, shout outs, etc.
						This text comes right from Sprucebot, so make sure it's on brand.
					</BotText>
					<Pre
					>{`<BotText>I'm some bot text. I'm great for quick hints, tips, shout outs, etc. This text comes right from Sprucebot, so make sure it's on brand.</BotText>`}</Pre>
				</Container>
				<H1>Paragraphs</H1>
				<Container>
					<P>I'm a normal paragraph tag</P>
					<Pre>{`<P>I'm a normal paragraph tag</P>`}</Pre>
					<P fine>I'm some fine print</P>
					<Pre>{`<P fine>I'm some fine print</P>`}</Pre>
				</Container>
				<H1>Top Avatar</H1>
				<Container>
					<BotText>
						Avatars usually go next to users when output in a list. Adding the
						"top" property will make it big and center. Great for the tops of
						profile or dashboard pages.
					</BotText>
					<Avatar top image="https://hello.sprucebot.com/avatar.jpg" />
					<Pre
					>{`<Avatar top image="https://hello.sprucebot.com/avatar.jpg" />`}</Pre>
				</Container>
				<H1
					ref={ref => {
						this.ref = ref
					}}
				>
					Buttons
				</H1>
				<Container>
					<Button primary>I'm a primary button</Button>
					<Pre>{`<Button primary>I'm a primary button</Button>`}</Pre>
					<Button primary href="https://sprucebot.com">
						I'm a primary button turned link
					</Button>
					<Pre
					>{`<Button primary href="https://sprucebot.com">I'm a primary button turned link.</Button>`}</Pre>
					<Button primary disabled>
						I'm a primary disabled button
					</Button>
					<Pre
					>{`<Button primary disabled>I'm a primary disabled button</Button>`}</Pre>
					<Button secondary>I'm a secondary button</Button>
					<Pre>{`<Button secondary>I'm a secondary button</Button>`}</Pre>
					<Button secondary disabled>
						I'm a secondary disabled button
					</Button>
					<Pre
					>{`<Button secondary disabled>I'm a secondary disabled button</Button>`}</Pre>
					<Button alt>I'm an alt button</Button>
					<Pre>{`<Button alt>I'm an alt button</Button>`}</Pre>
					<Button alt disabled>
						I'm an alt disabled button
					</Button>
					<Pre
					>{`<Button alt disabled>I'm an alt disabled button</Button>`}</Pre>
					<Button secondary alt>
						I'm a secondary alt button
					</Button>
					<Pre
					>{`<Button secondary alt >I'm a secondary alt button</Button>`}</Pre>
					<Button secondary alt disabled>
						I'm a secondary alt disabled button
					</Button>
					<Pre
					>{`<Button secondary alt disabled>I'm a secondary alt disabled button</Button>`}</Pre>
					<Button caution>I'm a caution button</Button>
					<Pre>{`<Button caution>I'm a caution button</Button>`}</Pre>
					<Button link>I'm a button link</Button>
					<Pre>{`<Button link>I'm a button link</Button>`}</Pre>
				</Container>

				<H1>Loaders</H1>
				<Container>
					<BotText>
						Loaders can be dark or light. Default, they are dark. But, if you
						need to put a loader on a dark dark background, set dark={false}.
					</BotText>
					<Loader />
					<Pre>{`<Loader />`}</Pre>
					<Dark>
						<Loader dark={false} />
					</Dark>
					<Pre>{`<Loader dark={false} />`}</Pre>
					<Button busy>Content does not matter</Button>
					<Pre>{`<Button busy>Content does not matter</Button>`}</Pre>
				</Container>
				<H1>Switches</H1>
				<Container>
					<Switch
						onChange={(on, e) => {
							console.log('on:', on, 'event:', e)
						}}
					/>
					<Pre>{`<Switch
	onChange={(on, e) => {
		console.log('on:', on, 'event:', e)
	}}
/>`}</Pre>
					<Switch on />
					<Pre>{`<Switch on />`}</Pre>
				</Container>
				<H1>Redux Forms</H1>
				<Container>
					<FormExample />
				</Container>
				<H1>Lists</H1>
				<Container>
					<SectionHeading>A Friend List</SectionHeading>
					<BotText>
						Lists are very useful for showing guests, teammates, etc.
					</BotText>
					<List>
						<ListItem
							title="Taylor"
							subtitle="Last Visit: Today"
							rightTitle="Owner"
							rightSubtitle="Visits: 7"
							avatar="https://hello.sprucebot.com/avatar.jpg"
						/>
						<ListItem
							online={false}
							title="Ryan"
							subtitle="Last Visit: 10 days ago"
							rightTitle="Owner"
							rightSubtitle="Visits: 7"
							avatar="https://hello.sprucebot.com/avatar.jpg"
						/>
					</List>
					<Pre>{`<List>
	<ListItem
		title="Taylor"
		subtitle="Last Visit: Today"
		rightTitle="Owner"
		rightSubtitle="Visits: 7"
		avatar="https://hello.sprucebot.com/avatar.jpg"
	/>
	<ListItem
		online={false}
		title="Ryan"
		subtitle="Last Visit: 10 days ago"
		rightTitle="Owner"
		rightSubtitle="Visits: 7"
		avatar="https://hello.sprucebot.com/avatar.jpg"
	/>
</List>`}</Pre>

					<SectionHeading>A Flexible List!</SectionHeading>
					<BotText>
						But, lists can do more than that! Actually, a LOT more than that!
					</BotText>
					<List>
						<ListItem>This is the most basic list item.</ListItem>
						<ListItem
							title="Awesome title!"
							subtitle="Fantastic subtitle!"
							rightInput={
								<Button
									remove
									onClick={e => {
										console.log('event:', e)
									}}
								/>
							}
						/>
						<ListItem rightInput={<Switch />}>I can even do switches!</ListItem>
						<ListItem>
							<InputField label="An input!" input={{ value: '' }} meta={{}} />
						</ListItem>
						<ListItem>
							<SelectField
								label="And a SelectField!"
								input={{ value: '' }}
								meta={{}}
							>
								<option>Nuke 'em Rico</option>
								<option>With pleasure!</option>
							</SelectField>
						</ListItem>
					</List>
					<Pre>{`<List>
	<ListItem>This is the most basic list item.</ListItem>
	<ListItem
		title="Awesome title!"
		subtitle="Fantastic subtitle!"
		rightInput={
			<Button
				remove
				onClick={e => {
					console.log('event:', e)
				}}
			/>
		}
	/>
	<ListItem rightInput={<Switch />}>I can even do switches!</ListItem>
	<ListItem>
		<InputField label="An input!" input={{value: 'val', onChange: () => console.log('onChange!')}} />
	</ListItem>
	<ListItem>
		<Select label="And a select!">
			<option>Nuke 'em Rico</option>
			<option>With pleasure!</option>
		</Select>
	</ListItem>
</List>`}</Pre>
				</Container>
				<H1>Tabs</H1>
				<Container>
					<Tabs
						onChange={(idx, e) => {
							console.log('tab:', idx, 'event:', e)
						}}
					>
						<TabPane title="First">First Pane</TabPane>
						{!this.state.hideSecondPane && (
							<TabPane selected title="Second">
								<BotText>
									Tabs are fantastic! You can use them so easily!
								</BotText>
							</TabPane>
						)}
						<TabPane title="Third">
							<BotText>Tabs can be dynamically hidden and shown!</BotText>
							<List>
								<ListItem
									title="Show Second Tab"
									rightInput={
										<Switch
											on={true}
											onChange={on => this.setState({ hideSecondPane: !on })}
										/>
									}
								/>
							</List>
						</TabPane>
					</Tabs>
					<Pre>{`<Tabs
	onChange={(idx, e) => {
		console.log('tab:', idx, 'event:', e)
	}}
>
	<TabPane title="First">First Pane</TabPane>
	<TabPane selected title="Second">
		<BotText>Tabs are fantastic! You can use them so easily!</BotText>
	</TabPane>
	<TabPane title="Third">Third Pane</TabPane>
</Tabs>`}</Pre>
				</Container>
				<H1>Link Pile</H1>
				<Container>
					<BotText>
						LinkPile's are great for dashboards or control panels. It shrinks
						the margin between buttons to make them look more cohesive.
					</BotText>
					<SectionHeading>Controls</SectionHeading>
					<LinkPile>
						<Button primary>Button 1</Button>
						<Button alt>Button 2</Button>
						<Button secondary>Button 3</Button>
						<Button secondary alt>
							Button 4
						</Button>
					</LinkPile>
					<Pre>{`<LinkPile>
	<Button primary>Button 1</Button>
	<Button alt>Button 2</Button>
	<Button secondary>Button 3</Button>
	<Button secondary alt>
		Button 4
	</Button>
</LinkPile>`}</Pre>
				</Container>
				<H1>Pager</H1>
				<Container>
					<BotText>
						The pager is pretty simple. It will track your page (zero based),
						but you'll need to implement `onChange`` to make your API requests.
						Also, don't forget to add `totalPages`.
					</BotText>
					<Pager
						totalPages={5}
						titles={page =>
							['Page 1', 'Custom', 'What the?', 'You know', 'What'][page]
						}
						onChange={(page, e) => {
							console.log('page:', page, 'event:', e)
						}}
					/>
					<Pre>{`<Pager
	totalPages={5}
	titles={page =>
		['Page 1', 'Custom', 'What the?', 'You know', 'What'][page]}
		onChange={(page, e) => {
			console.log('page:', page, 'event:', e)
		}}
		/>`}</Pre>
				</Container>
				<H1>Stats Slider</H1>
				<Container>
					<SectionHeading>KPI's</SectionHeading>
					<StatsSlider
						stats={[
							{
								dir: 1,
								title: 'Hourly',
								value: '$23.50'
							},
							{
								dir: -1,
								title: 'Services',
								value: 10
							},
							{
								dir: 1,
								title: 'Avg. Ticket',
								value: '$25.23'
							},
							{
								dir: 0,
								title: 'Returns',
								value: 0
							}
						]}
					/>
					<Pre>{`<StatsSlider
	stats={[
		{
			dir: 1,
			title: 'Hourly',
			value: '$23.50'
		},
		{
			dir: -1,
			title: 'Services',
			value: 10
		},
		{
			dir: 1,
			title: 'Avg. Ticket',
			value: '$25.23'
		},
		{
			dir: 0,
			title: 'Returns',
			value: 0
		}
	]}
/>`}</Pre>
				</Container>
				<H1>Button Grid</H1>
				<Container>
					<SectionHeading>Select Your Options</SectionHeading>
					<BotText>
						Set the line-height of .btn_grid .btn to control height of button.
						The text will stay centered.
					</BotText>
					<ButtonGrid>
						<GridButton subtitle="It's good">Option 1</GridButton>
						<GridButton subtitle="It's better!">Option 2</GridButton>
						<GridButton subtitle="Def worth a look" selected>
							Option 3
						</GridButton>
					</ButtonGrid>
					<Pre>{`<ButtonGrid>
	<GridButton subtitle="It's good">Option 1</GridButton>
	<GridButton subtitle="It's better!">Option 2</GridButton>
	<GridButton subtitle="Def worth a look" selected>
		Option 3
	</GridButton>
</ButtonGrid>`}</Pre>
				</Container>
				<H1>Stars</H1>
				<Container>
					<BotText>Please take a moment to rate this rating component.</BotText>
					<Stars
						max={4}
						score={2}
						static={false}
						onChange={(score, e) => {
							console.log('score:', score, 'event:', e)
						}}
					/>
					<Pre>{`<Stars
	max={4}
	score={2}
	static={false}
	onChange={(score, e) => {
		console.log('score:', score, 'event:', e)
	}}
/>`}</Pre>
					<BotText>
						You can also make Stars static so the rating cannot be changed!
					</BotText>
					<Stars
						max={4}
						score={2}
						static={true}
						onChange={(score, e) => {
							console.log('score:', score, 'event:', e)
						}}
					/>
					<Pre>{`<Stars
	max={4}
	score={2}
	static={true}
	onChange={(score, e) => {
		console.log('score:', score, 'event:', e)
	}}
/>`}</Pre>
				</Container>
				<H1>Image Cropper</H1>
				<Container>
					<BotText>
						Our ImageCropper is currently using{' '}
						<a
							onClick={e => e.stopPropagation()}
							href="https://github.com/DominicTobias/react-image-crop"
						>
							react-image-crop
						</a>. Tap the button below and give it a shot.
					</BotText>
					<ImageCropper
						tapToCrop={true}
						src="https://s3.amazonaws.com/sprucebot/ticket.png"
						onSave={img => console.log(img)}
						crop={{ x: 25, y: 25, width: 50, height: 50 }}
					/>
					<Pre>{`<ImageCropper
	tapToCrop={true}
	src="https://s3.amazonaws.com/sprucebot/ticket.png"
	onSave={img => console.log(img)}
	crop={{ x: 25, y: 25, width: 50, height: 50 }}
/>`}</Pre>
				</Container>
				<H1>Callouts</H1>
				<Container>
					<BotText>
						If you have some information you need to call out (think modal
						dialog), you can use the {`<Callout />`} component.
					</BotText>
					<Callout on={calloutOn}>
						<H2>Some important sub-form</H2>
						<BotText>
							Things like nested forms or multi-step processes benefit greatly
							from a callout. It lets you see where you were, but brings focus
							to what you're about to do.
						</BotText>
						<List>
							<ListItem
								rightInput={
									<Switch
										onChange={calloutOn => this.setState({ calloutOn })}
									/>
								}
							>
								Try the call out! ->
							</ListItem>
						</List>
					</Callout>
					<Pre>{`<Callout on={calloutOn}>
	<H2>Call this out</H2>
	<BotText>
		Things like nested forms or multi-step processes benefit greatly
		from a callout. It lets you see where you were, but brings focus
		to what you're about to do.
	</BotText>
	<List>
		<ListItem
			rightInput={
				<Switch
					onChange={calloutOn => this.setState({ calloutOn })}
				/>
			}
		>
			Try the call out! ->
		</ListItem>
	</List>
</Callout>`}</Pre>
				</Container>
				<H1>The Feed</H1>
				<Container>
					<BotText>
						The Feed is used by nearly every Skill to visualize events and
						facilitate conversation around those events.
					</BotText>
					<Feed
						data={[
							{
								createdAt: moment(NOW).subtract(34, 'hour'),
								id: 'bbc55a55-2e13-4322-a2c5-0fec1abc79be',
								message:
									'Randy C. has arrived! 💥 This <FeedItem /> has bigAvatar set to true.',
								user: demoGuest,
								bigAvatar: true,
								attachments: [
									{
										title: 'Membership level',
										value: 'Gold'
									},
									{
										title: 'Total Points',
										value: 1253
									}
								]
							},
							{
								createdAt: moment(NOW).subtract(25, 'hour'),
								id: 'bbc55a55-2e13-4372-a2c5-0fec1abc79ee',
								message: 'Ryan J. has arrived! 💥 bigAvatar is not true.',
								user: demoGuest,
								attachments: [
									{
										title: 'Membership level',
										value: 'Turquoise'
									},
									{
										title: 'Total Points',
										value: 2393
									},
									{
										title: 'Favorite Color',
										value: 'blue'
									},
									{
										title: 'Note',
										fullWidth: true,
										value:
											'"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed dolor ac felis scelerisque hendrerit ac et dui. Sed vel tortor vitae magna luctus aliquam sit amet ut eros. Duis et viverra nulla, et mattis nunc." - Taylor R. Sept. 3rd'
									}
								]
							},
							{
								createdAt: NOW,
								id: 'bbc55a55-2e13-4322-a2c5-0fec1dabc79ee',
								message:
									'Shane M. has arrived! 💥 We also added more to this message to demo long alerts.',
								user: demoGuest,
								attachments: [
									{
										title: 'Membership level',
										value: 'Platinum'
									},
									{
										title: 'Total Points',
										value: 5302
									},
									{
										title: 'Visits',
										value: 5
									},
									{
										title: 'Idle chit-chat',
										value: 'A little'
									}
								]
							}
						]}
					/>
					<Pre>{`<Feed data={[
	{
		createdAt: moment(NOW).subtract(34, 'hour'),
		id: 'bbc55a55-2e13-4322-a2c5-0fec1abc79be',
		message:
			'Randy C. has arrived! 💥 This <FeedItem /> has bigAvatar set to true.',
		user: demoGuest,
		bigAvatar: true,
		attachments: [
			{
				title: 'Membership level',
				value: 'Gold'
			},
			{
				title: 'Total Points',
				value: 1253
			}
		]
	},
	{
		createdAt: moment(NOW).subtract(25, 'hour'),
		id: 'bbc55a55-2e13-4372-a2c5-0fec1abc79ee',
		message: 'Ryan J. has arrived! 💥 bigAvatar is not true.',
		user: demoGuest,
		attachments: [
			{
				title: 'Membership level',
				value: 'Turquoise'
			},
			{
				title: 'Total Points',
				value: 2393
			},
			{
				title: 'Favorite Color',
				value: 'blue'
			},
			{
				title: 'Note',
				fullWidth: true,
				value:
					'"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sed dolor ac felis scelerisque hendrerit ac et dui. Sed vel tortor vitae magna luctus aliquam sit amet ut eros. Duis et viverra nulla, et mattis nunc." - Taylor R. Sept. 3rd'
			}
		]
	},
	{
		createdAt: NOW,
		id: 'bbc55a55-2e13-4322-a2c5-0fec1dabc79ee',
		message:
			'Shane M. has arrived! 💥 We also added more to this message to demo long alerts.',
		user: demoGuest,
		attachments: [
			{
				title: 'Membership level',
				value: 'Platinum'
			},
			{
				title: 'Total Points',
				value: 5302
			},
			{
				title: 'Visits',
				value: 5
			},
			{
				title: 'Idle chit-chat',
				value: 'A little'
			}
		]
	}
]} />`}</Pre>
				</Container>
				<H1>Training Guide</H1>
				<Container>
					<TrainingGuide
						onComplete={() => alert('Done!')}
						steps={[
							'This is a training guide.',
							'It "guides" you through many steps.',
							'One at a time',
							'and the last one shows a done.'
						]}
					/>
				</Container>
				<Container>
					<Onboarding
						heading={'Onboarding'}
						steps={[
							'This is an onboarding component.',
							'It has a heading.',
							'And "guides" you through the steps like the TrainingGuide.',
							'You can also change the label of the done button.',
							'Additionally, you can pass a boolean prop to say if onboarding has been completed.',
							'If the owner/teammate has done onboarding already, all of the messages will be displayed.'
						]}
						onComplete={this.didCompleteOnboarding}
						doneButtonLabel={'Finish'}
						onboardingComplete={this.props.onboarding.onboardingComplete}
					/>
					<Pre>
						{`<Onboarding
	heading={'Onboarding'}
	steps={[
		'This is an onboarding component.',
		'It has a heading',
		'And "guides" you through the steps like the TrainingGuide',
		'You can also change the label of the done button.',
		'Additionally, you can pass a boolean prop to say if onboarding has been completed.',
		'If the owner/teammate has done onboarding already, all of the messages will be displayed.'
	]}
	onComplete={this.didCompleteOnboarding}
	doneButtonLabel={'Finish'}
	onboardingComplete={this.props.onboarding.onboardingComplete}	
/>`}
					</Pre>
				</Container>
				<H1>Dialogs</H1>
				<Container>
					<BotText>
						Dialogs are always shown modally. So, you can use them as alerts,
						confirmation dialogs, popups, etc.
					</BotText>
					<List>
						<ListItem
							title="Showing as an alert"
							subtitle="You can drop in a button to hide it too"
							rightInput={
								<Button
									alt
									type="button"
									onClick={() => this.setState({ showAlert: true })}
								>
									Show Alert
								</Button>
							}
						/>
					</List>
					<Dialog show={this.state.showAlert}>
						<BotText>Use BotText to display any content in the alert.</BotText>
						<Button
							type="button"
							onClick={() => this.setState({ showAlert: false })}
						>
							Okay
						</Button>
					</Dialog>
					<Pre>{`<Dialog show={this.state.showAlert}>
	<BotText>Use BotText to display any content in the alert.</BotText>
	<Button
		type="button"
		onClick={() => this.setState({ showAlert: false })}
	>
		Okay
	</Button>
</Dialog>`}</Pre>
				</Container>
				<H1>Error</H1>
				<Container>
					<Button
						onClick={() =>
							this.setState({
								errorMessage: 'There was an error.  Please try again'
							})
						}
					>
						{'Show Error Message'}
					</Button>
					<Error
						errorMessage={this.state.errorMessage}
						closeErrorDialog={() => this.setState({ errorMessage: '' })}
						closeErrorDialogTxt={'Sounds good!'}
					/>
					<Pre>{`<Error
	errorMessage={this.state.errorMessage}
	closeErrorDialog={() => this.setState({ errorMessage: '' })}
	closeErrorDialogTxt={'Sounds good!'}
/>`}</Pre>
				</Container>
				<H1>Scroll To Method</H1>
				<Container>
					<BotText>
						{`This method allows the user to scroll to any position they want.  The default is to the top of the page, but the user can pass in a number or component using ReactDOM to find the ref's offsetTop as well`}
					</BotText>
					<Button
						onClick={() => {
							skill.scrollTo()
						}}
					>
						{'Default Scroll To Top'}
					</Button>
					<Pre>{`<Button
	onClick={() => {
		skill.scrollTo()
	}}
>
	{'Scroll To The Top'}
</Button>`}</Pre>
					<Button
						onClick={() => {
							skill.scrollTo(2600)
						}}
					>
						{'Scroll To A Number'}
					</Button>
					<Pre>{`<Button
	onClick={() => {
		skill.scrollTo(2550)
	}}
>
	{'Scroll To The Top'}
</Button>`}</Pre>
					<Button
						onClick={() => {
							skill.scrollTo(ReactDOM.findDOMNode(this.ref).offsetTop)
						}}
					>
						{'Scroll To The Buttons Section'}
					</Button>
					<Pre>{`<Button
	onClick={() => {
		skill.scrollTo(ReactDOM.findDOMNode(this.ref).offsetTop)
	}}
>
	{'Scroll To The Top'}
</Button>`}</Pre>
				</Container>
			</div>
		)
	}
}

export default withStore(Styleguide, {
	actions,
	reducers,
	config: { SERVER_HOST: 'https://example.com' }
})
