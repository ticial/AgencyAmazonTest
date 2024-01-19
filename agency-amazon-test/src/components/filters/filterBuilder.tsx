import { DateIntervalFilter, Filter, FilterTypes, NumberIntervalFilter } from "@/utils/filters";
import StringFilter from "./StringFilter/StringFilter";
import RangeFilter from "./RangeFilter/RangeFilter";
import DateRangeFilter from "./DateRangeFilter/DateRangeFilter";

export const filterBuilder = (filter: Filter, onChange: (filter: Filter) => void) => {
  switch (filter.type) {
    case FilterTypes.StartStringFilter:
      return <StringFilter label={filter.label} prop={filter.prop} onChange={onChange} />;
    case FilterTypes.NumberIntervalFilter:
      return (
        <RangeFilter
          label={filter.label}
          prop={filter.prop}
          maxInterval={(filter as NumberIntervalFilter).getLimitInterval()}
          interval={(filter as NumberIntervalFilter).getInterval()}
          onChange={onChange}
        />
      );
    case FilterTypes.DateIntervalFilter:
      return (
        <DateRangeFilter
          label={filter.label}
          prop={filter.prop}
          maxInterval={(filter as DateIntervalFilter).getLimitInterval()}
          interval={(filter as DateIntervalFilter).getInterval()}
          onChange={onChange}
        />
      );
  }
  return null;
};
