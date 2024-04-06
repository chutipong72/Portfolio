import React, { useEffect, useState } from "react";
import { getHeroName } from "./utils";
import { useLocalStorage } from "usehooks-ts";
const HeroStat = () => {
  const [heroStats, setHeroStats] = useState([]);
  const [filter, setFilter] = useState("");
  const [attributeFilter, setAttributeFilter] = useState("");
  const [attackTypeFilter, setAttackTypeFilter] = useState("");
  const [rolesFilter, setRolesFilter] = useState("");
  const [favouriteHeroes, setFavouriteHeroes] = useLocalStorage<Array<any>>(
    "favouriteHeroes2",
    []
  );

  const [showFavourites, setShowFavourites] = useState(false);

  useEffect(() => {
    const fetchHeroStats = async () => {
      try {
        const response = await fetch("https://api.opendota.com/api/heroStats");
        const data = await response.json();
        setHeroStats(data);
      } catch (error) {
        console.error("Error fetching hero stats:", error);
      }
    };

    fetchHeroStats();
  }, []);

  const addToFavourites = (hero) => {
    setFavouriteHeroes((prevFavourites) => 
      Array.from(new Set([...prevFavourites, hero.id]))
    );
  };

  const removeFromFavourites = (hero) => {
    setFavouriteHeroes((prevFavourites) =>
      prevFavourites.filter((favouriteHero) => favouriteHero !== hero.id) 
    );
  };

  const toggleShowFavourites = () => {
    setShowFavourites((prevShowFavourites) => !prevShowFavourites);
  };

  const filteredHeroStats = heroStats.filter(
    (hero) =>
      hero.localized_name.toLowerCase().includes(filter.toLowerCase()) &&
      (attributeFilter === "" || hero.primary_attr === attributeFilter) &&
      (attackTypeFilter === "" || hero.attack_type === attackTypeFilter) &&
      (rolesFilter === "" || hero.roles.includes(rolesFilter))
  ); 

  const displayHeroes = showFavourites
    ? filteredHeroStats.filter((herostat) =>
        favouriteHeroes.includes(herostat.id)
      )
    : filteredHeroStats;

  return (
    <div className="w-[90%] m-auto max-w-[1100px]">
      <div className="flex justify-center">
        <img
          src="/img/Dota_logo.png"
          className="max-h-[120px] mt-[20px] mb-[20px]"
          alt="logo"
        />
      </div>
      <div className="flex justify-end">
        <button
          key={"test"}
          className="border-2 border-gray-500 rounded-lg p-2.5 w-30 block bg-yellow-300 text-xl"
          onClick={toggleShowFavourites}
        >
          Favourite Hero
        </button>
      </div>
      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[20px]">
        <div>
          <label className="text-lg text-white">Attribute</label>
          <select
            className="border-2 border-gray-500 rounded-lg p-2.5 w-60 block mt-2 bg-gray-200"
            value={attributeFilter}
            onChange={(e) => setAttributeFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="str">Strength</option>
            <option value="agi">Agility</option>
            <option value="int">Intelligence</option>
          </select>
        </div>
        <div>
          <label className="text-lg text-white">Attack Type</label>
          <select
            className="border-2 border-gray-500 rounded-lg p-2.5 w-60 block mt-2 bg-gray-200"
            value={attackTypeFilter}
            onChange={(e) => setAttackTypeFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Melee">Melee</option>
            <option value="Ranged">Ranged</option>
          </select>
        </div>
        <div>
          <label className="text-lg text-white">Roles</label>
          <select
            className="border-2 border-gray-500 rounded-lg p-2.5 w-60 block mt-2 bg-gray-200"
            value={rolesFilter}
            onChange={(e) => setRolesFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Carry">Carry</option>
            <option value="Support">Support</option>
            <option value="Initiator">Initiator</option>
            <option value="Disabler">Disabler</option>
            <option value="Nuker">Nuker</option>
            <option value="Jungler">Jungler</option>
            <option value="Durable">Durable</option>
            <option value="Escape">Escape</option>
            <option value="Pusher">Pusher</option>
          </select>
        </div>
        <div>
          <label className="text-lg text-white">Search by name</label>
          <input
            className="border-2 border-gray-500 rounded-lg p-2.5 w-60 block mt-2 bg-gray-200"
            type="text"
            placeholder=""
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px] mt-[40px] justify-center ">
        {displayHeroes.map((hero) => (
          <div className="bg-[#1d4031] rounded-[20px] overflow-hidden shadow dark:border-gray-700 p-[20px] max-w-[400px] w-full m-[auto] min-h-[450px] ">
            <div className="flex justify-end items-end mr-[-12px] mt-[-12px]">
              {favouriteHeroes.includes(hero.id) ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeFromFavourites(hero);
                  }}
                >
                  <img
                    src={"/img/star_clicked.png"}
                    alt="star-filled"
                    className="h-[24px] w-[24px]"
                  ></img>
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToFavourites(hero);
                  }}
                >
                  <img
                    src={"/img/star.png"}
                    alt="star"
                    className="h-[24px] w-[24px]"
                  ></img>
                </button>
              )}
            </div>
            <div
              key={hero.id}
              className="bg-center aspect-square bg-cover rounded-[20px] h-[auto] w-[auto]"
              style={{ backgroundImage: "url('/img/newload.jpg')" }}
              onClick={() => {
                window.location.href = `/detail/${hero.localized_name}`;
              }}
            >
              <img
                className="rounded-t-lg h-[200px] p-[40px] w-full "
                src={`https://cdn.dota2.com/apps/dota2/images/heroes/${getHeroName(
                  hero.localized_name
                    .replace(/ /g, "_")
                    .replace(/-/g, "")
                    .toLowerCase()
                )}_lg.png`}
                alt={hero.localized_name}
              />
            </div>
            <h2 className="text-white text-xl font-bold mb-2 mt-4">
              {hero.localized_name}
            </h2>
            <p className="text-white mb-2">
              Primary Attribute:{" "}
              {hero.primary_attr.charAt(0).toUpperCase() +
                hero.primary_attr.slice(1)}
            </p>
            <p className="text-white mb-2">Attack Type: {hero.attack_type}</p>
            <p className="text-white mb-2">Roles: {hero.roles.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default HeroStat;
