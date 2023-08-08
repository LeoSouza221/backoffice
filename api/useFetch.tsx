import useSWR from 'swr'
import fetcher from './fetcher'
import { useApp } from '@/components/layout'
import { HTTP_METHODS } from './types'

export default function useFetch(url: string, method: HTTP_METHODS) {
  // const token = localStorage.getItem('token')
  const { data, error, isLoading, mutate } = useSWR(url, (url) =>
    fetcher(url, method)
  )
  const { logout } = useApp()

  if (error && error.status === 401) {
    logout()
  }

  return {
    data,
    isLoading,
    isError: error,
    mutate,
  }
}
