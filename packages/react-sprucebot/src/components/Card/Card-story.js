// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean } from '@storybook/addon-knobs/react'
import { userList } from '../../../.storybook/data/people'
import Container from '../Layout/Container/Container'
import Card, { CardHeader, CardBody, CardFooter, CardBuilder } from './Card'
import List from '../List/List'
import { Anchor } from '../Text/Text'
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
					<p>
						{text(
							'Body Copy',
							'Two roads diverged in a wood, and I took the one less traveled by, And that has made all the difference.'
						)}
					</p>
				</CardBody>
				<CardFooter>
					<Button kind="secondary" text="Get some skills" isSmall />
				</CardFooter>
			</Card>
		</Container>
	))
	.add('Critical Card', () => (
		<Container size="medium">
			<Card isCritical>
				<CardHeader
					title="Please update your credit card"
					labelText="Billing failure"
					labelIcon={<AlertIcon3 />}
				/>
				<CardBody>
					Two roads diverged in a wood, and I took the one less traveled by, And
					that has made all the difference.
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
					<p>
						Two roads diverged in a wood, and I took the one less traveled by,
						And that has made all the difference.
					</p>
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
	.add('With a Header Action', () => (
		<Container size="medium">
			<Card>
				<CardHeader
					title="Add your teammates"
					actions={[
						{
							kind: 'simple',
							text: 'Go to team',
							isSmall: true
						}
					]}
				/>
				<CardBody>
					Whatever you can do, or dream you can, begin it. Boldness has genius,
					power and magic in it.
				</CardBody>
				<CardFooter>
					<Button kind="primary" text="Add teammates" isSmall />
				</CardFooter>
			</Card>
		</Container>
	))
	.add('With a Context Menu', () => (
		<Container size="medium">
			<Card>
				<CardHeader
					title="Add your teammates"
					contextMenu={
						<ContextMenu
							actions={[{ text: 'One' }, { text: 'Two' }, { text: 'Three' }]}
						/>
					}
				/>
				<CardBody>
					<p>
						Two roads diverged in a wood, and I took the one less traveled by,
						And that has made all the difference.
					</p>
				</CardBody>
				<CardFooter>
					<Button kind="secondary" text="Get some teammates" isSmall />
				</CardFooter>
			</Card>
		</Container>
	))
	.add('With a Label', () => (
		<Container size="medium">
			<Card>
				<CardHeader
					labelText="Private"
					labelIcon={<LockIcon2 className="u-icon__no-fill u-icon__stroke" />}
					contextMenu={
						<ContextMenu
							actions={[{ text: 'One' }, { text: 'Two' }, { text: 'Three' }]}
						/>
					}
				/>
				<CardBody>
					<p>
						Unapologetic travel nerd. Professional entrepreneur. Explorer. Bacon
						buff. Proud communicator. Introvert. Avid writer.
					</p>
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
					<h3 className="card-header__title l-mb-xsmall">
						Say "Happy Birthday"
					</h3>
					<p>
						It’s Rosamond Mueller’s birthday today. Don’t forget to say happy
						birthday!
					</p>
				</CardBody>
				<CardFooter>
					<Button kind="secondary" text="Send a birthday message" isSmall />
				</CardFooter>
			</Card>
		</Container>
	))
	.add('CardBuilder', () => (
		<Container size="medium">
			<CardBuilder {...cardJSON} />
		</Container>
	))
