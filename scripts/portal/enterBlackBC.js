/*
	名字:	玩具城
	地圖:	天空露臺&amp;lt;5&gt;
	描述:	220011000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22583)).getStatus() == 1) {
	if (pi.getMap(922030010).getCharacters().size() < 1 && pi.getMap(922030011).getCharacters().size() < 1) {
		pi.getMap(922030011).resetFully();
		pi.getPlayer().changeMap(pi.getMap(922030010), pi.getMap(922030010).getPortal(1)); //天空露臺
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
		return false;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22584)).getStatus() == 1) {
	if (pi.getMap(922030020).getCharacters().size() < 1 && pi.getMap(922030021).getCharacters().size() < 1 && pi.getMap(922030022).getCharacters().size() < 1) {
		pi.getMap(922030022).resetFully();
		pi.getPlayer().changeMap(pi.getMap(922030020), pi.getMap(922030020).getPortal(1)); //天空露臺
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(220011001), pi.getMap(220011001).getPortal(1)); //天空陽台
		return true;
}