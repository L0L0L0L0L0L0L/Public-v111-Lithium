/*
    Name: Captain Huang
    Map: Elixir Mirage
    Description: 251000000
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22587)).getStatus() != 1) {
		cm.sendOk("It's really worrying! The pirates have established a base on the other side of the herb field...");
		cm.dispose();
		return;
	}
	if (cm.getMap(925110001).getCharacters().size() > 0) {
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "The pirate base is currently crowded, please try again later."));
		cm.dispose();
		return;
	}
	cm.getMap(925110001).resetFully();
	cm.getPlayer().changeMap(cm.getMap(925110001), cm.getMap(925110001).getPortal(1));
	cm.getPlayer().startMapTimeLimitTask(1800, cm.getMap(251000000));
	cm.dispose();
}
