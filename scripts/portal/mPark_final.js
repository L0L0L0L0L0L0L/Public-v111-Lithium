/*
	名字:	石巨人寺院
	地圖:	第6階段 : 隱藏的石室
	描述:	952000500
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Due to the monster's obstruction, the exit has been closed."));
		return false;
		}
	if (pi.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Please make some space before leaving."));
		return false;
		}
		pi.gainItem(4310020, 1);
		pi.getPlayer().changeMap(pi.getMap(951000000), pi.getMap(951000000).getPortal(0)); //怪物公園
		return true;
}