/*
	名字:	除掉警備兵！
	地圖:	場面轉換2
	描述:	927000081
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23205)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(23205).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(23205).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(30010166), -1, 0, -1);
			qm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(30011167), -1, 0, -1);
			qm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(30011168), -1, 0, -1);
			qm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(30011169), -1, 0, -1);
			qm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(30011170), -1, 0, -1);
			qm.dispose();
			qm.getPlayer().changeMap(qm.getMap(927000070), qm.getMap(927000070).getPortal(0));
}
}