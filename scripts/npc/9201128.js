/*
    Name:    Demon Gate
    Map:     Big Rock Road
    Description:    102020300
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28179)).getStatus() != 1) {
		cm.dispose();
		return;
	}
	if (cm.getMap(677000004).getCharacters().size() > 0 || cm.getMap(677000005).getCharacters().size() > 0) {
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Andros Walkway is currently crowded. Please try again later."));
		return false;
	}
	cm.getPlayer().changeMap(cm.getMap(677000004), cm.getMap(677000004).getPortal(2));
	cm.dispose();
}
