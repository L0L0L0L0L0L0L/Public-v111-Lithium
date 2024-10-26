/*
	名字:	暗夜行者之路
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
		qm.sendNext("Yeah, you're probably better off someplace else.");
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20104)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(20104).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendYesNo("Has the decision already been made? Now you have no choice but to stick to it, which means this must be thought out carefully. Are you sure you want to live the life of a Night Walker?");
			break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20104)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(20104).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(1400);
			qm.resetStats(4, 25, 4, 4);
			qm.expandInventory(1, 4);
			qm.expandInventory(4, 4);
			qm.gainItem(1472061, 1);
			qm.gainItem(1142066, 1);
			qm.gainItem(2070015, 500);
			qm.getPlayer().gainSP(1, 0);
			qm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(10009000), 1, 1, -1);
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("You learned the Pig's Weakness Skill."));
			}
			qm.sendNext("You are a Night Walker from here on out. To commemorate the occasion of a new member, I will give you some of my abilities.");
			break;
	case 2:
		qm.sendNextPrev("You can now call yourself a Night Walker. If you wish to become more powerful, use the Stat window (S) to raise the appropriate stats. If you aren't sure what to raise, just click on #bAuto#k. If you can't trust Auto, then you do it on your own.");
		break;
	case 3:
		qm.sendNextPrev("I thought you might need it, so I also expanded your Equip and Etc windows. Use it well.");
		break;
	case 4:
		qm.sendNextPrev("I have also given you a hint of #bSP#k, so open the #bSkill Menu#k to acquire new skills. You will only be able to raise one for now, but... that'll at least help you hunt. There are some skills out there you won't be able to acquire unless you master the basic skills first, so don't touch them for now.");
		break;
	case 5:
		qm.sendNextPrev("Unlike your time as a Noblesse, once you become the Night Walker, you will lose a portion of your EXP when you run out of HP. Take care of yourself.");
		break;
	case 6:
		qm.sendNextPrev("Now... I want you to go out there as a Cygnus Knight and seek the darkest of the evil in the world.");
		break;
	case 7:
		qm.dispose();
}
}