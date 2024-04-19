import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import CreateBoardForm from '@/modules/create-board-form'
import EnterBoardForm from '@/modules/enter-board-form'

export default function EnterPage() {
  return (
    <div className='flex items-center flex-col justify-center gap-y-10 h-[100svh] bg-blue-500'>
      <h1 className='text-6xl font-extrabold text-white'>
        Добро пожаловать в Paint Online!
      </h1>
      <Tabs defaultValue='create' className='w-[600px]'>
        <TabsList className='w-full'>
          <TabsTrigger className='w-full' value='create'>
            Создать доску
          </TabsTrigger>
          <TabsTrigger className='w-full' value='enter'>
            Войти в существующую
          </TabsTrigger>
        </TabsList>
        <TabsContent value='create'>
          <CreateBoardForm />
        </TabsContent>
        <TabsContent value='enter'>
          <EnterBoardForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
