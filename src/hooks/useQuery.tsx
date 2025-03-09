import { Enabled, QueryFunction, QueryKey, useQuery } from "@tanstack/react-query";

export const useQueryData = (queryKey: QueryKey, queryFn: QueryFunction, enabled?: Enabled) => {
  const { data, isPending, isFetching, isFetched, refetch } = useQuery({
    queryKey,
    queryFn,
    enabled,
  });

  return { data, isPending, isFetching, isFetched, refetch };
};
