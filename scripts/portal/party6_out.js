/*
	名字:	毒霧森林
	地圖:	劇毒森林
	描述:	930000600
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getMonsterById(9300183) != null) {
	if (pi.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Please make some space before leaving."));
		return false;
		}
		pi.gainItem(4001198, 1);
		pi.getPlayer().changeMap(pi.getMap(930000800), pi.getMap(930000800).getPortal(0)); //森林外圍出口
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Due to the monster's obstruction, the exit has been closed."));
		return false;
}