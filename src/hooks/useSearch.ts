import { SUBSCRIPTION_PLANS } from "@/constants/enums";
import { useEffect, useState } from "react";
import { useQueryData } from "./useQuery";
import { searchUsers } from "@/actions/workspace";

interface IOnUsers {
  id: string;
  subscription: SUBSCRIPTION_PLANS | null;
  firstName: string | null;
  lastName: string | null;
  image: string | null;
  email: string | null;
}

export const useSearch = (key: string, type: "USERS") => {
  const [query, setQuery] = useState("");
  const [debounce, setDebounce] = useState("");
  const [onUsers, setOnUsers] = useState<IOnUsers[] | null>(null);

  const onSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const delayInputTimeoutId = setTimeout(() => {
      setDebounce(query);
    }, 1000);

    return () => clearTimeout(delayInputTimeoutId);
  }, [query]);

  const { refetch, isFetching } = useQueryData([key, debounce], async ({ queryKey }) => {
    if (type === "USERS") {
      const workspace = await searchUsers(queryKey[1] as string);

      if (workspace.status === 200) {
        setOnUsers(workspace.data as IOnUsers[]);
      }
    }
  });

  useEffect(() => {
    if (debounce) refetch();
    if (!debounce) setOnUsers(null);
    return () => {};
  }, [debounce, refetch]);

  return { onSearchQuery, onUsers, isFetching, query };
};
