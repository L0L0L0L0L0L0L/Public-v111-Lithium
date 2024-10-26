/*
	名字:	靈藥幻境
	地圖:	金勾海賊團基地3
	描述:	251010403
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22408)).getStatus() != 1) {
		return true;
		}
	if (pi.getMap(925110000).getCharacters().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
		return false;
		}
		pi.getMap(925110000).resetFully();
		pi.getPlayer().changeMap(pi.getMap(925110000), pi.getMap(925110000).getPortal(1)); //海盜的寶物倉庫
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(251010403));
		return true;
}