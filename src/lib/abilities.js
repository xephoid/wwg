import { STATS } from './stats';

export const ABILITIES = [
  {
    id: "SWA",
    name: "Swashbuckling",
    stat: STATS['Brawn'],
    basic: "You are exceptional at fighting with close range weapons. If you are adjacent to your target. Roll twice and take the higher number. If you are on the same tile as your target, but not adjacent, roll once.",
    advanced: "Expert Combat tactics: You automatically succeed at ship takeover."
  },
  {
    id: "DEM",
    name: "Demolitions",
    stat: STATS['Brawn'],
    basic: "You are best at heavy ranged weapons. You can attack all attackers on your tile.",
    advanced: "Splash Damage: You can target every attacker on an adjacent tile."
  },
  {
    id: "ARM",
    name: "Armor",
    stat: STATS['Brawn'],
    basic: "You are proficient at fighting with heavy combat armor. The inverse of this number becomes an attacker’s CTF. 20% -> 80%, 40% -> 60%, 60% -> 40%, 80% -> 20%",
    advanced: "Reinforced Armor: Attackers roll twice and take the lower roll."
  },
  {
    id: "MEC",
    name: "Mechanics",
    stat: STATS['Smarts'],
    basic: "You are a skilled mechanic. Every time you land at a habitat you may roll MEC, on a success  you repair your ship up 1 level.",
    advanced: "Ms/Mr Fix-it: Every time you arrive at a habitat your ship automatically repairs to Pristine."
  },
  {
    id: "HAK",
    name: "Hacking",
    stat: STATS['Smarts'],
    basic: "You know your way around computer networks. You can roll HAK to disable enemy ships.",
    advanced: "Hackers Delight: Every time you successfully hack a ship you earn 200c."
  },
  {
    id: "RES",
    name: "Research",
    stat: 'Smarts',
    basic: "You are a highly skilled researcher who has learned the safest routes through space and even found some rough maps of ruins. When you start space travel look at the next RES cards and discard as many as you want. 60% -> 1 card, 40% -> 2 cards, 20% -> 3 cards.",
    advanced: "Personal Teleporter: You can look ahead 5 tiles before entering a ruin. To succeed at a mission you must use a round to leave the starting tile."
  },
  {
    id: "PIL",
    name: "Piloting",
    stat: 'Finesse',
    basic: "You know how to fly a spaceship. In space combat, roll twice and take the higher number.",
    advanced: "Flying Ace: You automatically succeed when you run away from space combat."
  },
  {
    id: "SNE",
    name: "Sneaking",
    stat: 'Finesse',
    basic: "You are very good at moving around without being seen. When exploring ruins you can move 2 tiles that have already been revealed.",
    advanced: "Personal Cloaking: Attackers in ground combat cannot attack you unless you attack them."
  },
  {
    id: "GUN",
    name: "Gunslinging",
    stat: 'Finesse',
    basic: "You are skilled with long range weapons. Your range is 1 tile. You can attack targets on any adjacent tile with line of sight.",
    advanced: "Sniper: During ground combat you can roll twice and take the higher roll."
  },
  {
    id: "LEA",
    name: "Leadership",
    stat: 'Moxie',
    basic: "You have a magnetic personality and inspire others to be their best. When recruiting, roll twice and take the higher number.",
    advanced: "Inspirational Leader: All crewmate ability rolls are at least 40%."
  },
  {
    id: "ACT",
    name: "Acting",
    stat: 'Moxie',
    basic: "You are a famous actor who demands high prices for your services. Mission rewards increase in value based on your ACT level. 80% +100, 60% +200, 40% +300, 20% (see advanced skills)",
    advanced: "Je ne sais quoi: Credits earned from missions are double (doesn't compound)."
  },
  {
    id: "DIP",
    name: "Diplomacy",
    stat: 'Moxie',
    basic: "You have experience in politics which have taught you how to turn situations in your favor. \
    Every time you land at a habitat you may roll DIP, on a success you can remove one anger token from each member of your crew.\
    You can roll DIP during ground combat to convert one alliance race attacker to your crew. You must have room in your crew or they leave after the encounter is over.",
    advanced: "Crew anger resets when you land at a habitat."
  },
]