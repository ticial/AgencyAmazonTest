import MinMax from "./MinMax";

export interface Filter {
  type: FilterTypes;
  prop: string;
  label: string;
  check(object: Record<string, unknown>): boolean;
  equals(other: Filter): boolean;
}

export enum FilterTypes {
  BaseFilter,
  NumberIntervalFilter,
  DateIntervalFilter,
  StartStringFilter,
}

export abstract class BaseFilter implements Filter {
  type = FilterTypes.BaseFilter;

  constructor(public prop: string, public label: string) {}

  check(object: Record<string, unknown>) {
    const value = object[this.prop];
    if (!value) return false;
    return true;
  }

  equals(other: Filter) {
    return this.type === other.type && this.prop === other.prop;
  }
}

export class NumberIntervalFilter extends BaseFilter {
  type = FilterTypes.NumberIntervalFilter;
  constructor(
    prop: string,
    label: string,
    public start = Number.MIN_SAFE_INTEGER,
    public end = Number.MAX_SAFE_INTEGER,
    public min = start,
    public max = end,
  ) {
    super(prop, label);
  }

  check(object: Record<string, unknown>) {
    const value = object[this.prop];
    if (!value || typeof value !== "number") return false;
    return value >= this.start && value <= this.end;
  }

  equals(other: NumberIntervalFilter): boolean {
    return (
      super.equals(other) &&
      this.min === other.min &&
      this.max === other.max &&
      this.start === other.start &&
      this.end === other.end
    );
  }

  setValues(start: number, end: number) {
    this.start = start;
    this.end = end;
    this.min = Math.min(start, this.min);
    this.max = Math.max(end, this.max);
  }

  setLimit(min: number, max: number) {
    this.min = min;
    this.max = max;
    this.start = Math.max(this.start, min);
    this.end = Math.min(this.end, max);
  }

  equalsValues(start: number, end: number) {
    return this.start === start && this.end === end;
  }

  equalsLimit(min: number, max: number) {
    return this.min === min && this.max === max;
  }

  getInterval() {
    return new MinMax(this.start, this.end);
  }

  getLimitInterval() {
    return new MinMax(this.min, this.max);
  }

  clone() {
    return new NumberIntervalFilter(this.prop, this.label, this.start, this.end, this.min, this.max);
  }
}

export function cloneFilterIfLimitChanged<T extends NumberIntervalFilter>(oldFilter: T, limit: MinMax): T | null {
  if (oldFilter.min !== limit.min || oldFilter.max !== limit.max) {
    oldFilter.setLimit(limit.min, limit.max);
    return oldFilter.clone() as T;
  }
  return null;
}

export class DateIntervalFilter extends NumberIntervalFilter {
  type = FilterTypes.DateIntervalFilter;

  clone() {
    return new DateIntervalFilter(this.prop, this.label, this.start, this.end, this.min, this.max);
  }
}

export class StartStringFilter extends BaseFilter {
  type = FilterTypes.StartStringFilter;
  query: string;

  constructor(prop: string, label: string, query: string = "") {
    super(prop, label);
    this.query = query.toLowerCase();
  }

  check(object: Record<string, unknown>) {
    if (this.query === "") return true;
    const value = object[this.prop];
    if (!value || typeof value !== "string") return false;
    return value.toLowerCase().startsWith(this.query);
  }

  equals(other: StartStringFilter) {
    return super.equals(other) && this.query === other.query;
  }
}
