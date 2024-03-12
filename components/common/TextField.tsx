import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput'
import MuiTextField, { TextFieldProps } from '@mui/material/TextField'
import { TypographyProps } from '@mui/material/Typography'
import { useState } from 'react'

import theme from '@/lib/theme'

interface AdditionalProps {
  mt?: TypographyProps['mt']
  isPassword?: boolean
}

type ExtendedTextFieldProps = TextFieldProps & OutlinedInputProps & AdditionalProps

export default function TextField({ mt, sx, isPassword, ...receiveProps }: ExtendedTextFieldProps): JSX.Element {
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = (): void => setShowPassword((show) => !show)

  return !isPassword ? (
    <MuiTextField
      variant="outlined"
      {...receiveProps}
      sx={{
        mt,
        '& .Mui-error .MuiOutlinedInput-notchedOutline': { borderWidth: 1.5 },
        ...sx,
      }}
    />
  ) : (
    <FormControl variant="outlined" sx={{ mt }}>
      <InputLabel
        color={receiveProps.error ? 'error' : undefined}
        sx={{ '&.MuiFormLabel-colorError': { color: theme.palette.error.main } }}
      >
        {receiveProps.label}
      </InputLabel>
      <OutlinedInput
        type={showPassword ? 'text' : 'password'}
        {...receiveProps}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleClickShowPassword} edge="end">
              {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
            </IconButton>
          </InputAdornment>
        }
        sx={{
          '&.Mui-error .MuiOutlinedInput-notchedOutline': { borderWidth: 1.5 },
          ...sx,
        }}
      />
    </FormControl>
  )
}
