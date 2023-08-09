'use client'
import { useState } from 'react'
import Image from 'next/image'
import {
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useRouter } from 'next/navigation'
import SnackbarAlert from '@/components/snackbar-alert/'
import { SnackbarType } from '@/components/snackbar-alert/types'

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Digite um email válido')
    .required('Email é obrigatório'),
  password: yup.string().required('Senha é obrigatório'),
})

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpenSnackbar] = useState(false)
  const [snackbarType, setSnackbarType] = useState<SnackbarType>('success')
  const message = 'Email ou senha incorretos'
  const router = useRouter()

  const setLogged = async () => {
    localStorage.setItem('isLogged', 'true')

    redirectToMainPage()
  }

  const redirectToMainPage = () => {
    router.push('/')
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setIsLoading(true)

      setTimeout(() => {
        setLogged()

        setIsLoading(false)
      }, 2000)
    },
  })

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpenSnackbar(false)
  }

  return (
    <Grid
      container
      component="main"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CssBaseline />
      <SnackbarAlert
        open={open}
        snackbarType={snackbarType}
        handleCloseSnackbar={handleCloseSnackbar}
        message={message}
      />
      <Grid
        item
        xs={11}
        sm={8}
        md={5}
        component={Paper}
        elevation={1}
        square
        sx={{ height: '500px', display: 'flex', alignItems: 'center' }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Image
            width={180}
            height={120}
            alt="logo"
            src="/assets/logo.png"
          />
          <Typography component="h1" variant="h5">
            Backoffice
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disableElevation
              disabled={isLoading}
              sx={{ mt: 3, mb: 2, height: '50px' }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
