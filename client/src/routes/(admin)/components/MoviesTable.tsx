import { useGetCollectionInfo } from "../../../services/queries";

export default function MoviesTable() {
  const { data, isLoading, isError, error } = useGetCollectionInfo();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;
  return (
    <>
      <p>{JSON.stringify(data)}</p>
    </>
  );
}
