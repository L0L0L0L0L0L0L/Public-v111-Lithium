/*
	名字:	納希沙漠
	地圖:	納希宮殿&amp;lt;走道&gt;
	描述:	260000302
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3935)).getStatus() != 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "This wall has nothing on it."));
		return false;
		}
	if (pi.getPlayer().itemQuantity(4031574)) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The wall doesn't seem to move."));
		return false;
		}
	if (pi.getMap(926000010).getCharacters().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Somebody might be inside the room. The security seems tight, so it's better to return some other time."));
		return false;
		}
		pi.getMap(926000010).resetFully();
		pi.getPlayer().changeMap(pi.getMap(926000010), pi.getMap(926000010).getPortal(0)); //王妃的寶物倉庫
		pi.getPlayer().startMapTimeLimitTask(300, pi.getMap(260000302));
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The wall collapses, and in comes a secret door."));
		return true;
}