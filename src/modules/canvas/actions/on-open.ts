export const onSocketOpen = (
  socket: WebSocket,
  id: string,
  username: string
) => {
  socket.onopen = () => {
    socket.send(
      JSON.stringify({
        id,
        username,
        method: 'connection',
      })
    )
  }
}
