export async function serverData<T> (url: string): Promise<T> {
  const response = await fetch(`http://localhost:5093/${url}`)
  return await response.json()
}
