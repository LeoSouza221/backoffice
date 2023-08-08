"use client"
import {forwardRef} from 'react'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { Snackbar } from '@mui/material'
import { SnackbarType } from './types'

interface ISnackbarAlertProps {
  open: boolean
  handleCloseSnackbar: () => void
  snackbarType: SnackbarType
  message: string
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})


export default function SnackbarAlert({ open, handleCloseSnackbar, snackbarType, message }: ISnackbarAlertProps) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
      <Alert onClose={handleCloseSnackbar} severity={snackbarType} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}
