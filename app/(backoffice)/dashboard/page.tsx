'use client'
import { Box, Card, CardContent, CardActions, Grid, Typography, Divider } from '@mui/material'
import { Chart, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from 'chart.js'
import { repeat } from '@/util'
import GroupIcon from '@mui/icons-material/Group'
import TrendingUp from '@mui/icons-material/TrendingUp'
import { grey } from '@mui/material/colors'

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
)

export default function DashboardPage() {
  const teste = grey[300]
  const currentDate = new Date()
  const labels = repeat(10, (item) => new Date(currentDate.setDate(currentDate.getDate() - 1)).toLocaleDateString())
  const data = {
    labels: labels,
    datasets: [{
      label: 'Cadastro de usuários',
      data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5],
      borderWidth: 1,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgb(54, 162, 235)',
    }]
  }
  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
  }

  const options1 = {
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    },
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
      <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600 }}>Dashboard</Typography>
      <Divider />
      <Grid container spacing={2} sx={{ py: 3 }}>
        <Grid item xs={12} lg={3}>
          <Card sx={{ minWidth: 275, height: 190 }}>
            <CardContent>
              <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                Total de usuários
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <GroupIcon sx={{ fontSize: 72 }} />
                <Typography variant="h2" align="right">
                  1234
                </Typography>
              </Box>              
            </CardContent>
            <CardActions sx={{ textAlign: 'right', display: 'flex', justifyContent: 'flex-end' }}>
              <TrendingUp color="success"></TrendingUp>
              <Typography color="text.secondary" sx={{ fontSize: 12 }} align="right">
                + 30 nos últimos 10 dias
              </Typography>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} lg={9}>
          <Card>
            <CardContent>
              <Chart
                type="bar"
                options={options}
                data={data}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Card sx={{ minHeight: { sx: 200, lg: 400 } }}>
        <CardContent>
          <Line
            options={options1}
            data={data}
          />
        </CardContent>
      </Card>
    </Box>
  )
}
