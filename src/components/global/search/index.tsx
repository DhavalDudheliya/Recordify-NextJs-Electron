import { useSearch } from "@/hooks/useSearch";
import React from "react";

interface SearchProps {
  workspaceId: string;
}

const Search = ({ workspaceId }: SearchProps) => {
  const { isFetching, onSearchQuery, query, onUsers } = useSearch("get-users", "USERS");
  return <div>Search</div>;
};

export default Search;
