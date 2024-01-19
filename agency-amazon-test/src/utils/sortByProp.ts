import { StringPropsObject } from "@/types/types";

export function sortStrings(a: string, b: string) {
  const propA = a.toLowerCase();
  const propB = b.toLowerCase();

  if (propA < propB) {
    return -1;
  }
  if (propA > propB) {
    return 1;
  }
  return 0;
}

export function sortByProp(prop: string, array: StringPropsObject[]) {
  const descending = prop.startsWith("-");
  if (descending) prop = prop.slice(1);

  if (array.length < 0) return array;
  const first = array[0];
  if (typeof first[prop] === "string") {
    return descending
      ? array.sort((a, b) => sortStrings(b[prop] as string, a[prop] as string))
      : array.sort((a, b) => sortStrings(a[prop] as string, b[prop] as string));
  }
  if (typeof first[prop] === "number") {
    return descending
      ? array.sort((a, b) => (b[prop] as number) - (a[prop] as number))
      : array.sort((a, b) => (a[prop] as number) - (b[prop] as number));
  }
}
