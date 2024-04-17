export interface Message<T> {
  method: 'draw' | 'connection'
  id: string
  figure: T
  username?: string
}
