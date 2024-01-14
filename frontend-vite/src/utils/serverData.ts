import { toast } from 'react-toastify'

export const SERVER_ADDRESS: string = import.meta.env.VITE_BACKEND_URL ?? '' as string

export enum FETCH_METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export async function serverRequest<T> (url: string, method: FETCH_METHODS = FETCH_METHODS.GET, body?: unknown): Promise<T> {
  const response = await fetch(`${SERVER_ADDRESS}${url}`, {
    method,
    body: body === undefined ? undefined : JSON.stringify(body),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  })

  const res = await response.json()
  if (response.status === 400 && Array.isArray(res)) {
    res.map((error: string) => toast(error, { theme: 'light' }))
  }

  return res
}
