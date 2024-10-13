import { Link } from "react-router-dom";
import { useGetCollectionInfo } from "../services/queries";

const Index = () => {
  const { data, isLoading, isError, error } = useGetCollectionInfo();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <>
      <div className="text-center">
        <h1 className="mb-2 text-4xl font-bold">
          <div>Welcome to Alejandro&apos;s</div>
          <div>Physical Media Collection</div>
        </h1>
        <p>Explore what movies I'm interested in</p>
      </div>

      {data && (
        <>
          <section>
            <p>
              Currently I own <strong>{data.total}</strong> movies in my
              collection
            </p>
            <div>
              {data.formats.map((format) => (
                <p key={format._id}>
                  <strong>{format._id}:</strong> <span>{format.count}</span>
                </p>
              ))}
            </div>
          </section>
          <Link to="/collection" className="text-muted">
            See full Movie Collection
          </Link>
        </>
      )}
    </>
  );
};

export default Index;
