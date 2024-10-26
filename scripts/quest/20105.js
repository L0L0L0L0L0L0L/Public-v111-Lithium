/*
	名字:	閃雷悍將之路
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
		qm.sendNext("What? Are you not going to do it? That's too bad...");
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20105)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(20105).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendYesNo("Have you made your decision? Just making sure that you know, but you can't go back on it, okay? Are you sure you want to become a Thunder Breaker?");
			break;
	case 1:
		qm.sendNext("Yes, you have now become a Thunder Breaker! Awesome! One more member! Oh, before I get too carried away with myself, I'll share some stats with you.");
		break;
	case 2:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20105)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(20105).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(1500);
			qm.resetStats(4, 20, 4, 4);
			qm.expandInventory(1, 4);
			qm.expandInventory(4, 4);
			qm.gainItem(1482014, 1);
			qm.gainItem(1142066, 1);
			qm.getPlayer().gainSP(1, 0);
			qm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(10009000), 1, 1, -1);
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("You learned the Pig's Weakness Skill."));
			}
			qm.sendNextPrev("You have now become the Thunder Breaker. If you want to become more powerful, use the Stat window (S) to raise the appropriate stats. If you aren't sure what to raise, just click on #bAuto#k.");
			break;
	case 3:
		qm.sendNextPrev("And since you're a Thunder Breaker, you'll need a lot of items with you at all times, so I have expanded your Equip and Etc windows. Isn't that awesome?");
		break;
	case 4:
		qm.sendNextPrev("Oh, and I have also given you some #bSP#k, so open the #bSkill Menu#k to acquire new skills. Of course, you can't raise them all at once, and there are some skills out there where you won't be able to acquire them unless you master the basic skills first.");
		break;
	case 5:
		qm.sendNextPrev("Unlike your time as a Noblesse, once you become the Thunder Breaker, you will lose a portion of your EXP when you run out of HP. I know you like to hunt, but just don't go too overboard, okay?");
		break;
	case 6:
		qm.sendNextPrev("Now, I want you to go out there and show the world what the Cygnus Knights are made of.");
		break;
	case 7:
		qm.dispose();
}
}