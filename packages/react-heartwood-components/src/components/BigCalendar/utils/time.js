import memoize from 'memoize-one'
import moment from 'moment-timezone'

export default {
	generateTimeGutterHours: memoize(
		({ date, min, max, timezone, format = 'ha' }) => {
			const times = []

			const current = moment.tz(
				`${date.format('YYYY-MM-DD')} ${min}:00`,
				timezone
			)
			const end = moment.tz(`${date.format('YYYY-MM-DD')} ${max}:00`, timezone)

			do {
				times.push({
					label: current.format(format),
					date: current.toDate(),
					hour: parseInt(current.format('h'), 10),
					timestamp: parseInt(current.format('X'), 10)
				})

				current.add(1, 'hours')
			} while (current.toDate() < end.toDate())

			return times
		}
	)
}
