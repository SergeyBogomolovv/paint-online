import { useAppSelector } from '@/hooks/redux'
import { cn } from '@/lib/utils'

export default function ConnectUsers() {
  const { connectedUsers, socket } = useAppSelector((state) => state.canvas)
  return (
    <div className='container my-4 flex items-center text-white gap-4'>
      <p className='text-xl font-bold'>Сейчас рисуют:</p>
      {connectedUsers.map((user) => (
        <p
          className={cn(
            'text-sm py-2 px-3 bg-[#2f54eb] rounded-xl font-bold tracking-wide',
            socket?.id === user.id && 'bg-green-600'
          )}
          key={user.id}
        >
          {user.name}
        </p>
      ))}
    </div>
  )
}
