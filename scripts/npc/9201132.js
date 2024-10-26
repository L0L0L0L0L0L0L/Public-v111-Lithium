/*
    Name:    Demon Gate
    Map:     Blue Ribbon Coast
    Description:    120020300
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28256)).getStatus() != 1) {
		cm.dispose();
		return;
	}
	if (cm.getMap(677000006).getCharacters().size() > 0 || cm.getMap(677000007).getCharacters().size() > 0) {
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Krossel Walkway is currently crowded. Please try again later."));
		return false;
	}
	cm.getPlayer().changeMap(cm.getMap(677000006), cm.getMap(677000006).getPortal(2));
	cm.dispose();
}
