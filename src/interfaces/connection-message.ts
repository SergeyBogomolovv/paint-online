import { User } from './user'

export interface ConnectionMessage {
  name: string
  users: User[]
}
