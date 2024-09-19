import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <nav>Collection</nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}
