import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router'
import { useAppDispatch } from '@/hooks/redux'
import { setUsername, setTitle, setSocket } from '@/redux/slices/canvas-slice'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { EnterSchema } from '@/schemas/enter'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { io } from 'socket.io-client'

export default function EnterBoardForm() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const form = useForm<z.infer<typeof EnterSchema>>({
    resolver: zodResolver(EnterSchema),
    defaultValues: { title: '', name: '' },
  })

  function onSubmit(values: z.infer<typeof EnterSchema>) {
    const socket = io(`${import.meta.env.VITE_SERVER_URL}`)
    dispatch(setSocket(socket))
    dispatch(setUsername(values.name))
    dispatch(setTitle(values.title))
    navigate(`/${values.title}`)
  }

  return (
    <Card className='w-[600px]'>
      <CardHeader>
        <CardTitle>Рисуйте с друзьями</CardTitle>
        <CardDescription>
          Спросите название доски у вашего знакомого и попадите к нему на доску
          или же, вы создадите новую доску на которую сможете пригласить друзей
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ваше имя</FormLabel>
                  <FormControl>
                    <Input placeholder='Иван' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название доски</FormLabel>
                  <FormControl>
                    <Input placeholder='Волшебный пони' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type='submit'>Войти</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
