import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getHeroName } from "./utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HeroDetail {
  id: number;
  name: string;
  localized_name: string;
  primary_attr: string;
  attack_type: string;
  roles: string[];
  img: string;
  icon: string;
  base_health: number;
  base_health_regen: number;
  base_mana: number;
  base_mana_regen: number;
  base_armor: number;
  base_mr: number;
  base_attack_min: number;
  base_attack_max: number;
  base_str: number;
  base_agi: number;
  base_int: number;
  str_gain: number;
  agi_gain: number;
  int_gain: number;
  attack_range: number;
  projectile_speed: number;
  attack_rate: number;
  base_attack_time: number;
  attack_point: number;
  move_speed: number;
  turn_rate: number;
  cm_enabled: boolean;
  legs: number;
  day_vision: number;
  night_vision: number;
  hero_id: number;
  turbo_picks: number;
  turbo_wins: number;
  pro_ban: number;
  pro_win: number;
  pro_pick: number;
}

interface HeroAbility {
  hero: {
    id: number;
    name: string;
    abilities: {
      ability: {
        id: number;
        name: string;
        attributes: {
          name: string;
          value: string;
          __typename: string;
        }[];
        stat: {
          manaCost: number[] | null;
          cooldown: number[] | null;
          hasScepterUpgrade: boolean;
          isGrantedByScepter: boolean;
          isGrantedByShard: boolean;
          unitDamageType: number;
          dispellable: string;
          spellImmunity: number;
          castRange: number[] | null;
          behavior: number;
          unitTargetTeam: number;
          unitTargetType: number;
          maxLevel: number | null;
          __typename: string;
        };
        language: {
          lore: string | null;
          description: string[];
          notes: string[];
          shardDescription: string | null;
          aghanimDescription: string | null;
          attributes: {
            name: string;
            value: string;
            __typename: string;
          }[];
          __typename: string;
        };
        __typename: string;
      };
      __typename: string;
    }[];
    stats: {
      attackRange: number;
      __typename: string;
    };
    __typename: string;
  };
  __typename: string;
}

const HeroDetail = ({}) => {
  const [hero, setHero] = useState<HeroDetail | null>(null);
  const [heroAbilities, setHeroAbilities] = useState<HeroAbility | null>(null);
  const { localized_name } = useParams();
  const targetDict = {
    0: "PASSIVE",
    1: "Unit Target",
    2: "Point Target",
    3: "Tree Target",
    4: "No Target",
    5: "Point or Tree Target",
    6: "Unit or Point Target",
    7: "Unit or Point or Tree Target",
    8: "Building Target",
    9: "Rune Target",
    10: "Tree or No Target",
    11: "Item Target",
    12: "Item or Point Target",
    13: "Item or Unit Target",
    14: "Item or Tree Target",
    15: "Item or No Target",
    16: "Item or Point or Tree Target",
    17: "Item or Unit or Point Target",
    18: "Item or Unit or Point or Tree Target",
    19: "Item or Building Target",
    20: "Item or Rune Target",
    21: "Item or Tree or No Target",
    22: "Item or Building or No Target",
    23: "Item or Building or Point Target",
    24: "Item or Building or Unit Target",
    25: "Item or Building or Tree Target",
    26: "Item or Building or Point or Tree Target",
    27: "Item or Building or Unit or Point Target",
    28: "Item or Building or Unit or Point or Tree Target",
    29: "Item or Building or Rune Target",
    30: "Item or Building or Tree or No Target",
    31: "Item or Building or Rune or No Target",
    32: "Item or Building or Rune or Point Target",
    33: "Item or Building or Rune or Unit Target",
    34: "Item or Building or Rune or Tree Target",
    35: "Item or Building or Rune or Point or Tree Target",
    36: "Item or Building or Rune or Unit or Point Target",
    37: "Item or Building or Rune or Unit or Point or Tree Target",
    38: "Item or Building or Rune or Unit or Tree Target",
    39: "Item or Building or Rune or Unit or Point or Tree Target",
    40: "Item or Building or Rune or Tree or No Target",
    41: "Item or Building or Rune or Unit or Tree or No Target",
    42: "Item or Building or Rune or Unit or Point or Tree or No Target",
  };
  const unitDamageTypeDict = {
    1: "Physical",
    2: "Magical",
    4: "Pure",
  };
  const spellImmunityDict = {
    4: "No",
    3: "Yes",
  };
  const fetchHeroAbilities = async (heroId: number) => {
    const response = await fetch("https://api.stratz.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTdWJqZWN0IjoiMjgyODVkNGItYWU1Ny00OGQyLTk0N2UtMTg0ZjU4ODZiMjkyIiwiU3RlYW1JZCI6IjExMTQwNDE0NSIsIm5iZiI6MTcxMDc2MzY2OCwiZXhwIjoxNzQyMjk5NjY4LCJpYXQiOjE3MTA3NjM2NjgsImlzcyI6Imh0dHBzOi8vYXBpLnN0cmF0ei5jb20ifQ.19Xa7CPiGC12Vof9nI5E0rCKn14KLkNdjCNB7gGBuuw",
      },
      body: JSON.stringify({
        operationName: "GetHeroAbilitiesDescriptions",
        variables: {
          heroId: heroId,
          languageEnum: "THAI",
        },
        query:
          "query GetHeroAbilitiesDescriptions($heroId: Short!, $languageEnum: Language) {  constants {    hero(id: $heroId, language: $languageEnum) {      id      name      abilities {        ability {          id          name          attributes {            name            value            __typename          }          stat {            manaCost            cooldown            hasScepterUpgrade            isGrantedByScepter            isGrantedByShard            unitDamageType            dispellable            spellImmunity            castRange            behavior            unitTargetTeam            unitTargetType            maxLevel            __typename          }          language {            lore            description            notes            shardDescription            aghanimDescription            attributes            __typename          }          __typename        }        __typename      }      stats {        attackRange        __typename      }      __typename    }    __typename  }}",
      }),
    });

    const data = await response.json();
    return data;
  };
  const fetchAbilityImage = (skillName: string) => {
    return `https://cdn.stratz.com/images/dota2/abilities/${skillName}.png`;
  };
  useEffect(() => {
    const fetchHero = async () => {
      try {
        const response = await fetch("https://api.opendota.com/api/heroStats");
        const data = await response.json();
        const filteredHero = data.find(
          (hero) => hero.localized_name === localized_name
        );
        setHero(filteredHero);
        console.log("filteredHero", filteredHero);
        const mydata = await fetchHeroAbilities(filteredHero?.id);
        setHeroAbilities(mydata.data.constants);
        console.log(mydata.data.constants);
      } catch (error) {
        console.error("Error fetching hero data:", error);
      }
    };

    fetchHero();
  }, [localized_name]);

  if (!hero || !heroAbilities) {
    return <div>Loading...</div>;
  }

  return (
    <TooltipProvider>
      <div className="w-[90%] m-auto max-w-[1100px]">
        <div className="flex justify-center">
          <img
            src="/img/Dota_logo.png"
            className="max-h-[120px] mt-[20px] mb-[20p]"
            alt="logo"
          />
        </div>
        <div className="w-[90%] max-w-[1000px] m-[auto] pt-10">
          <Link
            to={"/"}
            className="bg-gray-500 px-[16px] py-[4px] rounded-[16px] font-semibold"
          >
            Back
          </Link>
          <div className="rounded-[20px] overflow-hidden shadow dark:border-gray-700 p-[16px] m-[auto]">
            <div className="bg-center aspect-square bg-cover rounded-[20px] relative h-[400px]">
              <img
                className="absolute h-[250px] aspect-square translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] blur-xl"
                src={`https://cdn.dota2.com/apps/dota2/images/heroes/${getHeroName(
                  hero.localized_name
                    .replace(/ /g, "_")
                    .replace(/-/g, "")
                    .toLowerCase()
                )}_lg.png`}
                alt=""
              />
              <img
                className="absolute h-[200px] max-h-[400px] aspect-square translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%] rounded-1-lg"
                src={`https://cdn.dota2.com/apps/dota2/images/heroes/${getHeroName(
                  hero.localized_name
                    .replace(/ /g, "_")
                    .replace(/-/g, "")
                    .toLowerCase()
                )}_lg.png`}
                alt={hero.localized_name}
              />
            </div>
            <div className="flex items-end justify-end ml-[-4px] mr-[-4px] mt-[10px]">
              <div className="flex items-end justify-end">
                {heroAbilities?.hero.abilities
                  .filter(
                    (ability) => ability.ability.name !== "generic_hidden"
                  )
                  .map(({ ability }) => (
                    <Tooltip>
                      <TooltipTrigger>
                        <img
                          className="max-h-[64px] max-w-[64px] rounded-[20px] m-[10px] bg-[#253641] border-2 border-gray-500"
                          src={fetchAbilityImage(ability.name)}
                          alt={hero.localized_name}
                        />
                      </TooltipTrigger>
                      <TooltipContent className="flex-col max-w-[700px] max-h-[700px] m-[-3px] text-left leading-[1.5] bg-gray-500 text-[#a29f9f] text-[14px]">
                        <div className="flex-col border-b-4 border-white pl-[6px] pt-[13px] pb-[13px]">
                          <h1 className="capitalize text-white font-bold text-[24px]">
                            {ability.name
                              .replace(
                                getHeroName(hero.localized_name) + "_",
                                ""
                              )
                              .replace("_", " ")}
                          </h1>
                        </div>
                        <div className="border-b-4 border-white pl-[6px] pt-[13px] pb-[13px]">
                          <p>
                            Target :{" "}
                            <span className="text-white">
                              {
                                targetDict[
                                  ability.stat
                                    .unitTargetType as keyof typeof targetDict
                                ]
                              }
                            </span>
                          </p>
                          {ability.stat.dispellable !== "NONE" && (
                            <p>
                              Dispellable:
                              <span
                                className={`${
                                  ability.stat.dispellable === "YES"
                                    ? "text-green-500"
                                    : ability.stat.dispellable === "NO"
                                    ? "text-red-500"
                                    : ""
                                }`}
                              >
                                {ability.stat.dispellable}
                              </span>
                            </p>
                          )}
                          {ability.stat.spellImmunity !== 0 && (
                            <p>
                              PIERCES DEBUFF IMMUNITY:{" "}
                              <span
                                className={`${
                                  ability.stat.spellImmunity === 3
                                    ? "text-green-500"
                                    : ability.stat.spellImmunity === 4
                                    ? "text-red-500"
                                    : ""
                                }`}
                              >
                                {
                                  spellImmunityDict[
                                    ability.stat
                                      .spellImmunity as keyof typeof spellImmunityDict
                                  ]
                                }
                              </span>
                            </p>
                          )}
                          {ability.stat.unitDamageType !== 0 && (
                            <p>
                              DAMAGE TYPE:
                              <span
                                className={`${
                                  ability.stat.unitDamageType === 1
                                    ? "text-red-500"
                                    : ability.stat.unitDamageType === 2
                                    ? "text-blue-500"
                                    : ability.stat.unitDamageType === 4
                                    ? "text-orange-500"
                                    : ""
                                }`}
                              >
                                {
                                  unitDamageTypeDict[
                                    ability.stat
                                      .unitDamageType as keyof typeof unitDamageTypeDict
                                  ]
                                }
                              </span>
                            </p>
                          )}
                        </div>
                        <div className="border-b-4 border-white pl-[6px] pt-[13px] pb-[13px]">
                          {ability.language.description.map((desc) => (
                            <p>
                              <span className="text-red-500"></span>
                              {desc}
                            </p>
                          ))}
                        </div>
                        {ability.attributes && (
                          <div className="pl-[6px] pt-[13px] pb-[13px]">
                            {ability.attributes
                              .filter(
                                (atr) => !atr.name.startsWith("special_bonus")
                              )
                              .map((atr) => (
                                <p className="uppercase">
                                  {atr.name.replace(/_/g, " ")}:{" "}
                                  <span className="text-white">
                                    {atr.value.replace(/ /g, "/")}
                                  </span>
                                </p>
                              ))}
                          </div>
                        )}
                        <div className="flex pl-[6px] pt-[13px] pb-[13px]">
                          {ability.stat.manaCost !== null && (
                            <span className="flex text-white items-center">
                              <img
                                className="mr-[5px] rounded-md w-[16px] h-[16px]"
                                src="/img/mana.png"
                                alt="mana"
                              />
                              {String(ability.stat.manaCost).replace(/,/g, "/")}
                            </span>
                          )}
                          <span className="flex ml-[20px]">
                            {ability.stat.cooldown !== null && (
                              <span className="flex text-white items-center">
                                <img
                                  className="mr-[5px] rounded-md w-[16px] h-[16px]"
                                  src="/img/cooldown.png"
                                  alt="cooldown"
                                />
                                {String(ability.stat.cooldown).replace(
                                  /,/g,
                                  "/"
                                )}
                              </span>
                            )}
                          </span>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  ))}
              </div>

              {/* <div className="flex flex-col items-center justify-center h-[64px] w-[64px] rounded-[20px] m-[10px] bg-[#253641] border-2 border-gray-500">
                <img
                  className="w-[60%]"
                  src="/img/scepter_0.png"
                  alt="Scepter"
                />
                <img className="w-[60%]" src="/img/shard_0.png" alt="Shard" />
              </div> */}
            </div>
            <div className="pt-5 bg-[#253641] rounded-[30px] p-[20px] my-[20px]">
              <div className="flex justify-between pb-10">
                <h2 className="text-white font-semibold text-4xl tracking-tight">
                  {hero.localized_name.replace(/-/g, " ")}
                </h2>
                <div className="flex bg-black rounded-xl max-w-[400px] p-[10px] justify-end">
                  <p className="flex items-center justify-center text-white text-sm">
                    <div className="bg-red-500 rounded-full flex-shrink-0 h-3 w-3 mr-3 "></div>
                    {hero.base_str}+{hero.str_gain}
                  </p>
                  <p className="flex items-center justify-center text-white text-sm ml-3">
                    <div className="bg-green-500 rounded-full flex-shrink-0 h-3 w-3 mr-2"></div>
                    {hero.base_agi}+{hero.agi_gain}
                  </p>
                  <p className="flex items-center justify-center text-white text-sm ml-3">
                    <div className="bg-blue-500 rounded-full flex-shrink-0 h-3 w-3 mr-3 "></div>
                    {hero.base_int}+{hero.int_gain}
                  </p>
                </div>
              </div>
              <div className="flex ml-[-8px]">
                <div className="flex flex-col flex-1 mt-[10px] p-[8px] text-lg text-[#a29f9f]">
                  <div>
                    Base Health:{" "}
                    <span className="text-white">{hero.base_health}</span>
                  </div>
                  <div>
                    Base Health Regen:{" "}
                    <span className="text-white">{hero.base_health_regen}</span>
                  </div>
                  <div>
                    Base Mana:{" "}
                    <span className="text-white">{hero.base_mana}</span>
                  </div>
                  <div>
                    Base Mana Regen:{" "}
                    <span className="text-white">{hero.base_mana_regen}</span>
                  </div>
                  <div>
                    Base Armor:{" "}
                    <span className="text-white">{hero.base_armor}</span>
                  </div>
                  <div>
                    Base Magic Resistance:{" "}
                    <span className="text-white">{hero.base_mr}</span>
                  </div>
                  <div>
                    Base Attack:{" "}
                    <span className="text-white">
                      {hero.base_attack_min}-{hero.base_attack_max}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col flex-1 mt-[10px] p-[8px] text-[#a29f9f] text-lg">
                  <div>
                    Attack Range:{" "}
                    <span className="text-white">{hero.attack_range}</span>
                  </div>
                  <div>
                    Projectile Speed:{" "}
                    <span className="text-white">{hero.projectile_speed}</span>
                  </div>
                  <div>
                    Attack Rate:{" "}
                    <span className="text-white">{hero.attack_rate}</span>
                  </div>
                  <div>
                    Base Attack Time:{" "}
                    <span className="text-white">{hero.base_attack_time}</span>
                  </div>
                  <div>
                    Attack Point:{" "}
                    <span className="text-white">{hero.attack_point}</span>
                  </div>
                  <div>
                    Movement Speed:{" "}
                    <span className="text-white">{hero.move_speed}</span>
                  </div>
                  <div>
                    Day Vision:{" "}
                    <span className="text-white">{hero.day_vision}</span>
                  </div>
                  <div>
                    Night Vision:{" "}
                    <span className="text-white">{hero.night_vision}</span>
                  </div>
                </div>
                <div className="flex flex-col flex-1 mt-[10px] p-[8px] text-lg text-[#a29f9f]">
                  <div>
                    Turbo Picks:{" "}
                    <span className="text-white">{hero.turbo_picks}</span>
                  </div>
                  <div>
                    Turbo Wins:{" "}
                    <span className="text-white">{hero.turbo_wins}</span>
                  </div>
                  <div>
                    Pro Ban: <span className="text-white">{hero.pro_ban}</span>
                  </div>
                  <div>
                    Pro Picks:{" "}
                    <span className="text-white">{hero.pro_pick}</span>
                  </div>
                  <div>
                    Pro Wins: <span className="text-white">{hero.pro_win}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default HeroDetail;
