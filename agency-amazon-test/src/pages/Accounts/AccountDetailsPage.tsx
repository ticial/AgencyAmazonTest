import { getAccount } from "@/api/accountsApi";
import ProfilesTable from "@/pages/Profiles/ProfilesTable/ProfilesTable";
import { Account } from "@/types/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AccountDetailsPage = () => {
  const { accountId } = useParams();
  const id = Number(accountId);
  const [account, setAccount] = useState<Account | null>(null);
  const title = account ? account.email + ": Profiles" : "";

  useEffect(() => {
    getAccount(id).then(account => {
      setAccount(account);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ProfilesTable title={title} accountId={id} />;
};

export default AccountDetailsPage;
