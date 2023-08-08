'use client'
import { useEffect, useState, forwardRef } from 'react'
import {
  Button,
  TextField,
  Box,
  Grid,
  DialogContent,
  Dialog,
  DialogTitle,
} from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useApp } from '@/components/layout'
import { IMaskInput } from 'react-imask'

interface IUser {
  name: string,
  email: string,
  phone: string,
  dateCreated?: string
  accountId?: number
}

interface IUserFormProps {
  open: boolean
  isCreate: boolean
  handleOpenClose: (updateTable?: boolean) => void
  user: IUser
}

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskCustom = forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="(##) #####-####"
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  },
)

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Digite um email válido')
    .required('Email é obrigatorio'),
  name: yup
    .string()
    .min(8, 'Nome deve ter pelo menos 8 caracteres')
    .required('Nome é obrigatório'),
  phone: yup
    .string()
    .required('Telefone é obrigatório'),
});

let isLoading = false

export default function UserForm({ handleOpenClose, open, user, isCreate }: IUserFormProps) {
  const { handleOpenSnackbar } = useApp()

  useEffect(() => {
    formik.setValues({
      name: user.name ?? '',
      email: user.email ?? '',
      phone: user.phone ?? ''
    })

    formik.setTouched({})
  }, [user])

  const formik = useFormik({
    initialValues: user,
    validationSchema: validationSchema,
    onSubmit: () => {
      handleUpdateUser()
    },
  })

  const handleUpdateUser = async () => {
    isLoading = true
    try {
      setTimeout(() => {
        handleOpenSnackbar('success','Usuário editado com sucesso')
        handleOpenClose(true) 
      }, 2000)
    } catch (e) {
      // error handling
      handleOpenSnackbar('error','Erro ao editar usuário')
    } finally {
      isLoading = false
    }
  }

  return (
    <Dialog onClose={() => handleOpenClose()} open={open}>
      <DialogTitle>{isCreate ? 'Criar usuário' : 'Editar usuário'}</DialogTitle>
      <DialogContent>
        <Grid item xs={11} sm={8} md={5}>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              name="name"
              label="Nome"
              type="text"
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              margin="normal"
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
              fullWidth
              id="phone"
              label="Telefone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              InputProps={{
                inputComponent: TextMaskCustom as any,
              }}
            />
            <Box
              sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={() => handleOpenClose()}
                disabled={isLoading}
                sx={{ marginRight: '4px' }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
              >
                Salvar
              </Button>
            </Box>
          </Box>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}
