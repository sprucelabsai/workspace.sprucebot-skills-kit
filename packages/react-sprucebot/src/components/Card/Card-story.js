// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react'
import { userList } from '../../../.storybook/data/people'
import Container from '../Layout/Container/Container'
import Card, { CardHeader, CardBody, CardFooter, CardBuilder } from './Card'
import List from '../List/List'
import { H3, Text, Anchor } from '../Text/Text'
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
		children: `<p>The Card Builder enables Skill devs to build cards using JSON. It should not be used for core cards.</p>`
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

stories.addDecorator(withKnobs)

stories
	.add('Critical Card', () => (
		<Container size="medium">
			<Card isCritical>
				<CardHeader
					title="Please update your credit card"
					labelText="Billing failure"
					labelIcon={<AlertIcon3 />}
				/>
				<CardBody>
					<Text className="u-lh-loose u-color-body-light">
						Two roads diverged in a wood, and I took the one less traveled by,
						And that has made all the difference.
					</Text>
				</CardBody>
				<CardFooter>
					<Button kind="secondary" text="Update credit card" />
				</CardFooter>
			</Card>
		</Container>
	))
	.add('Score Card', () => (
		<Container size="medium">
			<Card>
				<CardHeader
					title="Value of future appointments"
					actions={[
						{
							text: 'Go to reports'
						}
					]}
				/>
				<CardBody>
					<Text className="u-lh-loose u-color-body-light">
						Two roads diverged in a wood, and I took the one less traveled by,
						And that has made all the difference.
					</Text>
					<Scores
						scores={[
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
						]}
					/>
				</CardBody>
			</Card>
		</Container>
	))
	.add('People Card', () => (
		<Container size="medium">
			<Card>
				<CardHeader
					title="Your upcoming appointments"
					actions={[
						{
							text: 'View in calendar'
						}
					]}
				/>
				<CardBody>
					<List items={userList} />
					<Anchor href="#">+3 more today</Anchor>
				</CardBody>
			</Card>
		</Container>
	))
	.add('Person Card', () => (
		<Container size="medium">
			<Card isCentered>
				<CardHeader />
				<CardBody>
					<Avatar isLarge image={userImageLg} alt="Rosamund Mueleer" />
					<H3 className="card-header__title l-mb-xsmall">
						Say "Happy Birthday"
					</H3>
					<Text className="u-lh-loose u-color-body-light">
						It’s Rosamond Mueller’s birthday today. Don’t forget to say happy
						birthday!
					</Text>
				</CardBody>
				<CardFooter>
					<Button kind="secondary" text="Send a birthday message" isSmall />
				</CardFooter>
			</Card>
		</Container>
	))
	.add('Place Card', () => (
		<Container size="medium">
			<Card>
				<Image
					src="https://images.unsplash.com/photo-1535401991746-da3d9055713e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9fa1c73c0d29848a6e63595c588051ad&auto=format&fit=crop&w=720&h=360&q=80"
					width={720}
					height={360}
					className="l-mb-small"
				/>
				<CardBody>
					<H3>Les Basics</H3>
					<Text className="u-lh-loose u-color-body-light">
						101 Purdy Lakes, West Jordanmouth, NH 38827-6100
					</Text>
				</CardBody>
				<CardFooter>
					<Button kind="secondary" text="Book an appointment" />
				</CardFooter>
			</Card>
		</Container>
	))
	.add('Celebration Card', () => (
		<Container size="medium">
			<Card isCentered>
				<Image
					src="https://images.unsplash.com/photo-1499306215218-42e51ae058b2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6a6ae71facb70ced00bcbae8174ee47c&auto=format&fit=crop&w=720&h=360&q=80"
					width={720}
					height={360}
					className="l-mb-small"
				/>

				<CardBody>
					<H3>Congrats on 10k guests!</H3>
					<Text className="u-lh-loose u-color-body-light">
						I’ve learned that people will forget what you said, people will
						forget what you did, but people will never forget how you made them
						feel.
					</Text>
				</CardBody>
			</Card>
		</Container>
	))
	.add('To Do', () => (
		<Container size="medium">
			<Card>
				<CardHeader
					labelText={text('Label Text', '')}
					labelIcon={
						boolean('Label Icon', false) && (
							<LockIcon2 className="u-icon__no-fill u-icon__stroke" />
						)
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
					<Text className="u-lh-loose u-color-body-light">
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
		</Container>
	))
	.add('CardBuilder', () => (
		<Container size="medium">
			<CardBuilder {...cardJSON} />
		</Container>
	))
