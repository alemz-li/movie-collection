import { Link, LoaderFunctionArgs } from "react-router-dom";
// import CollectionInfo from "../components/CollectionInfo";
// import RecentlyAdded from "../components/RecentlyAdded";
import { useQuery, type QueryClient } from "@tanstack/react-query";
import { getCollectionInfo } from "../api/collection";

// <CollectionInfo />
// <RecentlyAdded />

export const loader =
  (queryClient: QueryClient) => async (_: LoaderFunctionArgs) => {
    return await queryClient.fetchQuery({
      queryKey: ["collection-info"],
      queryFn: getCollectionInfo,
    });
  };

const Index = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["collection-info"],
    enabled: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h1 className="mb-2 text-center text-4xl font-bold">
        <div>Welcome to Alejandro&apos;s</div>
        <div>Physical Media Collection</div>
      </h1>
      <div>{JSON.stringify(data, null, 2)}</div>
      <Link to="/collection" className="text-muted">
        See full Movie Collection
      </Link>
    </>
  );
};

export default Index;
