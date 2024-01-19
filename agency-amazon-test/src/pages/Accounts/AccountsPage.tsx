import { getAccountsData } from "@/api/accountsApi";
import { QueryParams } from "@/types/types";
import TableWidget, { TableWidgetValues } from "@/components/TableWidget/TableWidget";
import moment from "moment";
import { DateIntervalFilter, StartStringFilter, cloneFilterIfLimitChanged } from "@/utils/filters";

const headerNames = { id: "ID", email: "Email", authToken: "Auth Token", creationDate: "Creation Date" };
const emailFilter = new StartStringFilter("email", "Search Email");
const dateFilter = new DateIntervalFilter("creationDate", "Date Range");
const defaultFilters = [emailFilter, dateFilter.clone()];

const AccountsPage = () => {
  console.log("AccountsPage");

  const getValues = async (params: QueryParams) => {
    try {
      const { items, total, dateRange } = await getAccountsData(params);
      const values = items.map(item => [String(item.id), item.email, item.authToken, moment(item.creationDate).format("ll")]);
      const result = { values, total, filters: undefined } as TableWidgetValues;

      const updatedDateFilter = cloneFilterIfLimitChanged(dateFilter, dateRange);
      if (updatedDateFilter) result.filters = [emailFilter, updatedDateFilter];

      return result;
    } catch (error) {
      console.log(error);
    }
    return { values: [], total: 0 };
  };

  return <TableWidget title="Accounts" headerNames={headerNames} getValues={getValues} filters={defaultFilters} />;
};

export default AccountsPage;
