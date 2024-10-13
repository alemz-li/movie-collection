import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <nav>Collection</nav>
      <main className="max-w-5xl">
        <Outlet />
      </main>
    </>
  );
}
