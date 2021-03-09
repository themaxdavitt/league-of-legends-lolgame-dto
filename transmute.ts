import { Schemas } from "@themaxdavitt/riot-games-apis";
import { LolGame } from "./types";
import { LolGameTeam, LolGameTeamEndOfGameStats } from "./types/team";
import { LolGamePlayerRune } from "./types/player";

type RiotGameIdentifier = {
	gameId: number;
	platformId: string;
};

export async function matchToGame({
	matchDto,
	addNames = false,
}: {
	/**
	 * A MatchDto from Riot’s API
	 */
	matchDto: Schemas.MatchV4MatchDto;
	/**
	 * Whether or not to add names for human readability in the DTO.
	 *
	 * @default false
	 */
	addNames: boolean;
}): Promise<LolGame> {
	const riotSource = {
		riotLolApi: {
			gameId: matchDto.gameId,
			platformId: matchDto.platformId,
		} as RiotGameIdentifier,
	};

	const dateTime = new Date(matchDto.gameCreation).toISOString();
	const patch = matchDto.gameVersion.split(".").slice(0, 2).join(".");
	const winner =
		(matchDto.teams[0].teamId == 100) == (matchDto.teams[0].win === "Win")
			? "BLUE"
			: "RED";
	let blueTeam, redTeam;

	for (const team of matchDto.teams) {
		const side = team.teamId === 100 ? "BLUE" : "RED";
		const endOfGameStats: LolGameTeamEndOfGameStats = {
			riftHeraldKills: team.riftHeraldKills,
			dragonKills: team.dragonKills,
			baronKills: team.baronKills,
			towerKills: team.towerKills,
			inhibitorKills: team.inhibitorKills,
			firstTower: team.firstTower,
			firstInhibitor: team.firstInhibitor,
			firstRiftHerald: team.firstRiftHerald,
			firstDragon: team.firstDragon,
			firstBaron: team.firstBaron,
		};
		const bans = team.bans.map((b) => b.championId);
		const players = [];

		for (const participant of matchDto.participants) {
			if (participant.teamId != team.teamId) {
				continue;
			} else {
				let participantIdentity:
					| Schemas.MatchV4PlayerDto
					| undefined = matchDto.participantIdentities.filter(
					(p) => p.participantId === participant.participantId
				)[0]?.player;
				let uniqueIdentifier = {};
				if (typeof participantIdentity?.accountId !== "undefined") {
					uniqueIdentifier = {
						riotLolApi: {
							accountId: participantIdentity.accountId,
							platformId: participantIdentity.platformId,
						},
					};
				}

				const runes: Array<LolGamePlayerRune> = [
					{
						id: participant.stats.perk0!,
						slot: 0,
						stats: [
							participant.stats.perk0Var1!,
							participant.stats.perk0Var2!,
							participant.stats.perk0Var3!,
						],
					},
					{
						id: participant.stats.perk1!,
						slot: 1,
						stats: [
							participant.stats.perk1Var1!,
							participant.stats.perk1Var2!,
							participant.stats.perk1Var3!,
						],
					},
					{
						id: participant.stats.perk2!,
						slot: 2,
						stats: [
							participant.stats.perk2Var1!,
							participant.stats.perk2Var2!,
							participant.stats.perk2Var3!,
						],
					},
					{
						id: participant.stats.perk3!,
						slot: 3,
						stats: [
							participant.stats.perk3Var1!,
							participant.stats.perk3Var2!,
							participant.stats.perk3Var3!,
						],
					},
					{
						id: participant.stats.perk4!,
						slot: 4,
						stats: [
							participant.stats.perk4Var1!,
							participant.stats.perk4Var2!,
							participant.stats.perk4Var3!,
						],
					},
					{
						id: participant.stats.perk5!,
						slot: 5,
						stats: [
							participant.stats.perk5Var1!,
							participant.stats.perk5Var2!,
							participant.stats.perk5Var3!,
						],
					},
				];
				runes.push(
					{
						id: participant.stats.statPerk0!,
						slot: 6,
						stats: [],
					},
					{
						id: participant.stats.statPerk1!,
						slot: 7,
						stats: [],
					},
					{
						id: participant.stats.statPerk2!,
						slot: 8,
						stats: [],
					}
				);

				// Leaving off here: https://github.com/mrtolkien/riot_transmute/blob/master/riot_transmute/match_to_game.py#L119
			}
		}

		//const teamDto: LolGameTeam = {
		//
		//};
	}

	const game: LolGame = {
		sources: riotSource,
		duration: matchDto.gameDuration,
		start: dateTime,
		patch,
		gameVersion: matchDto.gameVersion,
		winner,
		teams: {},
	};
}
