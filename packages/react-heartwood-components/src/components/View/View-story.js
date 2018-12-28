// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react'
import StylesProvider from '../../../.storybook/StylesProvider'
import user01image from '../../../static/assets/users/user-01--96w.png'
import Page from '../Page/Page'
import PageHeader from '../Page/components/PageHeader/PageHeader'
import PageContent from '../Page/components/PageContent/PageContent'
import Layout, { LayoutSection } from '../../components/Layout'
import TextContainer from '../TextContainer/TextContainer'
import Text from '../Text/Text'
import Heading from '../Heading/Heading'
import Subheading from '../Subheading/Subheading'
import Icon from '../Icon/Icon'

import View from './View.js'

const ProvideStyles = storyFn => <StylesProvider>{storyFn()}</StylesProvider>

const stories = storiesOf('View', module)

stories.addDecorator(ProvideStyles)
stories.addDecorator(withKnobs)

const personalItems = [
	{
		text: 'Home',
		icon: { icon: 'home', className: 'sidebar-item__line-icon' },
		isCurrent: true,
		href: '#'
	},
	{
		text: 'Teams',
		icon: { icon: 'team', className: 'sidebar-item__line-icon' },
		isCurrent: false,
		href: '#'
	},
	{
		text: 'Notification Preferences',
		icon: { icon: 'messages', className: 'sidebar-item__line-icon' },
		isCurrent: false,
		href: '#'
	}
]

const orgItems = [
	{
		text: 'Organization Dashboard',
		icon: { icon: 'dashboard' },
		isCurrent: false,
		href: '#'
	},
	{
		text: 'Locations',
		icon: { icon: 'location' },
		isCurrent: true,
		href: '#'
	},
	{
		text: 'Team',
		icon: { icon: 'team' },
		href: '#'
	},
	{
		text: 'Skills',
		icon: { icon: 'skill' },
		href: '#'
	},
	{
		text: 'Settings',
		icon: { icon: 'settings' },
		href: '#'
	}
]

const user = {
	name: 'Madaline Gibson',
	image: user01image,
	tel: '(605) 230-5253'
}

const business = {
	name: 'Chimera Hair Salon',
	address: '7678 N High St, Denver, CO'
}

stories
	.add('Default', () => (
		<View
			STORYBOOKdoNotWrap
			sidebarItems={personalItems}
			user={user}
			business={business}
		>
			<Page>
				<PageHeader
					title="Hello Human"
					hasBottomBorder={boolean('hasBottomBorder', false)}
				/>
				<PageContent>
					<Layout>
						<LayoutSection>
							<TextContainer>
								<Heading>If you could time travel, what would you do?</Heading>
								<Text>
									Swimming hundreds of feet beneath the ocean’s surface in many
									parts of the world are prolific architects called giant
									larvaceans. These zooplankton are not particularly giant
									themselves (they resemble tadpoles and are about the size of a
									pinkie finger), but every day, they construct one or more
									spacious houses” that can exceed three feet in length. The
									houses are transparent mucus structures that encase the
									creatures inside. Giant larvaceans beat their tails to pump
									seawater through these structures, which filter tiny bits of
									dead or drifting organic matter for the animals to eat. When
									their filters get clogged, the larvaceans abandon ship and
									construct a new house. Laden with debris from the water
									column, old houses rapidly sink to the seafloor. In a study
									published in Science Advances on Wednesday, scientists near
									California’s Monterey Bay have found that, through this
									process, giant larvaceans can filter all of the bay’s water
									from about 300 to 1,000 feet deep in less than two weeks,
									making them the fastest known zooplankton filter feeders. In
									doing so, the creatures help transfer carbon that has been
									removed from the atmosphere by photosynthesizing organisms to
									the deep sea, where it can be buried and stored long term. And
									given their abundance in other parts of the world, these
									organisms likely play a crucial role in the global carbon
									cycle. When it comes to the flow of carbon in the ocean, we
									don’t know nearly as much as we should,” said Kakani Katija, a
									principal engineer at the Monterey Bay Aquarium Research
									Institute and the study’s lead author. If we really want to
									understand how the system works, we have to look at all the
									players involved. Giant larvaceans are one important group we
									need to learn more about.” In the past, other scientists have
									tried studying giant larvaceans in the laboratory. But these
									efforts always failed because the animals’ houses were too
									fragile to be harvested and collected specimens were never
									able to build houses outside the ocean.To study the
									zooplankton in their natural habitat, Dr. Katija and her
									collaborators developed a new deep-sea imaging instrument,
									called DeepPIV, which they paired with a remotely operated
									vehicle. DeepPIV projects a sheet of laser light that cuts
									straight through a larvacean’s mucus house. A high-definition
									camera on the remotely operated vehicle can then capture the
									inner pumping mechanisms illuminated by the laser.
								</Text>

								<Heading>
									Blazeon Scrambles to Police Content Amid Rapid Growth
								</Heading>
								<Subheading>Do you like roller coasters?</Subheading>
								<Text>
									The recording starts with the patter of a summer squall.
									Later, a drifting tone like that of a not-quite-tuned-in radio
									station rises and for a while drowns out the patter. These are
									the sounds encountered by NASA’s Cassini spacecraft as it dove
									through the gap between Saturn and its innermost ring on April
									26, the first of 22 such encounters before it will plunge into
									Saturn’s atmosphere in September. What Cassini did not detect
									were many of the collisions of dust particles hitting the
									spacecraft as it passed through the plane of the rings. You
									can hear a couple of clicks,” said William S. Kurth, a
									research scientist at the University of Iowa who is the
									principal investigator for Cassini’s radio and plasma science
									instrument. The few dust hits that were recorded sounded like
									the small pops caused by dust on a LP record, he said. What he
									had expected was something more like the din of driving
									through Iowa in a hailstorm,” Dr. Kurth said. Since Cassini
									had not passed through this region before, scientists and
									engineers did not know for certain what it would encounter.
									Cassini would be traveling at more than 70,000 miles per hour
									as it passed within 2,000 miles of the cloud tops, and a
									chance hit with a sand grain could be trouble. The analysis
									indicated that the chances of such a collision were slim, but
									still risky enough that mission managers did not send Cassini
									here until the mission’s final months. As a
									better-safe-than-sorry precaution, the spacecraft was pointed
									with its big radio dish facing forward, like a shield. Not
									only was there nothing catastrophic, there was hardly anything
									at all. The few clicking sounds were generated by dust the
									size of cigarette smoke particles about a micron, or
									one-25,000th of an inch, in diameter. To be clear: Cassini did
									not actually hear any sounds. It is, after all, flying through
									space where there is no air and thus no vibrating air
									molecules to convey sound waves. But space is full of radio
									waves, recorded by Dr. Kurth’s instrument, and those waves,
									just like the ones bouncing through the Earth’s atmosphere to
									broadcast the songs of Bruno Mars, Beyoncé and Taylor Swift,
									can be converted into audible sounds. Dr. Kurth said the
									background patter was likely oscillations of charged particles
									in the upper part of Saturn’s ionosphere where atoms are
									broken apart by solar and cosmic radiation. The louder tones
									were almost certainly whistler mode emissions” when the
									charged particles oscillate in unison.
								</Text>

								<Subheading>How many pairs of shoes do you own?</Subheading>
								<Text>
									MIAMI — For decades, South Florida schoolchildren and adults
									fascinated by far-off galaxies, earthly ecosystems, the
									properties of light and sound and other wonders of science had
									only a quaint, antiquated museum here in which to explore
									their interests. Now, with the long-delayed opening of a vast
									new science museum downtown set for Monday, visitors will be
									able to stand underneath a suspended, 500,000-gallon aquarium
									tank and gaze at hammerhead and tiger sharks, mahi mahi, devil
									rays and other creatures through a 60,000-pound oculus, a lens
									that will give the impression of seeing the fish from the
									bottom of a huge cocktail glass. And that’s just one of many
									attractions and exhibits. Officials at the $305 million
									Phillip and Patricia Frost Museum of Science promise that it
									will be a vivid expression of modern scientific inquiry and
									exposition. Its opening follows a series of setbacks and
									lawsuits and a scramble to finish the 250,000-square-foot
									structure. At one point, the project ran precariously short of
									money. The museum’s high-profile opening is especially
									significant in a state imperiled by rising sea levels and
									overseen by a governor, Rick Scott, who has said he is
									unconvinced that climate change and global warming are real
									and whose administration is widely reported to have set an
									unwritten policy that state agencies refrain from using the
									terms. The problem is not that people don’t believe in
									science, but that they pick and choose which science they want
									to believe,” Frank Steslow, a microbiologist appointed a year
									ago as the museum’s president, said on a recent morning while
									walking around the four-acre site. I don’t know that we need
									to do anything other than be who we are and present the facts
									and be a resource for everybody.” As workers swarmed over the
									site — near the Pérez Art Museum Miami and the Adrienne Arsht
									Center for the Performing Arts — Mr. Steslow pointed to
									interactive exhibits about the fragile South Florida
									ecosystem, including one on the vast but shrinking Everglades
									wetlands, and the varied animal species, many of them
									endangered, that call the region home.
								</Text>

								<Heading>
									As Hulu Live Is Introduced, a Look at TV Streaming Services
								</Heading>
								<Text>
									Mauna Loa, the biggest volcano on Earth — and one of the most
									active — covers half the Island of Hawaii. Just 35 miles to
									the northeast, Mauna Kea, known to native Hawaiians as Mauna a
									Wakea, rises nearly 14,000 feet above sea level. To them it
									represents a spiritual connection between our planet and the
									heavens above. These volcanoes, which have beguiled millions
									of tourists visiting the Hawaiian islands, have also plagued
									scientists with a long-running mystery: If they are so close
									together, how did they develop in two parallel tracks along
									the Hawaiian-Emperor chain formed over the same hot spot in
									the Pacific Ocean — and why are their chemical compositions so
									different? We knew this was related to something much deeper,
									but we couldn’t see what,” said Tim Jones, an earth science
									Ph.D. student at Australian National University and the lead
									author of a paper published in Nature on Wednesday that may
									hold the answer. Mr. Jones and his colleagues developed a
									model that simulates what’s happening in our planet’s mantle,
									beneath the crust that we live on, offering a window to the
									center of the Earth — or close to it. Their study may one day
									allow a reconstruction of the history of the movement of
									Earth’s plates — and the processes linked to these movements
									over billions of years, like mass extinction events, diamond
									and oil deposits, and changes in climate. If you were to drill
									nearly 4,000 miles into the Earth, you’d reach its core, a
									ball of solid iron surrounded by liquid that scientists
									estimate is hotter than the sun. Before making it there, you’d
									hit the mantle — an 1,800-mile-thick layer of solid rock that
									can flow like a liquid, just substantially slower. This mantle
									is the reason plates move across the surface. It’s why we have
									continents, earthquakes and volcanoes. The closest anyone ever
									got to the mantle was a seven-mile-deep hole drilled into the
									crust on a peninsula in western Russia. But now we can better
									understand what’s happening below by looking at Mauna Kea and
									Mauna Loa, said Mr. Jones. The prevailing hypothesis has been
									that volcanoes like these two in Hawaii are chemical
									fingerprints of the Earth’s composition at the deep mantle,
									just at the border of its core. Scientists have seismic
									evidence that the deep part of the mantle is a graveyard where
									long ago slabs of earth were subducted, or thrust underneath
									one another, creating separate regions with different chemical
									compositions that eventually made their way to the surface in
									a hot mantle plume, or upwelling, as the core heated the rock
									into magma.But that didn’t explain the separate tracks along
									which the volcanoes formed. By examining data from the two
									volcanoes, Mr. Jones and his team suggested an alternative:
									The chemical signature, along with this double-track volcanism
									as it’s called, occurred three million years ago when the
									plates above the hot spot shifted direction, moving north.
									This shimmy rearranged zones of magma that are heated under
									different pressures in the shallower part of the mantle — when
									they cool, the volcanic rock that results reflects this
									difference. Previously stacked on top of one another, the
									movement of the plates exposed now geographically separates
									magma zones that fed the volcanoes individually.
								</Text>
							</TextContainer>
						</LayoutSection>
					</Layout>
				</PageContent>
			</Page>
		</View>
	))
	.add('Skill View', () => (
		<View
			STORYBOOKdoNotWrap
			sidebarItems={orgItems}
			user={user}
			business={business}
			isSidebarExpanded
		>
			<Page
				pageHeader={{
					title: 'Chimera Hair Salon at the Point',
					primaryAction: {
						text: 'Go to location dashboard',
						icon: { name: 'new_tab' },
						kind: 'simple'
					}
				}}
			/>
		</View>
	))
