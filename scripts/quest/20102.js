/*
	名字:	烈焰巫師之路
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
		qm.sendNext("Okie dokie, think it over!");
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20102)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(20102).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendYesNo("Ha! Have you made your decision? Are you sure? You know you can't go back on it once you make up your mind, right? So, that means you want to become a Blaze Wizard?");
			break;
	case 1:
		qm.sendNext("Okay, you are now a Blaze Wizard. Forgive me if I sound ecstatic, because I am! I'm so happy I get to work with another Blaze Wizard! Oh wait, before I forget, I will give you some abilities I'd like to share with you.");
		break;
	case 2:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20102)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(20102).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(1200);
			qm.resetStats(4, 4, 20, 4);
			qm.expandInventory(1, 4);
			qm.expandInventory(4, 4);
			qm.gainItem(1372043, 1);
			qm.gainItem(1142066, 1);
			qm.getPlayer().gainSP(1, 0);
			qm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(10009000), 1, 1, -1);
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("You learned the Pig's Weakness Skill."));
			}
			qm.sendNextPrev("Okay, you're now officially a Blaze Wizard. If you want to make yourself stronger, use the Stat window (S) to raise the appropriate stats. If you aren't sure what to raise, just dick on #bAuto#k. It's especially helpful for those that are not accustomed to Magicians.");
			break;
	case 3:
		qm.sendNextPrev("I have also added some slots for your equipment and etc inventory, Use those slots wisely!");
		break;
	case 4:
		qm.sendNextPrev("Oh, and I have also given you a small dose of #bSP#k, so open the #bSkill Menu#k to acquire new skills. You will only be able to raise one at a time, but if you really work at it, you will master all the skills in no time. There are some skills out there you won't be able to acquire unless you master the basic skills first.");
		break;
	case 5:
		qm.sendNextPrev("Unlike your time as a Noblesse, once you become a Blaze Wizard, you will lost a portion of your EXP when you run out of HP, okay?");
		break;
	case 6:
		qm.sendNextPrev("Now, I want you to go out there and show the world what the Cygnus Knights are made of.");
		break;
	case 7:
		qm.dispose();
}
}