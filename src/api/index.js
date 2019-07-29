import getAll from './getAll/getAll.api'
import getOne from './getOne/getOne.api'

export default {
	isNode: true,
	path: '/',
	apis: [
		getAll,
		getOne
	]
}
