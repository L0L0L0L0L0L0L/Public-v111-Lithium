/*
	名字:	傳授百烈祝福連結技能
	地圖:	傳授百烈祝福連結技能
	描述:	砲手
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
		qm.sendNextS("You can teach the Link Skill the #b#ePirate Blessing#n#k to a different character in the same world. Log in to the character you would like to learn it as and use the #b#eLink Manager#n#k skill.", 1);
		break;
	case 1:
		Packages.server.quest.MapleQuest.getInstance(6600).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.sendLinkSkillWindow(110);
		qm.dispose();
}
}