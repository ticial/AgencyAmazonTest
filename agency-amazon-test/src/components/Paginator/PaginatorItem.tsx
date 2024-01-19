import { cn } from "@/utils/cn";

interface PaginatorItemProps {
  value?: number;
  active?: boolean;
  onClick?: (value: number) => void;
}

const PaginatorItem = ({ value, active = false, onClick }: PaginatorItemProps) => {
  const clickHandle = value !== undefined && onClick ? () => onClick(value) : undefined;
  return (
    <li className={cn("page-item", { ["active"]: active })}>
      <a className={cn("page-link", { ["disabled"]: value === undefined })} onClick={clickHandle}>
        {value !== undefined ? value + 1 : "..."}
      </a>
    </li>
  );
};

export default PaginatorItem;
