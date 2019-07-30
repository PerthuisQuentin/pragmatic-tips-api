import TipsList from 'Data/tips'

const ONE_DAY_IN_MILLISECOND = 86400000

const getAll = () => TipsList

const getOne = id => TipsList[id - 1]

const getTipOfTheDay = () => {
	const dayNumber = Math.floor(Date.now() / ONE_DAY_IN_MILLISECOND)
	return TipsList[dayNumber % TipsList.length]
}

export default {
	getAll,
	getOne,
	getTipOfTheDay
}