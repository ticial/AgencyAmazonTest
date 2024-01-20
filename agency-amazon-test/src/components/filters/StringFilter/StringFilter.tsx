import useDebounce from "@/hooks/useDebounce";
import { StartStringFilter } from "@/types/filters";
import FilterBase from "../FilterBase/FilterBase";
import { useEffect, useState } from "react";

interface StringFilterProps {
  label: string;
  prop: string;
  onChange?: (filter: StartStringFilter) => void;
}

const StringFilter = ({ label, prop, onChange }: StringFilterProps) => {
  const [value, setValue] = useState("");
  const inputId = prop + "-filter";
  const debounce = useDebounce(500);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
  };

  const handleChange = () =>
    debounce(() => {
      onChange && onChange(new StartStringFilter(prop, label, value));
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(handleChange, [value]);

  return (
    <FilterBase label={label} id={inputId} onReset={() => setValue("")} resetDisabled={value === ""}>
      <input value={value} type="text" className="form-control" id={inputId} onChange={handleInput} />
    </FilterBase>
  );
};

export default StringFilter;
