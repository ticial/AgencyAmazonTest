export default class MinMax {
  constructor(public min = Number.MAX_SAFE_INTEGER, public max = Number.MIN_SAFE_INTEGER) {}

  normalize() {
    const min = this.min;
    const max = this.max;
    this.min = Math.min(min, max);
    this.max = Math.max(min, max);
    return this;
  }

  check(value: number) {
    if (this.min > value) this.min = value;
    if (this.max < value) this.max = value;
  }

  equals = (other: MinMax) => this.min === other.min && this.max === other.max;
}
