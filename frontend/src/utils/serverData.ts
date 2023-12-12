export const SERVER_ADDRESS: string = 'http://192.168.1.31:5002'

export async function serverData<T> (url: string): Promise<T> {
  const response = await fetch(`${SERVER_ADDRESS}/${url}`)
  return await response.json()
}
