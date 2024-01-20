export function addWithoutNull<T>(array: T[], item: T | null | undefined) {
  if (item) array.push(item);
  return array;
}
