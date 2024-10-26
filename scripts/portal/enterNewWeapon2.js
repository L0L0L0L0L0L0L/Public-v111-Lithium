/*
	名字:	隱藏地圖
	地圖:	陷阱！實驗室監獄
	描述:	931000311
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23050)).getStatus() != 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Before entering, it's best to inquire about the situation."));
		return false;
		}
	if (pi.getMap(931000321).getCharacters().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
		return false;
		}
		pi.getMap(931000321).resetFully();
		pi.getPlayer().changeMap(pi.getMap(931000321), pi.getMap(931000321).getPortal(1)); //新武器開發實驗室
		pi.getPlayer().startMapTimeLimitTask(1200, pi.getMap(931000311));
		return true;
}