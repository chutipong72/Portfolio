import HeroStat from "@/herostat";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import HeroDetail from "@/heroDetail";

function App() {
  const [heroes, setHeroes] = useState([]);

  useEffect(() => {
    fetch("https://www.opendota.com/api/heroes")
      .then((response) => response.json())
      .then((data) => setHeroes(data))
      .catch((error) => console.log(error));
  }, []);

  const router = createBrowserRouter([
    {
      path: "/detail/:localized_name",
      element: <HeroDetail />,
    },
    {
      path: "/",
      element: <HeroStat />,
    },
  ]);

  return (
    <div className="bg-[url('/img/list_bg.jpg')] min-h-[100vh]">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
