import styles from "./Top10.module.scss";
import Api from "../../../api/api";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../api/queryClient";
import { Top10 } from "./Top10";
import { ErrorMessage } from "../../../components/ErrorMessage/ErrorMessage";

export const FetchTop10 = () => {
  const top10Query = useQuery(
    {
      queryFn: () => Api.getTop10(),
      queryKey: ["top10"],
    },
    queryClient
  );

  switch (top10Query.status) {
    case "pending":
      return (
        <div className={styles.top10}>
          <div className={styles.top10__loading}>Loading</div>
        </div>
      );

    case "success":
      return <Top10 top10={top10Query.data} />;

    case "error":
      return (
        <div className={styles.top10}>
          <ErrorMessage onRetry={() => top10Query.refetch()} />
        </div>
      );
  }
};
