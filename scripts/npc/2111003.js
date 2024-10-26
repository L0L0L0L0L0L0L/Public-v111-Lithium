/*
	名字:	休曼諾伊德A
	地圖:	瑪迦提亞城
	描述:	261000000
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
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3335)).getStatus() != 1 || cm.getPlayer().itemQuantity(4031695)) {
			cm.sendNext("I would want nothing more than to be a human being with a warm. beating heart... That way, I can finally hold her hand the way it's meant to be held. Unfortunately, I can't do that right now...");
			cm.dispose();
			return;
			}
			cm.sendAcceptDecline("You're back... Are you ready to intiate the full bloom of the Snowfield Rose? You're aware that only the May Mist will allow the rose to bloom, right?");
			break;
	case 1:
		cm.sendNext("l will now take you to a place where the incubator for the Snowfield Rose awaits...");
		break;
	case 2:
		if (cm.getMap(926120300).getCharacters().size() < 1) {
			cm.getMap(926120300).resetFully();
			cm.getPlayer().changeMap(cm.getMap(926120300), cm.getMap(926120300).getPortal(4));
			cm.getPlayer().startMapTimeLimitTask(900, cm.getMap(261000000));
			cm.dispose();
			return;
			}
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Someone is already in this map, Better come back later."));
			cm.dispose();
}
}