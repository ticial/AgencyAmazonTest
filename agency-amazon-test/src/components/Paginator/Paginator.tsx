import { cn } from "@/utils/cn";
import PaginatorItem from "./PaginatorItem";

interface PaginatorProps {
  offset: number;
  count: number;
  total: number;
  onChangeOffset: (value: number) => void;
  className?: string;
}

const Paginator = ({ offset, count, total, onChangeOffset, className }: PaginatorProps) => {
  if (total === 0) return null;

  const current = Math.floor(offset / count);
  const last = Math.floor((total - 1) / count);
  const values = getValues(current, last);

  const changePage = (value: number) => onChangeOffset(value * count);

  return (
    <ol className={cn("pagination", className)}>
      {values[0] !== 0 && <PaginatorItem value={0} onClick={changePage} />}
      {values[0] === 2 && <PaginatorItem value={1} onClick={changePage} />}
      {values[0] > 2 && <PaginatorItem />}
      {values.map(value => (
        <PaginatorItem key={value} value={value} onClick={changePage} active={value === current} />
      ))}
      {values[values.length - 1] < last - 2 && <PaginatorItem />}
      {values[values.length - 1] === last - 2 && <PaginatorItem value={last - 1} onClick={changePage} />}
      {values[values.length - 1] !== last && <PaginatorItem value={last} onClick={changePage} />}
    </ol>
  );
};

export default Paginator;

const getValues = (current: number, last: number, sideNums = 5) => {
  const fullSize = sideNums * 2;
  const nums = [];
  const min = Math.max(0, Math.min(last - fullSize, current - sideNums));
  const max = Math.min(last, Math.max(fullSize, current + sideNums));
  for (let index = min; index <= max; index++) {
    nums.push(index);
  }
  return nums;
};
