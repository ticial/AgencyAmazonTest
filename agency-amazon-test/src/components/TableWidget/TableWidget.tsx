import { useEffect, useMemo, useState } from "react";
import Paginator from "../Paginator/Paginator";
import Table from "../Table/Table";
import TableRow from "../Table/TableRow/TableRow";
import { useNavigate } from "react-router-dom";
import { QueryParams } from "@/types/types";
import { filterBuilder } from "../filters/filterBuilder";
import { Filter } from "@/utils/filters";

export interface TableWidgetValues {
  values: string[][];
  total: number;
  filters?: Filter[];
}

interface TableWidgetProps {
  title: string;
  headerNames: Record<string, string>;
  filters?: Filter[];
  getValues: (params: QueryParams) => Promise<TableWidgetValues>;
}

const TableWidget = ({ title, headerNames, filters: defaultFilters, getValues }: TableWidgetProps) => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<Filter[]>([]);
  const [filtersParams, setFiltersParams] = useState<Filter[]>(defaultFilters || []);
  const [valuesList, setValuesList] = useState<string[][]>([]);
  const [sort, setSort] = useState("id");
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const count = 10;

  const changeSort = (value: string) => {
    setOffset(0);
    setSort(value);
  };

  const changeOffset = (value: number) => {
    setOffset(value);
  };

  const addFilter = (filter: Filter) => {
    setFilters(filters => {
      const idx = filters.findIndex(el => el.prop === filter.prop);
      if (idx !== -1 && filters[idx].equals(filter)) return filters;
      setOffset(0);
      return [...filters.slice(0, idx), filter, ...filters.slice(idx + 1)];
    });
  };

  const loadValues = () => {
    getValues({ offset, count, sort, filters }).then(data => {
      if (!stringTablesCompare(valuesList, data.values)) {
        setValuesList(data.values);
      }
      if (total !== data.total) setTotal(data.total);
      if (data.filters && !checkFiltersParams(filtersParams, data.filters)) {
        setFiltersParams(data.filters);
      }
    });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(loadValues, [offset, count, sort, filters]);

  const filtersGroup = useMemo(
    () => filtersParams.map(filter => <div key={filter.prop}>{filterBuilder(filter, addFilter)}</div>),
    [filtersParams],
  );

  return (
    <div className="d-grid gap-4">
      <h2>{title}</h2>
      {filtersGroup.length > 0 && (
        <div className="d-grid gap-2">
          {filtersParams.map(filter => (
            <div key={filter.prop}>{filterBuilder(filter, addFilter)}</div>
          ))}
        </div>
      )}
      <Table headerNames={headerNames} defaultSort="id" onSortClick={changeSort}>
        {valuesList.map(values => (
          <TableRow key={values[0]} values={values} onClick={() => navigate("/account/" + values[0])} />
        ))}
      </Table>
      <Paginator offset={offset} count={count} total={total} onChangeOffset={changeOffset} className="justify-content-center" />
    </div>
  );
};

export default TableWidget;

const stringTablesCompare = (tableA: string[][], tableB: string[][]) => {
  if (tableA.length !== tableB.length) return false;
  for (const rowA of tableA) {
    for (const rowB of tableB) {
      if (rowA.length !== rowB.length) return false;
      for (const a of rowA) {
        for (const b of rowB) {
          if (a !== b) return false;
        }
      }
    }
  }
  return true;
};

const checkFiltersParams = (oldFilters: Filter[], newFilters: Filter[]) => {
  if (!newFilters || oldFilters.length !== newFilters.length) return false;
  let checks = 0;
  for (const oldFilter of oldFilters) {
    for (const newFilter of newFilters) {
      if (oldFilter.equals(newFilter)) checks += 1;
    }
  }
  return checks === oldFilters.length;
};
