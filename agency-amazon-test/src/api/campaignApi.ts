import { Campaign, QueryParams } from "@/types/types";
import data from "./data/campaignsData.json";
import { sortByProp } from "@/utils/sortByProp";
import { Interval } from "@/utils/range";

export const getCampaignsData = async (params?: QueryParams) => {
  await new Promise(r => setTimeout(r, 500)); // fake delay
  const sort = params?.sort || "id";
  const filters = params?.filters || [];
  const offset = params?.offset || 0;
  const count = params?.count || 10;

  const itemsAll: Campaign[] = data.map(el => ({
    id: el.id,
    clicks: el.clicks,
    cost: parseFloat(el.cost),
    date: Date.parse(el.date),
    profileId: el.profileId
  }));

  sortByProp(sort, itemsAll)

  const items: Campaign[] = [];
  let total = 0;

  const dateRange = new Interval()
  const clicksRange = new Interval()
  const costRange = new Interval()

  for (const item of itemsAll) {
    dateRange.check(item.date)
    clicksRange.check(item.clicks)
    costRange.check(item.cost)

    if (filters.every((filter) => filter.check(item))) {
      if (total >= offset && total < offset + count) {
        items.push(item);
      }
      total++;
    }
  }

  return { items, total, dateRange, clicksRange, costRange };
};