/*
	名字:	石巨人寺院
	地圖:	石巨人寺院入口
	描述:	100040000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22559)).getStatus() == 1) {
	if (pi.getMap(910600010).getCharacters().size() < 1) {
		pi.getMap(910600010).resetFully();
		pi.getPlayer().changeMap(pi.getMap(910600010), pi.getMap(910600010).getPortal(1)); //遺棄的基地
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(100040000));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
		return false;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22556)).getStatus() == 1) {
		Packages.server.quest.MapleQuest.getInstance(22598).forceStart(pi.getPlayer(), 0, 1);
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "A strange force is blocking you from entering."));
		return false;
}