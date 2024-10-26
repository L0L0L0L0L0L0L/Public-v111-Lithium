/*
	Name: Xiuan
	Map: Ruins Excavation Team Camp
	Description: 102040200
*/

function start() {
	cm.sendSimple("#e<Guild Quest: Ruins Excavation Site>#n\r\n\r\nNumber of players: 1~30 \r\n Level range: 1~200 \r\n All members of the same guild \r\nTime limit: 120 minutes\r\n\r\nThe path to the ruins is here, what would you like to do? \r\n#L0##bRegister the guild for the guild quest#l\r\n#L1#Join the guild quest#l\r\n#L2#I want to know the details#l");
}

function action(mode, type, selection) {
	switch (selection) {
		case 0:
			if (cm.getPlayerStat("GID") < 1 || cm.getPlayerStat("GRANK") > 2) {
				cm.sendOk("To register for the guild quest, the guild master must register with me.");
				cm.dispose();
				return;
			}
			var em = cm.getEventManager("GuildQuest");
			var prop = em.getProperty("state");

			if ((prop == null || prop == 0) && em.getInstance("GuildQuest") == null) {
				em.startInstance(cm.getPlayer(), cm.getPlayer().getName());
				cm.guildMessage("The guild has started the Guild Defense Battle <Channel:" + cm.getClient().getChannel() + ">. Guild members, please head to the Ruins Excavation Team Camp to participate in the Guild Defense Battle as soon as possible.");
				cm.dispose();
				return;
			}
			cm.sendOk("Sorry, another guild is already conducting the Guild Defense Battle.");
			cm.dispose();
			break;
		case 1:
			if (cm.getPlayerStat("GID") < 1) {
				cm.sendOk("If you are not part of a guild, you cannot participate in the guild quest.");
				cm.dispose();
				return;
			}
			var em = cm.getEventManager("GuildQuest");
			var eim = em.getInstance("GuildQuest");
			if (eim == null) {
				cm.sendOk("Sorry, there is no registered guild quest in this channel. Please check if your guild is planning a guild quest.");
				cm.dispose();
				return;
			}
			if (em.getProperty("guildid") != null && !em.getProperty("guildid").equalsIgnoreCase("" + cm.getPlayerStat("GID"))) {
				cm.sendOk("Your guild is not registered for the guild quest in this channel.");
				cm.dispose();
				return;
			}
			if (em.getProperty("state") == 0) {
				eim.registerPlayer(cm.getPlayer());
				cm.dispose();
				return;
			}
			cm.sendOk("Sorry, the entrance to the waiting area is already closed. Please contact your guild leader for further information.");
			break;
		case 2:
			var chat = "\r\n\r\n\tTeam requirements:\r\n";
			chat += "\r\n\t- 1 member #bLevel 30 or below#k";
			chat += "\r\n\t- 1 member #bThief with max Haste and Stealth#k";
			chat += "\r\n\t- 1 member #bMage with max Teleport#k";
			chat += "\r\n\t- 1 member #bRanged class, such as Archer, Assassin, or Gunslinger#k";
			chat += "\r\n\t- 1 member #bHighly mobile class, such as a Thief with Double Jump#k";

			cm.sendOk("#e<Guild Quest: Ruins Excavation Site>#n\r\n\r\nWork together with your guild members to reclaim Rubin from the skeletons. The guild quest includes many puzzles and challenges, as well as the ruins waiting to be unearthed. Only through cooperation will you be able to earn great rewards and accumulate guild points." + chat);
	}
	cm.dispose();
}
