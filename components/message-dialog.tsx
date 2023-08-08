"use client"
import * as React from 'react'
import { IconButton, DialogTitle, Dialog, Box, Typography, Grid, DialogContent, DialogContentText } from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'

export interface IMessageDialogProps {
  selectedValue: string
}

export default function MessageDialog({ selectedValue }: IMessageDialogProps) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Box>
      <Grid container spacing={2} sx={{ alignItems: 'center' }}>
        <Grid item xs={10}>
          <Typography variant="body2" sx={{ wordBreak: 'break-word', whiteSpace: 'normal' }}>
            {selectedValue.length > 300 ? `${selectedValue.substring(0, 300)}...` : selectedValue}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          {selectedValue.length >= 50 && (
            <IconButton onClick={handleClickOpen}>
              <VisibilityIcon />
            </IconButton>
          )}
        </Grid>
      </Grid>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Mensagem completa</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {selectedValue}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  )
}