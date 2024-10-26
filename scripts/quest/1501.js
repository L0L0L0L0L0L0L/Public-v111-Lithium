/*
	名字:	痕跡的調查
	地圖:	上層走廊
	描述:	120000100
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 0) {
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
		qm.sendNext("There's something really weird about this thing. It just doesn't feel right! Hey, there's something carved under all this sea moss! I think we oughtta clean it off before I take it to #p1090000#.");
		break;
	case 1:
		qm.sendAcceptDecline("I don't want to damage the relic, so we'd better do this carefully. Let's step into this room and try to get this cleaned off. Sound good?");
		break;
	case 2:
		if (qm.getMap(912070000).getCharacters().size() < 1) {
			Packages.server.quest.MapleQuest.getInstance(1501).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.getMap(912070000).resetFully();
			qm.getPlayer().changeMap(qm.getMap(912070000), qm.getMap(912070000).getPortal(1));
			qm.getPlayer().startMapTimeLimitTask(600, qm.getMap(120000100));
			qm.dispose();
			return;
			}
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Try again soon."));
			qm.dispose();
}
}