
export class Message {
  private messageText: string = ''

  constructor(message: string) {
    this.messageText = message
  }

  get text() {
    return this.messageText
  }
}
