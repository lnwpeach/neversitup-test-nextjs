import LoadingButton from '@mui/lab/LoadingButton'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Unstable_Grid2'
import { useRouter } from 'next/router'
import { ChangeEvent, KeyboardEvent, useState } from 'react'

import TextField from '@/components/common/TextField'
import { fetchWithTimeout } from '@/utils/common/fetchWithTimeout'
import { useAuth } from '@/utils/hook/useAuth'
import { BASE_URL } from '@/utils/constants'

interface LoginResponse {
  message?: string
  token: string
}

export default function LoginComponent(): JSX.Element {
  const router = useRouter()
  const { signIn } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [input, setInput] = useState({
    username: { value: '', isValid: true },
    password: { value: '', isValid: true },
    errMsg: '',
  })
  const { username, password } = input

  const handleKeyUp = (e: KeyboardEvent): void => {
    if (e.key === 'Enter' || e.code === 'NumpadEnter') handleSubmit()
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target
    setInput((prev) => ({ ...prev, [name]: { value, isValid: true }, errMsg: '' }))
  }
  const handleSubmit = async (): Promise<any> => {
    // Clear error mssage and set defalut valid
    setInput((prev) => ({
      ...prev,
      username: { value: username.value, isValid: true },
      password: { value: password.value, isValid: true },
      errMsg: '',
    }))

    // Validate input
    if (!username.value && !password.value) {
      return setInput((prev) => ({
        ...prev,
        username: { value: '', isValid: false },
        password: { value: '', isValid: false },
        errMsg: 'Please fill username or password field',
      }))
    } else if (!username.value) {
      return setInput((prev) => ({
        ...prev,
        username: { value: '', isValid: false },
        errMsg: 'Please fill username or password field',
      }))
    } else if (!password.value) {
      return setInput((prev) => ({
        ...prev,
        password: { value: '', isValid: false },
        errMsg: 'Please fill username or password field',
      }))
    }

    // Fetch login API get user data
    setIsLoading(true)
    const resp = await fetchWithTimeout<LoginResponse>(`${BASE_URL}/users/auth`, {
      method: 'POST',
      body: JSON.stringify({ username: username.value, password: password.value }),
    })
    setIsLoading(false)

    // Validate response
    if (resp?.message === 'Invalid username or password') {
      return setInput((prev) => ({
        ...prev,
        username: { value: username.value, isValid: false },
        password: { value: password.value, isValid: false },
        errMsg: 'Invalid username or password',
      }))
    } else if (!resp?.token) {
      return setInput((prev) => ({
        ...prev,
        username: { value: username.value, isValid: true },
        password: { value: password.value, isValid: true },
        errMsg: 'Cannot connect to server',
      }))
    }

    // Save token
    signIn(resp.token)
    router.push('/todo')
  }

  return (
    <Container maxWidth="lg" sx={{ px: '1.5rem !important' }}>
      <Stack
        justifyContent="center"
        alignItems="center"
        minHeight="calc(100dvh - 68px)"
        pt={{ xs: '16px', sm: '68px', md: '44px' }}
        gap={7}
      >
        <Grid container width={1} maxWidth="1044px" p={{ xs: 6, sm: 4 }} bgcolor="white" borderRadius={2} boxShadow={2}>
          <Grid xs={12} sm={12} position="relative" display="flex" alignItems="center" justifyContent="center">
            <Stack width={{ xs: 1, sm: 'auto', md: '350px' }} px={{ xs: 0, sm: 8 }} py={{ xs: 0, sm: 10 }}>
              <Typography fontSize={{ xs: 20, md: 24 }} fontWeight={600} display={{ sm: 'flex' }}>
                Sign in
              </Typography>

              <TextField
                id="login-input_username"
                name="username"
                label="Username"
                value={username.value}
                error={!username.isValid}
                mt={{ xs: 0, sm: 4, md: 4 }}
                onKeyUp={handleKeyUp}
                onChange={handleChange}
              />

              <TextField
                id="login-input_password"
                name="password"
                label="Password"
                value={password.value}
                error={!password.isValid}
                isPassword
                mt={{ xs: 3, sm: 4 }}
                onKeyUp={handleKeyUp}
                onChange={handleChange}
              />

              {input.errMsg && (
                <Typography color="error" mt={4}>
                  {input.errMsg}
                </Typography>
              )}

              <LoadingButton
                id="login-btn_submit"
                loading={isLoading}
                loadingPosition="end"
                variant="contained"
                sx={{ height: 48, mt: 4, fontWeight: 600 }}
                onClick={handleSubmit}
              >
                Sign in
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  )
}
