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
import { useState } from 'react'
import { useAppDispatch } from '@/hooks/redux'
import {
  setUsername,
  setTitle as updateTitle,
} from '@/redux/slices/canvas-slice'

export default function EnterBoardForm() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  return (
    <Card>
      <CardHeader>
        <CardTitle>Рисуйте с друзьями</CardTitle>
        <CardDescription>
          Попросите ключ доступа у вашего друга и попадите к нему на доску
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
          Войти
        </Button>
      </CardFooter>
    </Card>
  )
}
