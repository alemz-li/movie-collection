import { useQuery } from "@tanstack/react-query";
import { getCollectionInfo, getMovies } from "./api/collection";

export function useGetMovies() {
  return useQuery({
    queryKey: ["movies"],
    queryFn: () => getMovies(),
  });
}

export function useGetCollectionInfo() {
  return useQuery({
    queryKey: ["collection-info"],
    queryFn: () => getCollectionInfo(),
  });
}
