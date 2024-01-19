import { XCircleFill } from "react-bootstrap-icons";

interface FilterBaseProps {
  label: string;
  id: string;
  children: React.ReactNode;
  onReset?: () => void;
  resetDisabled?: boolean;
}

const FilterBase = ({ label, id, children, onReset, resetDisabled = false }: FilterBaseProps) => {
  return (
    <div className="input-group w-50">
      <label className="input-group-text" htmlFor={id}>
        {label}
      </label>
      {children}
      {onReset && (
        <button className="btn btn-danger" type="button" onClick={onReset} disabled={resetDisabled}>
          <XCircleFill size={25} />
        </button>
      )}
    </div>
  );
};

export default FilterBase;
