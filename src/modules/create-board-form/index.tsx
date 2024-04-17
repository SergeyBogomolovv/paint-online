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
import { setSessionId, setUsername } from '@/redux/slices/canvas-slice'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { useAppDispatch } from '@/hooks/redux'
import { v4 as uuid } from 'uuid'

export default function CreateBoardForm() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
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
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            const id = uuid()
            dispatch(setSessionId(id))
            dispatch(setUsername(name))
            navigate(`/${id}`)
          }}
        >
          Создать
        </Button>
      </CardFooter>
    </Card>
  )
}
