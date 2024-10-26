/*
	名字:	水泥路
	地圖:	埃德爾斯坦公園2
	描述:	310020100
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23210)).getStatus() == 1) {
		var em = pi.getEventManager("Mastema");
		var prop = em.getProperty("state");
	if (prop == null || prop == 0) {
		em.startInstance(pi.getPlayer());
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "This field has already been taken by someone. Please try again later, or try a different channel."));
		return false;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23210)).getStatus() > 1) {
		pi.getPlayer().changeMap(pi.getMap(931050110), pi.getMap(931050110).getPortal(1)); //艾德斯塔公園噴水台附近2
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "It seems like there's nobody at the Empty Lot."));
		return false;
}