/*
	名字:	彩色菇菇芽孢
	地圖:	菇菇森林深處
	描述:	106020300
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case - 1:
		cm.dispose();
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
		cm.sendYesNo("#bDo you want to use the Killer Mushroom Spore?#k\r\n\r\n#r#e<Caution>#n\r\nNot for human consumption!\r\nIf ingested, seek medical attention immediately!");
		break;
	case 1:
		cm.gainItem(2430014, -1);
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2314)).setCustomData(2);
		cm.sendNextS("Success! The barrier is broken!", 3);
		break;
	case 2:
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The Mushroom Forest Barrier has been removed and penetrated."));
		cm.getPlayer().changeMap(cm.getMap(106020400), cm.getMap(106020400).getPortal(2)); //岔路
		cm.dispose();
}
}