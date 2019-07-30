import getAll from './getAll/getAll.api'
import getOne from './getOne/getOne.api'
import getTipOfTheDay from './getTipOfTheDay/getTipOfTheDay.api'

export default {
	isNode: true,
	path: '/',
	apis: [
		getAll,
		getTipOfTheDay,
		getOne
	]
}
