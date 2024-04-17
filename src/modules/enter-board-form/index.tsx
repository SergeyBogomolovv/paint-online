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
import { setSessionId, setUsername } from '@/redux/slices/canvas-slice'

export default function EnterBoardForm() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [name, setName] = useState('')
  const [key, setKey] = useState('')
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
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder='Ключ доски'
        />
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            dispatch(setSessionId(key))
            dispatch(setUsername(name))
            navigate(`/${key}`)
          }}
        >
          Войти
        </Button>
      </CardFooter>
    </Card>
  )
}
