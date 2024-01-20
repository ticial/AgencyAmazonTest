import React, { useEffect, useMemo, useState } from "react";
import Paginator from "../Paginator/Paginator";
import Table from "../Table/Table";
import { QueryParams } from "@/types/types";
import { filterBuilder } from "../filters/filterBuilder";
import { Filter } from "@/types/filters";
import { TABLE_ROW_COUNT } from "@/constants";

interface TableWidgetProps {
  title: string;
  total: number;
  headerNames: Record<string, string>;
  filtersParams?: Filter[];
  children?: React.ReactNode;
  onChange: (params: QueryParams) => void;
}

const TableWidget = ({ title, total, headerNames, filtersParams = [], children, onChange }: TableWidgetProps) => {
  const [filters, setFilters] = useState<Filter[]>(filtersParams);
  const [sort, setSort] = useState("id");
  const [offset, setOffset] = useState(0);
  const count = TABLE_ROW_COUNT;

  const changeSort = (value: string) => {
    setOffset(0);
    setSort(value);
  };

  const changeOffset = (value: number) => {
    setOffset(value);
  };

  const changeFilter = (filter: Filter) => {
    setFilters(filters => {
      const idx = filters.findIndex(el => el.prop === filter.prop);
      if (idx !== -1 && filters[idx].equals(filter)) return filters;
      setOffset(0);
      return [...filters.slice(0, idx), filter, ...filters.slice(idx + 1)];
    });
  };

  const handleChange = () => {
    onChange({ offset, count, sort, filters });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(handleChange, [offset, count, sort, filters]);

  const filtersGroup = useMemo(
    () => filtersParams.map(filter => <div key={filter.prop}>{filterBuilder(filter, changeFilter)}</div>),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filtersParams],
  );

  return (
    <div className="d-grid gap-4">
      <h2>{title}</h2>
      {filtersGroup.length > 0 && <div className="d-grid gap-2">{filtersGroup}</div>}
      <Table headerNames={headerNames} defaultSort="id" onSortClick={changeSort}>
        {children}
      </Table>
      <Paginator offset={offset} count={count} total={total} onChangeOffset={changeOffset} className="justify-content-center" />
    </div>
  );
};

export default TableWidget;
