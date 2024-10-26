/*
	名字:	邪惡的靈魂
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20758)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(20758).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.sendYesNo("Did you bring the Stained Soul?");
			break;
	case 1:
		if (qm.getPlayer().getSkillLevel(10000202) < 1) {
			Packages.server.quest.MapleQuest.getInstance(20758).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(10000202), 1, 6, -1);
			qm.gainItem(4033117, -1);
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20758)).getStatus() < 2) {
			qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20758)).setStatus(2);
			qm.getPlayer().updateQuest(qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20758)), true);
			qm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(10000202), qm.getPlayer().getSkillLevel(10000202) < 6 ? qm.getPlayer().getSkillLevel(10000202) + 1 : 6, 6, -1);
			qm.gainItem(4033117, -1);
			}
			qm.sendNext("The corruption of this soul bears some investigation. Perhaps it will be the key to undoing the Black Mage, though I doubt it would be so easy. Regardless, I will teach you a skill in return. I call it, #bNoble Mind#k.");
			break;
	case 2:
		qm.sendNextPrev("I can increase the power of your Noble Mind skill if you bring me another Stained Soul. You can enter the Dimensional Schism once each day.");
		break;
}
}