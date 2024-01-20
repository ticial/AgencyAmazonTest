import { Campaign, QueryParams } from "@/types/types";
import data from "./data/campaignsData.json";
import { sortByProp } from "@/utils/sortByProp";
import MinMax from "@/types/MinMax";
import { API_DELAY, TABLE_ROW_COUNT } from "@/constants";

type CampaignData = typeof data[0]

const parseData = (el: CampaignData): Campaign => ({
  id: el.id,
  clicks: el.clicks,
  cost: parseFloat(el.cost),
  date: Date.parse(el.date),
  profileId: el.profileId
})

export const getCampaignsData = async (params?: QueryParams) => {
  await new Promise(r => setTimeout(r, API_DELAY)); // fake delay
  const value = params?.value;
  const sort = params?.sort || "id";
  const filters = params?.filters || [];
  const offset = params?.offset || 0;
  const count = params?.count || TABLE_ROW_COUNT;

  const itemsAll: Campaign[] = data.map(parseData);

  sortByProp(sort, itemsAll)

  const items: Campaign[] = [];
  let total = 0;

  const dateRange = new MinMax()
  const clicksRange = new MinMax()
  const costRange = new MinMax()

  for (const item of itemsAll) {
    if (value && !value.check(item)) continue;

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

export const getCampaign = async (id: number) => {
  await new Promise(r => setTimeout(r, API_DELAY)); // fake delay
  for (const el of data){
    if(el.id === id) {
      return parseData
    }
  }
  return null
}