import { NumberIntervalFilter } from "@/utils/filters";
import FilterBase from "../FilterBase/FilterBase";
import { useEffect, useState } from "react";
import { Interval } from "@/utils/interval";
import useDebounce from "@/hooks/useDebounce";

interface RangeFilterProps {
  label: string;
  prop: string;
  maxInterval: Interval;
  interval: Interval;
  onChange: (filter: NumberIntervalFilter) => void;
}

const RangeFilter = ({ label, prop, maxInterval, interval: defaultInterval, onChange }: RangeFilterProps) => {
  const inputId = prop + "-filter";
  const debounce = useDebounce(500);
  const [resetDisabled, setResetDisabled] = useState(true);
  const [interval, setInterval] = useState(defaultInterval);

  const checkDisabled = () => setResetDisabled(maxInterval.min === interval.min && maxInterval.max === interval.max);

  const setRange = (min: number, max: number) => {
    setInterval(new Interval(min, max).normalize());
    debounce(() => {
      onChange(new NumberIntervalFilter(prop, label, min, max, maxInterval.min, maxInterval.max));
    });
  };

  const reset = () => {
    if (maxInterval.equals(interval)) return;
    setInterval(maxInterval);
    onChange(new NumberIntervalFilter(prop, label, maxInterval.min, maxInterval.max));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(checkDisabled, [interval]);
  useEffect(() => setInterval(defaultInterval), [defaultInterval]);

  return (
    <FilterBase label={label} id={inputId} onReset={reset} resetDisabled={resetDisabled}>
      <input
        type="number"
        className="form-control"
        value={interval.min === Number.MIN_SAFE_INTEGER ? "" : interval.min}
        onChange={e => setRange(Number(e.target.value), interval.max)}
      />
      <span className="input-group-text">to</span>
      <input
        type="number"
        className="form-control"
        value={interval.max === Number.MAX_SAFE_INTEGER ? "" : interval.max}
        onChange={e => setRange(interval.min, Number(e.target.value))}
      />
    </FilterBase>
  );
};

export default RangeFilter;
