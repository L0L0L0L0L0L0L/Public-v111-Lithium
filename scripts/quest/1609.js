/*
	名字:	[十字獵人]史菲魯納的邀請
	地圖:	奇怪的通道
	描述:	931050410
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
		qm.sendNextS("Say, did you hear the rumor? They say Spiruna in #b#eOrbis's Cloud Park 4#n#k is hosting a party for adventurers. She's got all kinds of gifts and such for heroes like you. You can get to Orbis Station via airship from Six Path Crossway... #eDon't you think you should check it out?", 1);
		break;
	case 1:
		Packages.server.quest.MapleQuest.getInstance(1609).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(102000000), qm.getMap(102000000).getPortal(0));
		qm.dispose();
}
}