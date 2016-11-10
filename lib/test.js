
// @flow

type ChainFunction = (message: Message, data: mixed) => mixed


const text = Symbol('text')
class Message {

  [text]: string

  constructor(messageText: string) {
    this[text] = messageText
  }

  text(): string {
    return this[text]
  }
}

class Scope {
  _chain: Array<ChainFunction>

  chain(...functors: Array<ChainFunction>): Scope {
    this._chain = functors.concat([])
    return this
  }

  invoke(message: Message): Scope {
    const last = this._chain.reduce((data, fn) => fn(message, data) || data, {})
    console.log(';last', last)
    return this
  }
}


// Custom code

const scope = new Scope
scope.chain(
  test(),
  hello('foo')
)
.invoke(new Message('reason'))



function hello(name: string) {
  return (message: Message, data) => {
    console.log(name, message.text(), data)
    return Object.assign({}, data, { name })
  }
}

function test() {
  return (message: Message, data) => {
    console.log('[[test]]', message, data)
    return Object.assign({}, data, { test: true })
  }
}
