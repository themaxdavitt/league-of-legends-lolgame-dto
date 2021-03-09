import { Position } from "./position";

/**
 * A single event that took place during a LoL game.
 *
 * Should not be used as-is and is intended to be a building block for other event types.
 */
export type LolEvent = {
	/**
	 * Timestamp of the event expressed in seconds from the game start, with possible ms precision
	 */
	timestamp: number;
	/**
	 * Position where the event took place
	 *
	 * In the Riot API only champion kills and monster kills have a position associated to them
	 */
	position?: Position;
};

/**
 * A single kill in a LoL game
 */
export type LolGameKill = LolEvent & {
	/**
	 * ID (from player object) of the player getting the last hit on the kill, `undefined` for executions
	 */
	killerId?: number;
	/**
	 * Array of IDs (from player objects) of players getting an assist in the kill
	 */
	assistsIds: Array<number>;
	/**
	 * ID (from player object) of the player getting killed
	 */
	victimId: number;
};

/**
 * A monster kill for a team.
 */
export type LolGameTeamMonsterKill = LolEvent & {
	/**
	 * ID (from player object) of the player landing the last hit on the monster
	 */
	killerId: number;
	/**
	 * Monster type
	 */
	type: "DRAGON" | "BARON" | "RIFT_HERALD";
	/**
	 * Monster sub-type
	 */
	subType?: "CLOUD" | "INFERNAL" | "MOUNTAIN" | "OCEAN" | "ELDER";
};

/**
 * A building kill for a team.
 */
export type LolGameTeamBuildingKill = LolEvent & {
	/**
	 * ID (from player object) of the player landing the last hit on the building
	 */
	killerId?: number;
	/**
	 * Building type
	 */
	type: "TURRET" | "INHIBITOR";
	/**
	 * Lane building is in
	 */
	lane: "TOP" | "MID" | "BOT";
	/**
	 * Side building is in
	 */
	side: "BLUE" | "RED";
	/**
	 * Location of tower
	 */
	towerLocation?: "OUTER" | "INNER" | "INHIBITOR" | "NEXUS";
};

/**
 * An item-related event for a player.
 *
 * Represents buying, selling, destroying, and undoing items.
 */
export type LolGamePlayerItemEvent = LolEvent & {
	/**
	 * Item event type
	 */
	type: "PURCHASED" | "SOLD" | "UNDO" | "DESTROYED";
	/**
	 * Riot API item ID, resulting item in case of an UNDO
	 */
	id: number;
	/**
	 * Convenience field for human readability
	 */
	name: string;
	/**
	 * Riot API item ID of the item that was undone in an UNDO event
	 */
	undoId?: number;
};

/**
 * A ward-related event for a player.
 *
 * Represents placing and killing wards.
 */
export type LolGamePlayerWardEvent = LolEvent & {
	/**
	 * Ward event type
	 */
	type: "PLACED" | "KILLED";
	/**
	 * Ward type
	 */
	wardType:
		| "YELLOW_TRINKET"
		| "CONTROL_WARD"
		| "SIGHT_WARD"
		| "YELLOW_TRINKET_UPGRADE"
		| "BLUE_TRINKET"
		| "TEEMO_MUSHROOM"
		| "VISION_WARD"
		| "UNDEFINED";
};

/**
 * A skill level up by a player.
 */
export type LolGamePlayerSkillLevelUpEvent = LolEvent & {
	/**
	 * Level up type
	 */
	type: "NORMAL" | "EVOLVE";
	/**
	 * Skill slot
	 */
	slot: 1 | 2 | 3 | 4;
};
