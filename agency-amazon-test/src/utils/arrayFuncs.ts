export function addWithoutNull<T>(array: T[] = [], item: T | null | undefined) {
  if (item) array.push(item);
  return array;
}

export function stringTablesCompare(tableA: string[][], tableB: string[][]) {
  if (tableA.length !== tableB.length) return false;
  for (const rowA of tableA) {
    for (const rowB of tableB) {
      if (rowA.length !== rowB.length) return false;
      for (const a of rowA) {
        for (const b of rowB) {
          if (a !== b) return false;
        }
      }
    }
  }
  return true;
}
