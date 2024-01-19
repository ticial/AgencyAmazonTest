import { useState } from "react";
import styles from "./Table.module.scss";

interface TableProps {
  headerNames: Record<string, string>;
  children: React.ReactNode;
  defaultSort?: string;
  onSortClick?: (key: string) => void;
}

const Table = ({ headerNames, children, defaultSort = "", onSortClick }: TableProps) => {
  const [sort, setSort] = useState(defaultSort);
  const handleSortClick = (key: string) => {
    if (onSortClick) {
      const descendingSort = sort.startsWith("-");
      const sortProp = descendingSort ? sort.slice(1) : sort;
      const updateSort = key === sortProp ? (descendingSort ? sortProp : "-" + sortProp) : key;
      onSortClick(updateSort);
      setSort(updateSort);
    }
  };
  return (
    <table className="table table-striped border">
      <thead>
        <tr>
          {Object.entries(headerNames).map(keyAndName => (
            <th key={keyAndName[0]}>
              <button className={styles.tableSorter} onClick={() => handleSortClick(keyAndName[0])}>
                {keyAndName[1]}
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="no-border-x">{children}</tbody>
    </table>
  );
};

export default Table;
