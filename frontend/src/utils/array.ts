interface ValueWithId {
  id: string
}

export function filteredData<T extends ValueWithId> (data: T[]): any[] {
  return data.filter((value: T, index: number, self: T[]) =>
    self.findIndex(v => v.id === value.id) === index
  )
}
