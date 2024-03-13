import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import { useApi } from '@/utils/hook/userApi'
import { BASE_URL } from '@/utils/constants'
import { Button, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddTodoComponent from './AddTodo'
import { useRouter } from 'next/router'

export interface TodoType {
  _id: string
  title: string
  description: string
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

export default function TodoComponent(): JSX.Element {
  const router = useRouter()
  const myFetch = useApi()
  const [todoList, setTodoList] = useState<TodoType[]>([])
  const [openAddTodo, setOpenAddTodo] = useState<boolean>(false)
  const [inputAddTodo, setInputAddTodo] = useState({ _id: '', type: '', title: '', description: '' })

  async function getTodoList(): Promise<any> {
    const response = await myFetch(`${BASE_URL}/todos`)

    try {
      if (response.message === 'Unauthorized') {
        router.push('/logout')
      }
      if (response.length > 0) {
        setTodoList(response)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getTodoList()
  }, [])

  const handleClickOpen = () => {
    setOpenAddTodo(true)
  }

  const handleClose = () => {
    setOpenAddTodo(false)
    setInputAddTodo({ _id: '', type: '', title: '', description: '' })
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setInputAddTodo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const onSumbit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (inputAddTodo.type !== 'edit') {
      const response = await myFetch(`${BASE_URL}/todos`, {
        method: 'POST',
        body: JSON.stringify({
          title: inputAddTodo.title,
          description: inputAddTodo.description,
        }),
      })

      try {
        console.log(response.message === 'Unauthorized')
        if (response.message === 'Unauthorized') {
          router.push('/logout')
        }
        setTodoList((prev) => [
          ...prev,
          {
            _id: response._id,
            title: response.title,
            description: response.description,
          },
        ])
      } catch (error) {
        console.error(error)
      }
    } else {
      const response = await myFetch(`${BASE_URL}/todos/${inputAddTodo._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: inputAddTodo.title,
          description: inputAddTodo.description,
        }),
      })

      try {
        if (response.message === 'Unauthorized') {
          router.push('/logout')
        }
        getTodoList()
      } catch (error) {
        console.error(error)
      }
    }

    handleClose()
  }

  const editTodo = (todo: TodoType) => {
    setInputAddTodo({
      _id: todo._id,
      type: 'edit',
      title: todo.title,
      description: todo.description,
    })
    handleClickOpen()
  }

  const deleteTodo = async (event: any, id: string) => {
    event.stopPropagation()
    if (!confirm('Are you sure?')) {
      return
    }

    const response = await myFetch(`${BASE_URL}/todos/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({
        title: inputAddTodo.title,
        description: inputAddTodo.description,
      }),
    })

    try {
      if (response.message === 'Unauthorized') {
        router.push('/logout')
      }
      getTodoList()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Box sx={{ maxWidth: 'sm', width: '600px', mt: 2 }}>
        <Stack spacing={3}>
          {todoList.map((v) => {
            return (
              <Item
                sx={{
                  cursor: 'pointer',
                  height: '35px',
                  fontSize: '18px',
                }}
                key={v._id}
                onClick={() => {
                  editTodo(v)
                }}
              >
                <Stack justifyContent="space-between" direction="row" sx={{ width: '100%', pl: 4 }}>
                  {v.title}
                  <IconButton
                    aria-label="delete"
                    size="small"
                    sx={{ float: 'right' }}
                    onClick={(event) => {
                      deleteTodo(event, v._id)
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </Item>
            )
          })}
        </Stack>
      </Box>
      <Button variant="contained" sx={{ my: 4 }} onClick={handleClickOpen}>
        Add Todo
      </Button>

      <AddTodoComponent
        open={openAddTodo}
        handleClose={handleClose}
        onSubmit={onSumbit}
        handleChange={handleChange}
        inputForm={inputAddTodo}
      />
    </Box>
  )
}
