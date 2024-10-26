/*
    Name:    Demon Gate
    Map:     Ghost Mushroom Forest
    Description:    100020400
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28238)).getStatus() != 1) {
		cm.dispose();
		return;
	}
	if (cm.getMap(677000002).getCharacters().size() > 0 || cm.getMap(677000003).getCharacters().size() > 0) {
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Andoxia Walkway is currently crowded. Please try again later."));
		return false;
	}
	cm.getPlayer().changeMap(cm.getMap(677000002), cm.getMap(677000002).getPortal(2));
	cm.dispose();
}
