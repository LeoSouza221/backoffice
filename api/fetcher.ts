import { HTTP_METHODS } from './types'

interface ApiErrorOptions extends ErrorOptions {
  status?: number
}

class ApiError extends Error {
  status: number
  constructor(message: string, options?: ApiErrorOptions) {
    super(message, { cause: options?.cause })
    this.status = options?.status ?? 200
  }
}

export default async function fetcher(url: string, method: HTTP_METHODS, requestBody?: string) {
  const localToken = await localStorage.getItem('isLogged')
  let body

  if (requestBody) {
    body = JSON.stringify(requestBody)
  }

  const response = await fetch(`${process.env.SITE_URL}/${url}`, {
    method,
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${localToken}`
    },
    body
  })

  if (!response.ok) {
    const cause = response.status
    const error = new ApiError('An error occurred while fetching the data.', { status: response.status })

    throw error
  }

  if (method !== 'GET') {
    return response.status
  }
  
  return response.json()
}