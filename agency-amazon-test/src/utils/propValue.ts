export class PropValue {
  constructor(public readonly prop: string, public readonly value: string | number) {}

  check(object: Record<string, string | number>) {
    return object[this.prop] === this.value;
  }
}
