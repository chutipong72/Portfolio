export function getHeroName(localized_name: string) {
    const hero = localized_name.replace(/ /g, "_")
                .replace(/-/g, "")
                .toLowerCase()
    const heroDictionary = {
      zeus: "zuus",
      shadow_fiend: "nevermore",
      vengeful_spirit: "vengefulspirit",
      windranger: "windrunner",
      necrophos: "necrolyte",
      outworld_devourer: "obsidian_destroyer",
      queen_of_pain: "queenofpain",
      wraith_king: "skeleton_king",
      underlord: "abyssal_underlord",
      anti_mage: "antimage",
      clockwerk: "rattletrap",
      doom: "doom_bringer",
      magnus: "magnataur",
      "nature's_prophet": "furion",
      lifestealer: "life_stealer",
      treant_protector: "treant",
      io: "wisp",
      centaur_warrunner: "centaur",
      timbersaw: "shredder",
    };
    if (heroDictionary[hero]) {
      return heroDictionary[hero] as string;
    }
    return hero;
  }
