// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import {
	withKnobs,
	withKnobsOptions,
	text,
	boolean,
	object
} from '@storybook/addon-knobs/react'
import { onboarding } from '../../../.storybook/data/onboarding'
import { userList } from '../../../.storybook/data/people'
import Card, {
	CardHeader,
	CardBody,
	CardFooter,
	CardBuilder,
	OnboardingCard
} from './index'
import List from '../List/List'
import TextContainer from '../TextContainer/TextContainer'
import Page, { PageContent } from '../Page'
import Layout, { LayoutSection } from '../Layout'
import Text from '../Text/Text'
import Subheading from '../Subheading/Subheading'
import Image from '../Image/Image'
import { Scores } from './index'
import ContextMenu from '../ContextMenu/ContextMenu'
import Button from '../Button/Button'
import Avatar from '../Avatar/Avatar'
import userImageLg from '../../../static/assets/users/user-01--96w.png'
import LockIcon2 from '../../../static/assets/icons/Interface-Essential/Lock/Unlock/lock-6--16w.svg'
import AlertIcon3 from '../../../static/assets/icons/Interface-Essential/Alerts/alert-triangle--16w.svg'

const cardJSON = {
	header: {
		title: 'Introducing the Card Builder! (Note: WIP)',
		labelText: '',
		labelIcon: '',
		actions: [
			{
				type: 'button',
				text: 'More Info',
				href: '#',
				target: '_blank',
				isSmall: true
			}
		]
	},
	body: {
		children: `The Card Builder enables Skill devs to build cards using JSON. It should not be used for core cards.`
	},
	footer: {
		actions: [
			{
				type: 'button',
				text: 'Do things',
				kind: 'secondary',
				icon: '',
				isSmall: true
			}
		]
	}
}

const stories = storiesOf('Card', module)

stories.addDecorator(
	withKnobsOptions({
		escapeHTML: false
	})
)

stories.addDecorator(story => (
	<Page>
		<PageContent>
			<Layout>
				<LayoutSection>{story()}</LayoutSection>
			</Layout>
		</PageContent>
	</Page>
))

stories.addDecorator(withKnobs)

stories
	.add('Critical Card', () => (
		<Card isCritical>
			<CardHeader
				title={text('title', 'Please update your credit card')}
				labelText={text('labelText', 'Billing failure')}
				labelIcon={{ customIcon: AlertIcon3 }}
			/>
			<CardBody>
				<Text>
					Two roads diverged in a wood, and I took the one less traveled by, And
					that has made all the difference.
				</Text>
			</CardBody>
			<CardFooter>
				<Button kind="secondary" text="Update credit card" />
			</CardFooter>
		</Card>
	))
	.add('Score Card', () => (
		<Card>
			<CardHeader
				title={text('title', 'Value of future appointments')}
				actions={object('actions', [
					{
						text: 'Go to reports'
					}
				])}
			/>
			<CardBody>
				<Text>
					Two roads diverged in a wood, and I took the one less traveled by, And
					that has made all the difference.
				</Text>
				<Scores
					scores={object('scores', [
						{
							id: 1,
							label: 'Today',
							value: '$1,848'
						},
						{
							id: 2,
							label: 'This Week',
							value: '$5,778'
						},
						{
							id: 3,
							label: 'This Month',
							value: '$25,068'
						}
					])}
				/>
			</CardBody>
		</Card>
	))
	.add('People Card', () => (
		<Card>
			<CardHeader
				title={text('title', 'Your upcoming appointments')}
				actions={object('actions', [
					{
						text: 'View in calendar'
					}
				])}
			/>
			<CardBody>
				<List items={userList} />
				<a href="#" style={{ display: 'block' }}>
					+3 more today
				</a>
			</CardBody>
		</Card>
	))
	.add('Person Card', () => (
		<Card isCentered>
			<CardHeader />
			<CardBody>
				<Avatar isLarge image={userImageLg} alt="Rosamund Mueleer" />
				<TextContainer spacing="tight">
					<Subheading className="card-header__title" element="h3">
						Say "Happy Birthday"
					</Subheading>
					<Text>
						It’s Rosamond Mueller’s birthday today. Don’t forget to say happy
						birthday!
					</Text>
				</TextContainer>
			</CardBody>
			<CardFooter>
				<Button kind="secondary" text="Send a birthday message" isSmall />
			</CardFooter>
		</Card>
	))
	.add('Place Card', () => (
		<Card>
			<Image
				src="https://images.unsplash.com/photo-1535401991746-da3d9055713e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9fa1c73c0d29848a6e63595c588051ad&auto=format&fit=crop&w=720&h=360&q=80"
				width={720}
				height={360}
			/>
			<CardBody>
				<h3>Les Basics</h3>
				<Text>101 Purdy Lakes, West Jordanmouth, NH 38827-6100</Text>
			</CardBody>
			<CardFooter>
				<Button kind="secondary" text="Book an appointment" />
			</CardFooter>
		</Card>
	))
	.add('Celebration Card', () => (
		<Card isCentered>
			<Image
				src="https://images.unsplash.com/photo-1499306215218-42e51ae058b2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6a6ae71facb70ced00bcbae8174ee47c&auto=format&fit=crop&w=720&h=360&q=80"
				width={720}
				height={360}
			/>

			<CardBody>
				<h3>Congrats on 10k guests!</h3>
				<Text>
					I’ve learned that people will forget what you said, people will forget
					what you did, but people will never forget how you made them feel.
				</Text>
			</CardBody>
		</Card>
	))
	.add('To Do', () => (
		<Card>
			<CardHeader
				labelText={text('Label Text', '')}
				labelIcon={
					boolean('Label Icon', false) && {
						customIcon: LockIcon2,
						isLineIcon: true
					}
				}
				title={text('Title', 'Get the most out of Spruce')}
				actions={
					boolean('Header Action', false) && [
						{
							kind: 'simple',
							text: 'Go to team',
							isSmall: true
						}
					]
				}
				contextMenu={
					boolean('Header Context Menu', false) && (
						<ContextMenu
							actions={[{ text: 'One' }, { text: 'Two' }, { text: 'Three' }]}
						/>
					)
				}
			/>
			<CardBody>
				<Text>
					{text(
						'Body Copy',
						'Two roads diverged in a wood, and I took the one less traveled by, And that has made all the difference.'
					)}
				</Text>
			</CardBody>
			<CardFooter>
				<Button kind="secondary" text="Get some skills" isSmall />
			</CardFooter>
		</Card>
	))
	.add('Onboarding Card', () => <OnboardingCard {...onboarding} />)
	.add('CardBuilder', () => <CardBuilder {...object('json', cardJSON)} />)
