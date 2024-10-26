/*
    Name:    Cave Entrance
    Map:     Rocky Cave
    Description: 300010410
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
		case -1:
			cm.dispose();
			return;
		case 0:
			if (status < 1) {
				cm.dispose();
				return;
			}
			status--;
			break;
		case 1:
			status++;
			break;
	}
	switch (status) {
		case 0:
			var time = parseInt(cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2133005)).getCustomData());
			var stime = ((1 * 3600000) - (cm.getCurrentTime() - time)) / 1000 / 60;
			if (time + (1 * 3600000) > cm.getCurrentTime()) {
				cm.sendOk("The entrance has been sealed by Chao Wu. The passage will reopen in " + Math.floor(stime / 60) + " hours and " + Math.round(stime % 60) + " minutes.");
				cm.dispose();
				return;
			}
			cm.sendYesNo("This path leads deeper into the cave. Are you sure you want to enter?");
			break;
		case 1:
			var em = cm.getEventManager("chowBoss");
			var prop = em.getProperty("state");
			if (prop == null || prop == 0) {
				if (cm.getPlayer().getParty() == null) {
					em.startInstance(cm.getPlayer());
					cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2133005)).setCustomData("" + cm.getCurrentTime());
					cm.dispose();
					return;
				}
				em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
				cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2133005)).setCustomData("" + cm.getCurrentTime());
				cm.dispose();
				return;
			}
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "The deeper part of the cave is currently crowded. Please try again later."));
			cm.dispose();
	}
}
