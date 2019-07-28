import Express from 'express'

import Config from 'Config'

const server = Express()

server.get('/', (request, response) => {
	response.send('Hello World !')
})

server.listen(Config.port, () => {
	console.log(`Example app listening on port ${Config.port} !`)
})