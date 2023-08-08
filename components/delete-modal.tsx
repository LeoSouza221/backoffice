'use client'
import {
  Button,
  Box,
  Grid,
  DialogContent,
  Dialog,
  Typography
} from '@mui/material'

interface IUserFormProps {
  open: boolean
  isLoading: boolean
  handleDelete: () => void
  handleOpenClose: () => void
}

export default function DeleteModal({ handleOpenClose, handleDelete, isLoading, open }: IUserFormProps) {
  return (
    <Dialog onClose={handleOpenClose} open={open}>
      <DialogContent>
        <Grid item xs={11} sm={8} md={5}>
          <Box>
            <Typography variant="h6" gutterBottom align="center">
              Tem certeza que deseja excluir este item?
            </Typography>
            <Typography variant="body2" align="center">
              Essa alteração é permanente e não é possível desfazer
            </Typography>
          </Box>
          <Box
            sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}
          >
            <Button
              variant="contained"
              color="error"
              disabled={isLoading}
              onClick={() => handleOpenClose()}
              sx={{ marginRight: '4px' }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="success"
              disabled={isLoading}
              onClick={handleDelete}
            >
              OK
            </Button>
          </Box>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
