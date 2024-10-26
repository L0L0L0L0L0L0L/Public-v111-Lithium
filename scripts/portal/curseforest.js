/*
	名字:	詛咒之林
	地圖:	邪惡氣息的森林1
	描述:	101040310
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2224)).getStatus() < 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "You cannot access this area."));
		return false;
		}
	cal = java.util.Calendar.getInstance();
	hour = cal.get(java.util.Calendar.HOUR_OF_DAY);
	map = pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2227)).getStatus() > 1 ? 910100001 : 910100000;
	if (hour < 7 || hour > 16) {
		pi.getPlayer().changeMap(pi.getMap(map), pi.getMap(map).getPortal(1));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "You cannot access this area right now."));
		return false;
}