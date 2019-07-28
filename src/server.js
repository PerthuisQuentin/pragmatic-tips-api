import Express from 'express'

const server = Express()

server.get('/', (request, response) => {
	response.send('Hello World !')
})

server.listen(3000, () => {
	console.log('Example app listening on port 3000 !')
})