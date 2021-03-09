/**
 * A position on the LoL map. Values have a minimum of `-120` and a maximum of `14870`.
 */
export type Position = {
	/**
	 * Horizontal distance from bottom left of the map
	 */
	x: number;
	/**
	 * Vertical distance from bottom left of the map
	 */
	y: number;
};
