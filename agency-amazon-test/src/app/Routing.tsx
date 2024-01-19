import Layout from "@/components/Layout/Layout";
import AccountDetailsPage from "@/pages/Accounts/AccountDetailsPage";
import AccountsPage from "@/pages/Accounts/AccountsPage";
import CampaignsPage from "@/pages/Campaigns/CampaignsPage";
import ProfileDetailsPage from "@/pages/Profiles/ProfileDetailsPage";
import ProfilesPage from "@/pages/Profiles/ProfilesPage";
import { Route, Routes } from "react-router-dom";

const Routing = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<AccountsPage />} />
        <Route path="/account" element={<AccountsPage />} />
        <Route path="/account/:accountId" element={<AccountDetailsPage />} />
        <Route path="/profile" element={<ProfilesPage />} />
        <Route path="/profile/:profileId" element={<ProfileDetailsPage />} />
        <Route path="/campaign" element={<CampaignsPage />} />
      </Route>
    </Routes>
  );
};

export default Routing;
