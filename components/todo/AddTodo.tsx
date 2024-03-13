import Button from '@mui/material/Button'
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { ChangeEvent, FormEvent } from 'react'

export default function AddTodoComponent({
  open,
  handleClose,
  onSubmit,
  handleChange,
  inputForm,
}: {
  open: boolean
  handleClose: () => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  inputForm: {
    _id: string
    type: string
    title: string
    description: string
  }
}): JSX.Element {
  let dialogTitle = 'Add Todo'
  if (inputForm.type === 'edit') {
    dialogTitle = 'Edit Todo'
  }

  return (
    <Dialog
      key={inputForm._id}
      open={open}
      PaperProps={{
        component: 'form',
        onSubmit: onSubmit,
      }}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          name="title"
          label="Title"
          type="text"
          fullWidth
          variant="standard"
          onChange={handleChange}
          value={inputForm.title}
        />
        <TextField
          required
          margin="dense"
          name="description"
          label="Description"
          fullWidth
          multiline
          rows={3}
          onChange={handleChange}
          value={inputForm.description}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">{inputForm.type === 'edit' ? 'Edit' : 'Add'}</Button>
      </DialogActions>
    </Dialog>
  )
}
