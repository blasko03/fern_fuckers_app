import { SERVER_ADDRESS } from './serverData'

export class EventSourceListner {
  lastEvent: string | undefined
  lastRequestedEvent: string | undefined
  eventSource: EventSource | undefined
  id: string
  onMessageAction: any

  constructor (id: string, lastEvent: string, onMessageAction: any) {
    this.id = id
    this.onMessageAction = onMessageAction
    this.lastEvent = lastEvent
    this.connectToEventSource()
  }

  updateLastEvent (lastEvent: string): void {
    this.lastEvent = lastEvent
  }

  onMessage = (event: MessageEvent<any>): void => {
    const data = event.data
    if (data !== '') {
      this.onMessageAction(JSON.parse(event.data))
    }
  }

  onError = (): void => {
    if (this.lastEvent !== this.lastRequestedEvent) {
      this.eventSource?.close()
      this.connectToEventSource()
    }
  }

  connectToEventSource = (): void => {
    this.eventSource = new EventSource(`${SERVER_ADDRESS}/api/match/${this.id}/matchEvents?lastEvent=${this.lastEvent}`)
    this.eventSource.onmessage = this.onMessage
    this.eventSource.onerror = this.onError
    this.lastRequestedEvent = this.lastEvent
  }
}
