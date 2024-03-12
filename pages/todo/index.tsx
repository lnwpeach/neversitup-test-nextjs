import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useApi } from '@/utils/hook/userApi';
import { BASE_URL } from '@/utils/constants';

export interface TodoType {
  _id: string,
  title: string,
  description: string,
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function TodoList() {
  const myFetch = useApi()
  const [todoList, setTodoList] = useState<TodoType[]>([])

  async function getTodoList(): Promise<any> {
    const response = await myFetch(`${BASE_URL}/todos`)

    try {
      if(response.length > 0) {
        setTodoList(response)
      }
    } catch (error) {}
  }

  useEffect(() => {
    getTodoList()
  }, [])

  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        {todoList.map((v, i) => {
          return <Item key={v._id}>{v.title}</Item>
        })}
      </Stack>
    </Box>
  );
}