import { Server } from './server'
import { Message } from './message'

const server = new Server()

server.use((message: Message, server: Server) => {
  console.log(message.text, 'first')
})

server.use((message: Message, server: Server) => {
  console.log(message.text, 'second', 'start')
  return new Promise(resolve => setTimeout(() => {
    console.log(message.text, 'second', 'finish')
    resolve()
  }, 300))
})

server.use((message: Message, server: Server) => {
  console.log(message.text, 'third', 'start')
  return new Promise(resolve => setTimeout(() => {
    console.log(message.text, 'third', 'finish')
    resolve()
  }, 300))
})

server.invoke(new Message('foo'))
server.invoke(new Message('bar'))
