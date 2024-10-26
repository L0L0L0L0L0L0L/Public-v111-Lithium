/*
	名字:	小可愛
	地圖:	人偶師房間
	描述:	931040000
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		cm.dispose();
		return;
	case 0:
		if (status < 1) {
		cm.sendNext("#b(The unconcsious child is just over there... Is there anyone else here? You should look around.)");
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
		if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "There are too many enemies left. It's not safe to move the child."));
			cm.dispose();
			return;
			}
			cm.sendYesNo("#b(The unconcsious child is just over there... Hurry and get her to a doctor!)");
			break;
	case 1:
		cm.dispose();
		cm.getPlayer().changeMap(cm.getMap(310000000), cm.getMap(310000000).getPortal(0));
		Packages.server.quest.MapleQuest.getInstance(24096).forceStart(cm.getPlayer(), 0, 1);
}
}