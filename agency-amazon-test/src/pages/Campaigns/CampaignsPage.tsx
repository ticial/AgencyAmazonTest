import { getCampaignsData } from "@/api/campaignApi";
import TableWidget, { TableWidgetValues } from "@/components/TableWidget/TableWidget";
import { QueryParams } from "@/types/types";
import { addWithoutNull } from "@/utils/arrayFuncs";
import { DateIntervalFilter, Filter, NumberIntervalFilter, cloneFilterIfLimitChanged } from "@/utils/filters";
import moment from "moment";

const headerNames = { id: "ID", clicks: "Clicks", cost: "Cost", date: "Date" };
const dateFilter = new DateIntervalFilter("date", "Date Range");
const clicksFilter = new NumberIntervalFilter("clicks", "Clicks Range");
const costFilter = new NumberIntervalFilter("cost", "Cost Range");
const defaultFilters = [dateFilter.clone(), clicksFilter.clone(), costFilter.clone()];

const CampaignsPage: React.FC = () => {
  console.log("CampaignsPage");

  const getValues = async (params: QueryParams) => {
    try {
      const { items, total, dateRange, clicksRange, costRange } = await getCampaignsData(params);
      const values = items.map(item => [
        String(item.id),
        String(item.clicks),
        `$${item.cost}.00`,
        moment(item.date).format("ll"),
      ]);
      const result = { values, total, filters: undefined } as TableWidgetValues;
      const filters: Filter[] = [];
      addWithoutNull(filters, cloneFilterIfLimitChanged(dateFilter, dateRange));
      addWithoutNull(filters, cloneFilterIfLimitChanged(clicksFilter, clicksRange));
      addWithoutNull(filters, cloneFilterIfLimitChanged(costFilter, costRange));

      if (filters.length > 0) result.filters = filters;

      return result;
    } catch (error) {
      console.log(error);
    }
    return { values: [], total: 0, filters: [] };
  };

  return <TableWidget title="Campaigns" headerNames={headerNames} getValues={getValues} filters={defaultFilters} />;
};

export default CampaignsPage;
