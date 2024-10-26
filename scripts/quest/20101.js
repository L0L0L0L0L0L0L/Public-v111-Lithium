/*
	名字:	聖魂劍士之路
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
		qm.sendNext("Make your decision carefully.");
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20101)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(20101).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendYesNo("Have you made your decision? The decision will be final, so think carefully before deciding what to do. Are you sure you want to become the Dawn Warrior?");
			break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20101)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(20101).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(1100);
			qm.resetStats(35, 4, 4, 4);
			qm.expandInventory(1, 4);
			qm.expandInventory(4, 4);
			qm.gainItem(1302077, 1);
			qm.gainItem(1142066, 1);
			qm.getPlayer().gainSP(1, 0);
			qm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(10009000), 1, 1, -1);
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("You learned the Pig's Weakness Skill."));
			}
			qm.sendNext("I have just molded your body to be perfect for a Dawn Warrior. If you wish to become more powerful, use the Stat window (S) to raise the appropriate stats. If you aren't sure what to raise, just click on #bAuto#k.");
			break;
	case 2:
		qm.sendNextPrev("I have also expanded your inventory slot counts for your Equip and ETC tabs. Use those slots wisely and fill them up with items required for Knights to carry.");
		break;
	case 3:
		qm.sendNextPrev("I have also given you a hint of #bSP#k, so open the #bSkill Menu#k to acquire new skills. Of course, you can't raise them all at once, and there are some skills out there you won't be able to acquire unless you master the basic skills first.");
		break;
	case 4:
		qm.sendNextPrev("Unlike your time as a Nobless, once you become the Soul Master, you will lost a portion of your EXP when you run out of HP, okay?");
		break;
	case 5:
		qm.sendNextPrev("Now... I want you to go out there and show the world how the Knights of Cygnus operate.");
		break;
	case 6:
		qm.dispose();
}
}