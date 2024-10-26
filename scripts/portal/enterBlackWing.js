/*
	名字:	乾枯的路
	地圖:	礦山入口
	描述:	310040200
*/

function enter(pi) {
	if (!pi.getPlayer().hasEquipped(1003134)) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You can't enter without proof that you are a member of the Black Wings. Equip something with the Black Wings' logo on t to enter."));
		return false;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22611)).getStatus() == 1) {
		var em = pi.getEventManager("BlackWing");
		var prop = em.getProperty("state");
	if (prop == null || prop == 0) {
		em.startInstance(pi.getPlayer());
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "This field has already been taken by someone. Please try again later, or try a different channel."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(310050000), pi.getMap(310050000).getPortal(1));
		return true;
}