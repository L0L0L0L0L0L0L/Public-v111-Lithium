/*
	名字:	玩具城
	地圖:	時間之路&amp;lt;2&gt;
	描述:	220040100
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(24084)).getStatus() != 1) {
		return false;
		}
	if (pi.getMap(922030100).getCharacters().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "This field is already in use. Try again later, or change channels and try again."));
		return false;
		}
		pi.getMap(922030100).resetFully();
		pi.getPlayer().changeMap(pi.getMap(922030100), pi.getMap(922030100).getPortal(1)); //瑞德弟的陷阱
		pi.getPlayer().getMap().spawnNpc(1033228, new java.awt.Point(-135, 492));
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(220040100));
		return true;
}