"use client"
import { Box, Button, Card, CardContent, CircularProgress, IconButton, Typography, Divider, Grid, TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useApp } from '@/components/layout'
import { useFormik } from 'formik'
import * as yup from 'yup'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const validationSchema = yup.object({
  description: yup
    .string()
    .required('Resposta é obrigatório'),
});

interface Params {
  id: string
}

interface IComplaintDetailsProps {
  params: Params
}

const authorTypes: any = {
  USER: {
    name: 'Usuário',
    color: 'text.secondary',
    background: 'background.third'
  },
  OPERATOR: {
    name: 'Operador',
    color: 'text.disabled',
    background: 'background.secondary'
  },
  CASINO: {
    name: 'Cassino',
    color: 'action.active',
    background: 'background.primary'
  }
}

let isLoading = false
const complaint = {
  title: 'Complaint 1',
  public: false,
  casino: {
    id: '0',
    name: 'Blaze',
  },
  user: {
    id: '0',
    name: 'Leonardo',
  },
  state: 'OPEN',
  createdAt: new Date(),
  description: 'Cade meu dinheiro?',
  answers: [
    {
      authorType: 'USER',
      author: {
        email: 'test@email.com'
      },
      createdAt: new Date(),
      message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      authorType: 'OPERATOR',
      author: {
        email: 'test2@email.com'
      },
      createdAt: new Date(),
      message: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem'
    },
    {
      authorType: 'CASINO',
      author: {
        email: 'casino2@email.com'
      },
      createdAt: new Date(),
      message: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?'
    }
  ]
}

export default function ComplaintDetails({ params }: IComplaintDetailsProps) {
  const router = useRouter()

  const { handleOpenSnackbar } = useApp()

  const formik = useFormik({
    initialValues: {
      description: ''
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      backAction()
    },
  })

  // const { data, isLoading, mutate } = useFetch(`/api/complaint/${params.id}`, 'GET')
  // const { isLoading: isReopening, trigger: triggerReopen } = useMutation(`/api/complaint/${params.id}/reopen`, 'PATCH')
  // const { isLoading: isClosing, trigger: triggerClose } = useMutation(`/api/complaint/${params.id}/close`, 'PATCH')
  // const { isLoading: isAnswersing, trigger: triggerAnswers } = useMutation(`/api/complaint/${params.id}/operator-answer`, 'PUT', { description: formik.values.description })
  // const { isLoading: isChangeVisibility, trigger: triggerVisibility } = useMutation(`/api/complaint/${params.id}/toggle-visibility`, 'PATCH')

  const backAction = () => {
    isLoading = true
    try {
      setTimeout(() => {
        handleOpenSnackbar('success', 'Reclamação alterada com sucesso')

        router.back()
      }, 2000)
    } catch (e) {
      handleOpenSnackbar('error', 'Erro ao alterar reclamação')
    } finally {
      isLoading = false
    }
  }

  const formattedTitle = (text: string | null) => {
    if (text && text.length) {
      if (text.length > 200) {
        return `${text.substring(0, 200)}...`
      }

      return text
    }
    return ''
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box
      sx={{
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={10}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={() => router.back()}>
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600 }}>Reclamação: { formattedTitle(complaint.title) }</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} lg={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                disableElevation
                fullWidth
                disabled={isLoading}
                onClick={backAction}
                sx={{
                  textTransform: 'capitalize'
                }}
              >
                { !complaint.public ? 'Tornar público' : 'Tornar privado' }
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex' }}>
                <Typography variant="body1" color="text.primary" sx={{ fontWeight: 600, mr: 1 }}>Casino: </Typography>
                <Typography variant="body1" color="text.primary">{ complaint?.casino.name ?? '' }</Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography variant="body1" color="text.primary" sx={{ fontWeight: 600, mr: 1 }}>complaint: </Typography>
                <Typography variant="body1" color="text.primary">{ (new Date(complaint?.createdAt).toLocaleDateString() ?? '') }</Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography variant="body1" color="text.primary" sx={{ fontWeight: 600, mr: 1 }}>Player: </Typography>
                <Typography variant="body1" color="text.primary">{ complaint?.user?.name ?? '' }</Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography variant="body1" color="text.primary" sx={{ fontWeight: 600, mr: 1 }}>Status: </Typography>
                <Typography variant="body1" color="text.primary">{ complaint?.state === 'OPEN' ? 'ABERTO' : 'FECHADO' }</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.primary" sx={{ fontWeight: 600 }}>Timeline</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.primary" sx={{ fontWeight: 600 }}>{ complaint?.user?.name ?? '' }</Typography>
              <Typography variant="body2" color="text.primary">{ (new Date(complaint?.createdAt).toLocaleString() ?? '') }</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.primary" align="justify">
                {complaint?.description ?? ''}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            {(complaint?.answers ?? []).map((answer: any, index: number) => (
              <Grid item xs={12} key={index} sx={{ backgroundColor: authorTypes[answer?.authorType].background }}>
                <Typography variant="body2" color={authorTypes[answer?.authorType].color} sx={{ fontWeight: 600 }}>Resposta {authorTypes[answer?.authorType].name}</Typography>
                <Typography variant="body2" color="text.primary" sx={{ fontWeight: 600 }}>{answer?.author?.email ?? '' }</Typography>
                <Typography variant="body2" color="text.primary">{ (new Date(answer.createdAt).toLocaleString() ?? '') }</Typography>
                <Box sx={{ paddingY: 2 }}>
                  <Typography variant="body2" color="text.primary" align="justify">
                    { answer.message }
                  </Typography>
                </Box>
                <Divider />
              </Grid>
            ))}
            
            <Grid item xs={12} lg={6} sx={{ marginY: 2 }}>
              <Box
                component="form"
                noValidate
                onSubmit={formik.handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  fullWidth
                  label="Responder"
                  name="description"
                  id="description"
                  type="text"
                  multiline
                  rows={4}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                />
                <Box sx={{ paddingTop: 3 }}>
                  <Button
                    variant="contained"
                    disableElevation
                    disabled={isLoading}
                    sx={{
                      textTransform: 'capitalize'
                    }}
                    type="submit"
                  >
                    Responder
                  </Button>
                  <Button
                    variant="contained"
                    disableElevation
                    disabled={isLoading || complaint.state === 'OPEN'}
                    sx={{
                      textTransform: 'capitalize',
                      marginX: 2
                    }}
                    onClick={backAction}
                  >
                    Reabrir
                  </Button>
                  <Button
                    variant="contained"
                    disableElevation
                    disabled={isLoading || complaint.state === 'CLOSED'}
                    sx={{
                      textTransform: 'capitalize'
                    }}
                    onClick={backAction}
                  >
                    Finalizar
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}