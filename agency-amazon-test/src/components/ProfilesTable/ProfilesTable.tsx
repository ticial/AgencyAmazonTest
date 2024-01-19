import { getProfilesData } from "@/api/profilesApi";
import TableRow from "@/components/Table/TableRow/TableRow";
import TableWidget from "@/components/TableWidget/TableWidget";
import { QueryParams } from "@/types/types";
import { StartStringFilter } from "@/utils/filters";
import { PropValue } from "@/utils/propValue";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const headerNames = { id: "ID", country: "Country", marketplace: "Marketplace" };
const countryFilter = new StartStringFilter("country", "Search Country");
const marketplaceFilter = new StartStringFilter("marketplace", "Search Marketplace");
const defaultFilters = [countryFilter, marketplaceFilter];

interface ProfilesTableProps {
  title: string;
  accountId?: number;
}

const ProfilesTable = ({ accountId, title }: ProfilesTableProps) => {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [valuesList, setValuesList] = useState<string[][]>([]);

  const loadValues = async (params: QueryParams) => {
    try {
      if (accountId !== undefined) params.value = new PropValue("accountId", accountId);
      const { items, total } = await getProfilesData(params);
      const values = items.map(item => [String(item.id), item.country, item.marketplace]);
      setValuesList(values);
      setTotal(total);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TableWidget title={title} total={total} headerNames={headerNames} onChange={loadValues} filtersParams={defaultFilters}>
      {valuesList.map(values => (
        <TableRow key={values[0]} values={values} onClick={() => navigate("/profile/" + values[0])} />
      ))}
    </TableWidget>
  );
};

export default ProfilesTable;
