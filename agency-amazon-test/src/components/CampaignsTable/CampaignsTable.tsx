import { getCampaignsData } from "@/api/campaignApi";
import TableRow from "@/components/Table/TableRow/TableRow";
import TableWidget from "@/components/TableWidget/TableWidget";
import { QueryParams } from "@/types/types";
import { addWithoutNull } from "@/utils/arrayFuncs";
import { DateIntervalFilter, Filter, NumberIntervalFilter, cloneFilterIfLimitChanged } from "@/utils/filters";
import { PropValue } from "@/utils/propValue";
import moment from "moment";
import { useState } from "react";

const headerNames = { id: "ID", clicks: "Clicks", cost: "Cost", date: "Date" };
const dateFilter = new DateIntervalFilter("date", "Date Range");
const clicksFilter = new NumberIntervalFilter("clicks", "Clicks Range");
const costFilter = new NumberIntervalFilter("cost", "Cost Range");
const defaultFilters = [dateFilter.clone(), clicksFilter.clone(), costFilter.clone()];

interface CampaignsTableProps {
  title: string;
  profileId?: number;
}

const CampaignsTable = ({ profileId, title }: CampaignsTableProps) => {
  const [total, setTotal] = useState(0);
  const [filtersParams, setFiltersParams] = useState<Filter[]>(defaultFilters);
  const [valuesList, setValuesList] = useState<string[][]>([]);

  const loadValues = async (params: QueryParams) => {
    try {
      if (profileId !== undefined) params.value = new PropValue("profileId", profileId);
      const { items, total, dateRange, clicksRange, costRange } = await getCampaignsData(params);
      const values = items.map(item => [
        String(item.id),
        String(item.clicks),
        `$${item.cost}.00`,
        moment(item.date).format("ll"),
      ]);
      setValuesList(values);
      setTotal(total);

      const filters: Filter[] = [];
      addWithoutNull(filters, cloneFilterIfLimitChanged(dateFilter, dateRange));
      addWithoutNull(filters, cloneFilterIfLimitChanged(clicksFilter, clicksRange));
      addWithoutNull(filters, cloneFilterIfLimitChanged(costFilter, costRange));
      if (filters.length > 0) setFiltersParams(filters);
    } catch (error) {
      console.log(error);
    }
    return { values: [], total: 0, filters: [] };
  };
  return (
    <TableWidget title={title} total={total} headerNames={headerNames} onChange={loadValues} filtersParams={filtersParams}>
      {valuesList.map(values => (
        <TableRow key={values[0]} values={values} />
      ))}
    </TableWidget>
  );
};

export default CampaignsTable;
