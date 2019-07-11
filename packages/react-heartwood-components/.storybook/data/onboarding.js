import TeamIcon from '../../static/assets/icons/Users/Geometric-Close-Up-Single-User-Neutral/single-neutral-id-card-3.svg'
import LocationIcon from '../../static/assets/icons/Maps-Navigation/Pins/pin.svg'
import LaunchIcon from '../../static/assets/icons/Transportation/Aircraft/aircraft-military-plane.svg'
import CheckIcon from '../../static/assets/icons/Interface-Essential/Form-Validation/check-circle-1.svg'

export const onboarding = {
	title: 'Keep the ball rolling!',
	steps: [
		{
			id: '1',
			isComplete: true,
			tabTitle: 'Add your first location',
			tabIcon: { name: 'check_circle' },
			panelTitle: 'Add your first location',
			panelCopy:
				'Whatever you can do, or dream you can, begin it. Boldness has genius, power and magic in it. –Johann Wolfgang von Goethe',
			panelCTA: {
				text: 'Add your location'
			}
		},
		{
			id: '2',
			tabTitle: 'Set up your team',
			tabIcon: { name: 'location', isLineIcon: true },
			panelTitle: 'Add your teammates and their info',
			panelCopy:
				'Whatever you can do, or dream you can, begin it. Boldness has genius, power and magic in it. –Johann Wolfgang von Goethe',
			panelCTA: {
				text: 'Add teammates'
			}
		},
		{
			id: '3',
			tabIcon: { name: 'launch', isLineIcon: true },
			tabTitle: 'Go live',
			panelTitle: 'Go live and start welcoming guests',
			panelCopy:
				'Whatever you can do, or dream you can, begin it. Boldness has genius, power and magic in it. –Johann Wolfgang von Goethe',
			panelCTA: {
				text: 'Go live'
			}
		}
	]
}
