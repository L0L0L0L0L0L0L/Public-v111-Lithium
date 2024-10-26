/*
	名字:	破風使者之路
	地圖:	耶雷弗
	描述:	130000000
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendNext("Go ahead, think it through.");
		qm.dispose();
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20103)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(20103).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendYesNo("Have you made your decision? You know you can't go back on it. It's intelligent decisions like this that'll make or break you.");
			break;
	case 1:
		qm.sendNext("From here on out. you will be a Wind Archer. Now, it's time for me to share my abilities with you.");
		break;
	case 2:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20103)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(20103).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(1300);
			qm.resetStats(4, 25, 4, 4);
			qm.expandInventory(1, 4);
			qm.expandInventory(4, 4);
			qm.gainItem(1452051, 1);
			qm.gainItem(1142066, 1);
			qm.gainItem(2060000, 500);
			qm.getPlayer().gainSP(1, 0);
			qm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(10009000), 1, 1, -1);
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("You learned the Pig's Weakness Skill."));
			}
			qm.sendNextPrev("You are now a Wind Archer. To better yourself, use the Stat Window (S) to raise the appropriate stats. If you aren't sure what to raise, just click on #bAuto#k.");
			break;
	case 3:
		qm.sendNextPrev("As a Wind Archer, you'll need to carry a lot of items with you, so I have also expanded your Inventory slot counts for your Equip and Etc windows.");
		break;
	case 4:
		qm.sendNextPrev("I have also given you a bit of #bSP#k, so open the #bSkill Menu#k to acquire new skills. Of course, you can't raise them all at once, and there are some skills out there you won't be able to acquire unless you master the basic skills first.");
		break;
	case 5:
		qm.sendNextPrev("Unlike your days as a Noblesse, once you become a Wind Archer, you will lose a portion of your EXP when you run out of HP. Please be careful.");
		break;
	case 6:
		qm.sendNextPrev("Now go out there and show the world that the Cygnus Knights are the most elite group in all of Maple World.");
		break;
	case 7:
		qm.dispose();
}
}