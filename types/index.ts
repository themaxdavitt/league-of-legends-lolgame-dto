import { LolGameTeam } from "./team";

type TeamSide = "BLUE" | "RED";

/**
 * A single pick or ban in a LoL game.
 *
 * The `ban` and `team` fields are required to account for possibly changing picks and bans formats.
 */
export type LolPickBan = {
	/**
	 * Champion ID
	 */
	championId: number;
	/**
	 * Champion name
	 */
	championName?: string;
	/**
	 * `true` if this represents a ban, `false` if it represents a pick
	 */
	isBan: boolean;
	/**
	 * Team that performed the pick or ban
	 */
	team: TeamSide;
};

/**
 * A single League of Legends game.
 */
export type LolGame = {
	/**
	 * All information necessary to identify the game for a given data source.
	 */
	sources: Record<string, object>;
	/**
	 * Game duration in seconds
	 */
	duration: number;
	/**
	 * Match start date/time, expressed as an ISO 8601 date with second precision
	 */
	start: string;
	/**
	 * Patch following XX.YY nomenclature
	 */
	patch: string;
	/**
	 * Full game version expressed as XX.YY.ZZ.αα, allowing to distinguish micro patches
	 */
	gameVersion: string;
	/**
	 * Winning team
	 */
	winner: TeamSide;
	/**
	 * Object mapping team side to data
	 */
	teams: Record<TeamSide, LolGameTeam>;
	/**
	 * Name of the tournament this game is a part of
	 */
	tournament?: string;
	/**
	 * Game index in the series including this game
	 */
	gameInSeries?: number;
	/**
	 * VOD url
	 */
	vod?: string;
	/**
	 * Ordered array of picks and bans that happened in the game
	 */
	picksBans?: Array<LolPickBan>;
};
