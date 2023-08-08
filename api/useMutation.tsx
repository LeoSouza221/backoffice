import useSWRMutation from 'swr/mutation'
import fetcher from './fetcher'
import { useApp } from '@/components/layout'
import { HTTP_METHODS } from './types'

export default function useMutation (url: string, method: HTTP_METHODS, body?: any) {
  // const token = localStorage.getItem('token')
  const { data, error, trigger, isMutating } = useSWRMutation(url, url => fetcher(url, method, body))
  const { logout } = useApp()

  if (error && error.status === 401) {
    logout()
  }
 
  return {
    data,
    isError: error,
    isLoading: isMutating,
    trigger
  }
}