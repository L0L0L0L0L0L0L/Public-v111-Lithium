/*
    Name:    Demon Gate
    Map:     Dangerous Black Crocodile
    Description:    103030200
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28219)).getStatus() != 1) {
		cm.dispose();
		return;
	}
	if (cm.getMap(677000008).getCharacters().size() > 0 || cm.getMap(677000009).getCharacters().size() > 0) {
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Warlief Walkway is currently crowded. Please try again later."));
		return false;
	}
	cm.getPlayer().changeMap(cm.getMap(677000008), cm.getMap(677000008).getPortal(2));
	cm.dispose();
}
