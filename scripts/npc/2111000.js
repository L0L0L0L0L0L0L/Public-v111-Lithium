/*
	名字:	卡森
	地圖:	蒙特鳩協會
	描述:	261000010
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
		cm.dispose();
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
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3310)).getStatus() != 1 || cm.getPlayer().itemQuantity(4031709)) {
			cm.sendNext("The alchemy and the alchemist are both very important. However, the one that encompasses and embraces both is this town, Magatia. The glory of Magatia must be sustained and kept alive. Are you capable of doing that?");
			cm.dispose();
			return;
			}
			cm.sendAcceptDecline("Do you want to go to the closed laboratory and try controlling the Homun?");
			break;
	case 1:
		cm.sendNext("Concentrate...! It won't be an easy task trying to control the Magic Pentagrarm that triggers Hogun's rage.");
		break;
	case 2:
		if (cm.getMap(926120100).getCharacters().size() < 1) {
			cm.getMap(926120100).resetFully();
			cm.getPlayer().changeMap(cm.getMap(926120100), cm.getMap(926120100).getPortal(1));
			cm.getPlayer().startMapTimeLimitTask(1800, cm.getMap(261000010));
			cm.dispose();
			return;
			}
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Someone is already in this map, Better come back later."));
			cm.dispose();
}
}