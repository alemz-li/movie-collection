import { Film } from "lucide-react";
import MovieForm from "./components/MovieForm";
import MoviesTable from "./components/MoviesTable";

export default function Dashboard() {
  return (
    <section>
      <main className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div>
          <div className="flex-shrink-0 rounded-md bg-indigo-500 p-3">
            <Film className="h-6 w-6 text-white" />
          </div>
        </div>
        <div>
          <MovieForm />
          <MoviesTable />
        </div>
      </main>
    </section>
  );
}
