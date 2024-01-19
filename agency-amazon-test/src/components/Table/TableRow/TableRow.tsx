import { cn } from "@/utils/cn";

interface TableRowProps {
  values: string[];
  classname?: string;
  onClick?: () => void;
}

const TableRow = ({ values, classname, onClick }: TableRowProps) => {
  return (
    <tr onClick={onClick} className={cn(classname, { ["pointer"]: onClick })}>
      {values.map((value, i) => (
        <td key={i}>{value}</td>
      ))}
    </tr>
  );
};

export default TableRow;
