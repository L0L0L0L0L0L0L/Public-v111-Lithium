/*
	名字:	傳授惡魔之怒連結技能
	地圖:	傳授惡魔之怒連結技能
	描述:	恶魔杀手
*/

var status = -1;

function start(mode, type, selection) {
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
		qm.sendNextS("You can teach the Link Skill the #b#eFury Unleashed#n#k to a different character in the same world. \r\nLog in to the character you would like to learn it as and use the #b#eLink Manager#n#k skill.", 1);
		break;
	case 1:
		Packages.server.quest.MapleQuest.getInstance(6602).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.sendLinkSkillWindow(30010112);
		qm.dispose();
}
}