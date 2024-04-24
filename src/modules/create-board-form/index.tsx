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
import {
  setUsername,
  setTitle as updateTitle,
} from '@/redux/slices/canvas-slice'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { useAppDispatch } from '@/hooks/redux'

export default function CreateBoardForm() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')

  const dispatch = useAppDispatch()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Создайте новую доску</CardTitle>
        <CardDescription>
          Введите имя пользователя чтобы создать новую доску на которую вы
          сможете пригласить друзей по уникальному ключу
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Ваше имя'
        />
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Название доски'
        />
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            if (title && name) {
              dispatch(updateTitle(title))
              dispatch(setUsername(name))
              navigate(`/${title}`)
            } else {
              return
            }
          }}
        >
          Создать
        </Button>
      </CardFooter>
    </Card>
  )
}
