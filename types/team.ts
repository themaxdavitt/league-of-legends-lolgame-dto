import { LolGamePlayer } from "./player";
import { LolGameTeamMonsterKill, LolGameTeamBuildingKill } from "./event";

/**
 * End of game stats pertaining the whole team.
 *
 * Structure kills need to be related to team as they can be killed by minions
 *
 * Epic monsters kills are linked to teams as it makes little sense to link them to individual players
 */
export type LolGameTeamEndOfGameStats = {
	/**
	 * Total tower kills
	 */
	towerKills: number;
	/**
	 * Total inhibitor kills
	 */
	inhibitorKills: number;
	/**
	 * `true` if the team killed the first tower
	 */
	firstTower: boolean;
	/**
	 * `true` if the team killed the first inhibitor
	 */
	firstInhibitor: boolean;
	/**
	 * Total rift herald kills
	 */
	riftHeraldKills: number;
	/**
	 * Total dragon kills
	 */
	dragonKills: number;
	/**
	 * Total baron kills
	 */
	baronKills: number;
	/**
	 * `true` if the team killed the first Rift Herald
	 */
	firstRiftHerald: boolean;
	/**
	 * `true` if the team killed the first Dragon
	 */
	firstDragon: boolean;
	/**
	 * `true` if the team killed the first Nashor
	 */
	firstBaron: boolean;
};

/**
 * One of the two teams taking part in a LoL game.
 *
 * The key referring to this object is what defines its side.
 *
 * Team-related bans are a list of champions that were banned by players on the team
 */
export type LolGameTeam = {
	/**
	 * Players are defined as a simple array as no obvious key emerges
	 */
	players: Array<LolGamePlayer>;
	/**
	 * List of banned champion IDs
	 */
	bans?: Array<number>;
	/**
	 * List of banned champion names for human readability
	 */
	bansNames?: Array<string>;
	/**
	 * End of game stats
	 */
	endOfGameStats: LolGameTeamEndOfGameStats;
	/**
	 * Team monsters kills
	 */
	monstersKills: Array<LolGameTeamMonsterKill>;
	/**
	 * Team monsters kills
	 */
	buildingsKills: Array<LolGameTeamBuildingKill>;
	/**
	 * The actual name of the team (T1, Fnatic, TSM, ...)
	 */
	name?: string;
	/**
	 * Unique identifiers are the ways to identify this team in the data sources used to gather the data.
	 */
	uniqueIdentifiers: Record<string, object>;
};
