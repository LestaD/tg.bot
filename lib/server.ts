import isPromise = require('is-promise')
import { Message } from './message'

type ServerMiddleware = (message: Message, server: Server) => Promise<void>|void

export class Server {
  private middlewares: Array<ServerMiddleware> = []

  use(middleware: ServerMiddleware): void {
    this.middlewares.push(middleware)
  }

  invoke(message: Message): void {
    const iterator: IterableIterator<ServerMiddleware> = this.middlewares[Symbol.iterator]()

    function next() {
      const { value, done } = iterator.next()
      if (!done) {
        const result = value(message, this)

        if (isPromise(result)) {
          result.then(() => next())
        }
        else next()
      }
    }
    next()
  }
}
