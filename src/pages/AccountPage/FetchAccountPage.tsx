import Api from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import { AccountPage } from "./AccountPage";
import { queryClient } from "../../api/queryClient";
import { Loader } from "../../components/Loader/Loader";
import { ErrorMessage } from "../../components/ErrorMessage/ErrorMessage";

const FetchAccountPage = () => {
  const accountQuery = useQuery(
    {
      queryFn: () => Api.fetchUser(),
      queryKey: ["user"],
    },
    queryClient
  );

  switch (accountQuery.status) {
    case "pending":
      return <Loader />;

    case "success":
      return <AccountPage account={accountQuery.data} />;

    case "error":
      return <ErrorMessage onRetry={() => accountQuery.refetch()} />;
  }
};

export default FetchAccountPage;
