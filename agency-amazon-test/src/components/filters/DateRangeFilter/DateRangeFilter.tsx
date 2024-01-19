import { DateIntervalFilter } from "@/utils/filters";
import DatePicker, { DateObject } from "react-multi-date-picker";
import FilterBase from "../FilterBase/FilterBase";
import { useEffect, useState } from "react";
import { Interval } from "@/utils/interval";

interface DateRangeFilterProps {
  label: string;
  prop: string;
  maxInterval: Interval;
  interval: Interval;
  onChange: (filter: DateIntervalFilter) => void;
}

const DateRangeFilter = ({ label, prop, maxInterval, interval: defaultInterval, onChange }: DateRangeFilterProps) => {
  const inputId = prop + "-filter";
  const [resetDisabled, setResetDisabled] = useState(true);
  const [interval, setInterval] = useState(defaultInterval);
  const values = [new DateObject(new Date(interval.min)), new DateObject(new Date(interval.max))];

  const checkDisabled = () => setResetDisabled(maxInterval.min === interval.min && maxInterval.max === interval.max);

  const setValues = (values: DateObject | DateObject[] | null) => {
    if (!Array.isArray(values)) return;
    const [min, max] = values;
    if (min === undefined || max === undefined) return;
    const interval = new Interval(timeOf(min), timeOf(max)).normalize();
    setInterval(interval);
    onChange(new DateIntervalFilter(prop, label, interval.min, interval.max, maxInterval.min, maxInterval.max));
  };

  const reset = () => {
    if (maxInterval.equals(interval)) return;
    setInterval(maxInterval);
    onChange(new DateIntervalFilter(prop, label, maxInterval.min, maxInterval.max));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(checkDisabled, [interval]);
  useEffect(() => setInterval(defaultInterval), [defaultInterval]);

  return (
    <FilterBase label={label} id={inputId} onReset={reset} resetDisabled={resetDisabled}>
      <div className="form-control">
        <DatePicker id={inputId} value={values} onChange={setValues} range />
      </div>
    </FilterBase>
  );
};

export default DateRangeFilter;

function timeOf(date: DateObject) {
  return date.unix * 1000;
}
