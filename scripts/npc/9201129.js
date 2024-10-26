/*
    Name:    Demon Gate
    Map:     Near the Sky
    Description:    101020200
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28198)).getStatus() != 1) {
		cm.dispose();
		return;
	}
	if (cm.getMap(677000000).getCharacters().size() > 0 || cm.getMap(677000001).getCharacters().size() > 0) {
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Mabasu Walkway is currently crowded. Please try again later."));
		return false;
	}
	cm.getPlayer().changeMap(cm.getMap(677000000), cm.getMap(677000000).getPortal(2));
	cm.dispose();
}
