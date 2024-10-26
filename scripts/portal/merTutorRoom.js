/*
	名字:	結冰的精靈森林
	地圖:	櫻花處
	描述:	910150001
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(24005)).getStatus() > 0) {
		pi.getPlayer().changeMap(pi.getMap(910150004), pi.getMap(910150004).getPortal(1)); //王的休息處
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "There's no time to rest! There's still work to do."));
		return false;
}