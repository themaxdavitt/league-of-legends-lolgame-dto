import {
	LolGamePlayerItemEvent,
	LolGamePlayerWardEvent,
	LolGamePlayerSkillLevelUpEvent,
} from "./event";
import { Position } from "./position";

/**
 * Information about a player at a specific point in the game.
 */
export type LolGamePlayerSnapshot = {
	/**
	 * Timestamp of the event expressed in seconds from the game start, with possible ms precision
	 */
	timestamp: number;
	/**
	 * Current gold (at the time of the snapshot)
	 */
	currentGold: number;
	/**
	 * Total gold earned
	 */
	totalGold: number;
	/**
	 * Total gold difference with the opponent in the same role
	 */
	totalGoldDiff?: number;
	/**
	 * Current experience
	 */
	xp: number;
	/**
	 * Experience difference with the opponent in the same role
	 */
	xpDiff: number;
	/**
	 * Current champion level
	 */
	level: number;
	/**
	 * Total number of minions and monsters killed
	 */
	cs: number;
	/**
	 * Total CS difference with the opponent in the same role
	 */
	csDiff?: number;
	/**
	 * Total monsters (neutral minions) killed
	 */
	monstersKilled: number;
	/**
	 * Total monsters killed difference with the opponent in the same role
	 */
	monstersKilledDiff: number;
	/**
	 * Player position, `undefined` for the last "snapshot"
	 */
	position?: Position;
};

/**
 * A single rune used by one of the players.
 */
export type LolGamePlayerRune = {
	/**
	 * Primary tree, secondary tree, then stats perks
	 */
	slot: number;
	/**
	 * Referring to Riot API rune ID
	 */
	id: number;
	/**
	 * Optional rune name for convenience
	 */
	name?: string;
	/**
	 * Riot-provided end-of-game statistics for the rune
	 */
	stats: Array<number>;
};

/**
 * A single item that a player possessed at the end of the game.
 */
export type LolGamePlayerItem = {
	/**
	 * Goes from 0 to 6 as of 2020
	 */
	slot: 0 | 1 | 2 | 3 | 4 | 5 | 6;
	/**
	 * Referring to Riot API item ID
	 */
	id: number;
	/**
	 * Optional item name for convenience
	 */
	name?: string;
};

/**
 * A single summoner spell chosen by a player.
 */
export type LolGamePlayerSummonerSpell = {
	/**
	 * 0 or 1
	 */
	slot: 0 | 1;
	/**
	 * Referring to Riot API summoner spell ID
	 */
	id: number;
	/**
	 * Optional summoner spell name for convenience
	 */
	name?: string;
};

/**
 * End of game stats for a player in a game.
 */
export type LolGamePlayerEndOfGameStats = {
	/**
	 * List of end of game items.
	 *
	 * Items are simply an array with the 'slot' field defining which item slot they occupied.
	 *
	 * The list cannot be simply indexed on this 'slot' as many players have empty slots at the end of games.
	 */
	items: Array<LolGamePlayerItem>;
	/**
	 * `true` if the player performed the first blood
	 */
	firstBlood: boolean;
	/**
	 * `true` if the player assisted the first blood kill
	 */
	firstBloodAssist: boolean;
	/**
	 * `true` if the player dealt the last hit to the first tower kill
	 */
	firstTower: boolean;
	/**
	 * `true` if the player assisted the first tower kill
	 */
	firstTowerAssist: boolean;
	/**
	 * `true` if the player dealt the last hit to the first inhibitor kill
	 */
	firstInhibitor: boolean;
	/**
	 * `true` if the player assisted in the first inhibitor kill
	 */
	firstInhibitorAssist: boolean;
	/**
	 * Kills at end of game.
	 */
	kills: number;
	/**
	 * Deaths at end of game.
	 */
	deaths: number;
	/**
	 * Assists at end of game.
	 */
	assists: number;
	/**
	 * Gold at end of game.
	 */
	gold: number;
	/**
	 * CS at end of game.
	 */
	cs: number;
	/**
	 * Level at end of game.
	 */
	level: number;
	/**
	 * Wards placed throughout game.
	 */
	wardsPlaced: number;
	/**
	 * Wards killed throughout game.
	 */
	wardsKilled: number;
	/**
	 * Vision wards bought throughout game.
	 */
	visionWardsBought: number;
	/**
	 * Vision score at end of game.
	 */
	visionScore: number;
	/**
	 * Number of a time a player has initiated a killing spree (2 or more consecutive kills)
	 */
	killingSprees: number;
	/**
	 * Largest consecutive kills, above 0 only if it reached at least 2
	 */
	largestKillingSpree: number;
	/**
	 * Number of double kills throughout the game.
	 */
	doubleKills: number;
	/**
	 * Number of triple kills throughout the game.
	 */
	tripleKills: number;
	/**
	 * Number of quadra kills throughout the game.
	 */
	quadraKills: number;
	/**
	 * Number of penta kills throughout the game.
	 */
	pentaKills: number;
	/**
	 * Tower kills at end of game.
	 */
	towerKills: number;
	/**
	 * Inhibitor kills at end of game.
	 */
	inhibitorKills: number;
	/**
	 * Monster (neutral minion) kills at end of game.
	 */
	monsterKills: number;
	/**
	 * Monster (neutral minion) kills in allied jungle at end of game.
	 */
	monsterKillsInAlliedJungle: number;
	/**
	 * Monster (neutral minion) kills in enemy jungle at end of game.
	 */
	monsterKillsInEnemyJungle: number;
	/**
	 * Total damage dealt during game, including damage to minions and monsters.
	 *
	 * Total true damage dealt can be calculated by subtracting physical and magic damage to the total.
	 */
	totalDamageDealt: number;
	/**
	 * Physical damage dealt during game.
	 */
	physicalDamageDealt: number;
	/**
	 * Magic damage dealt during game.
	 */
	magicDamageDealt: number;
	/**
	 * Total damage dealt to champions during game.
	 *
	 * Total true damage dealt can be calculated by subtracting physical and magic damage to the total.
	 */
	totalDamageDealtToChampions: number;
	/**
	 * Physical damage dealt to champions during game.
	 */
	physicalDamageDealtToChampions: number;
	/**
	 * Magic damage dealt to champions during game.
	 */
	magicDamageDealtToChampions: number;
	/**
	 * Damage dealt to objectives during game.
	 */
	damageDealtToObjectives: number;
	/**
	 * Damage dealt to turrets during game.
	 */
	damageDealtToTurrets: number;
	/**
	 * Longest time spent living, in seconds.
	 */
	longestTimeSpentLiving: number;
	/**
	 * Full raw damage of the largest critical strike
	 */
	largestCriticalStrike: number;
	/**
	 * Gold spent by player throughout game.
	 *
	 * Can be useful to try and identify AFK players?
	 */
	goldSpent: number;
	/**
	 * @todo Document this field
	 */
	totalHeal: number;
	/**
	 * @todo Document this field
	 */
	totalUnitsHealed: number;
	/**
	 * @todo Document this field
	 */
	damageSelfMitigated: number;
	/**
	 * @todo Document this field
	 */
	totalTimeCCDealt: number;
	/**
	 * @todo Document this field
	 */
	timeCCingOthers: number;
};

/**
 * A player in a LoL game.
 *
 * All player-specific information should be present here.
 */
export type LolGamePlayer = {
	/**
	 * Usually equal to participantId in Riot’s API. Meant to identify the player in kills
	 */
	id: number;
	/**
	 * The in-game name is not linked to a particular data source and should be unique
	 */
	inGameName: string;
	/**
	 * Refers to Riot API icon ID
	 */
	profileIconId: string;
	/**
	 * Role values are TOP, JGL, MID, BOT, SUP as of 2020.
	 *
	 * /!\ This field should be curated if it is present /!\
	 */
	role?: "TOP" | "JGL" | "MID" | "BOT" | "SUP";
	/**
	 * Referring to Riot API champion ID
	 */
	championId: number;
	/**
	 * Optional champion name for convenience
	 */
	championName?: string;
	/**
	 * Unique identifiers are the ways to identify this player in the data sources used to gather the data.
	 *
	 * Any key that is present in game['sources'] should also be present here
	 *
	 * A Riot API 'uniqueIdentifiers' dict looks like: `{ 'riot': { 'accountId': string, 'platformId': string } }`
	 */
	uniqueIdentifiers: Record<string, object>;
	/**
	 * Refers to Riot rune tree ID
	 */
	primaryRuneTreeId: number;
	/**
	 * Optional name for human readability
	 */
	primaryRuneTreeName?: string;
	/**
	 * Refers to Riot rune tree ID
	 */
	secondaryRuneTreeId: number;
	/**
	 * Optional name for human readability
	 */
	secondaryRuneTreeName?: string;
	/**
	 * Player's runes
	 */
	runes: Array<LolGamePlayerRune>;
	/**
	 * 2-item list of player's summoner spells
	 */
	summonerSpells: Array<LolGamePlayerSummonerSpell>;
	/**
	 * End of game stats like total kills, damage, vision score, ...
	 */
	endOfGameStats: LolGamePlayerEndOfGameStats;
	/**
	 * Snapshots represent player-specific information at a given timestamp.
	 *
	 * Timestamp could be used as keys but JSON does not allow for integer keys.
	 *
	 * This is therefore simply an array, and you should not expect it to be indexed or sorted in any particular way.
	 */
	snapshots: Array<LolGamePlayerSnapshot>;
	/**
	 * Item events is an array of item buys, sell, and undo
	 */
	itemsEvents: Array<LolGamePlayerItemEvent>;
	/**
	 * Ward events are an array of wards placed and destroyed
	 */
	wardsEvents: Array<LolGamePlayerWardEvent>;
	/**
	 * Skill level up events are every time the player used a skill or evolution point
	 */
	skillsLevelUpEvents: Array<LolGamePlayerSkillLevelUpEvent>;
};
