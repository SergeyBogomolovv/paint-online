import EnterBoardForm from '@/modules/enter-board-form'

export default function EnterPage() {
  return (
    <div className='flex items-center flex-col justify-center gap-y-10 h-[100svh] bg-stone-800'>
      <h1 className='text-6xl font-extrabold text-white'>
        Добро пожаловать в Paint Online!
      </h1>
      <EnterBoardForm />
    </div>
  )
}
