import { getAccountsData } from "@/api/accountsApi";
import { QueryParams } from "@/types/types";
import TableWidget from "@/components/TableWidget/TableWidget";
import moment from "moment";
import { DateIntervalFilter, Filter, StartStringFilter, cloneFilterIfLimitChanged } from "@/types/filters";
import { useState } from "react";
import TableRow from "@/components/Table/TableRow/TableRow";
import { useNavigate } from "react-router-dom";
import styles from "./AccountsTable.module.scss";

const headerNames = { id: "ID", email: "Email", authToken: "Auth Token", creationDate: "Creation Date" };
const emailFilter = new StartStringFilter("email", "Search Email");
const defaultDateFilter = new DateIntervalFilter("creationDate", "Date Range");

const AccountsTable = () => {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [dateFilter, setDateFilter] = useState(defaultDateFilter);
  const [filtersParams, setFiltersParams] = useState<Filter[]>([emailFilter, defaultDateFilter]);
  const [valuesList, setValuesList] = useState<string[][]>([]);

  const loadValues = async (params?: QueryParams) => {
    try {
      const { items, total, dateRange } = await getAccountsData(params);
      const values = items.map(item => [String(item.id), item.email, item.authToken, moment(item.creationDate).format("ll")]);
      setValuesList(values);
      setTotal(total);

      const updatedDateFilter = cloneFilterIfLimitChanged(dateFilter, dateRange);
      if (updatedDateFilter) {
        setDateFilter(updatedDateFilter);
        setFiltersParams([emailFilter, updatedDateFilter]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TableWidget title="Accounts" total={total} headerNames={headerNames} onChange={loadValues} filtersParams={filtersParams}>
      {valuesList.map(values => (
        <TableRow classname={styles.row} key={values[0]} values={values} onClick={() => navigate("/account/" + values[0])} />
      ))}
    </TableWidget>
  );
};

export default AccountsTable;
