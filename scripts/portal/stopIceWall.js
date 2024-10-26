/*
	名字:	龍沉睡的島
	地圖:	寂靜的洞穴
	描述:	914100020
*/

function enter(pi) {
	Packages.server.quest.MapleQuest.getInstance(22599).forceStart(pi.getPlayer(), 0, 2);
	pi.getPlayer().changeMap(pi.getPlayer().getMap(), pi.getPlayer().getMap().getPortal(1));
	pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Due to the protection of magic, cannot be approached."));
	return true;
}