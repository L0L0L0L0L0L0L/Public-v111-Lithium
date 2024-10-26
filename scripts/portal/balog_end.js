/*
	名字:	巴洛古的寺院
	地圖:	巴羅古消失的地點
	描述:	105100401
*/

function enter(pi) {
	if (pi.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Please have at least one empty slot ready in your Etc tab."));
		return false;
		}
		pi.gainExp(35520);
		pi.gainItem(4001261, 1);
		pi.getPlayer().changeMap(pi.getMap(105100100), pi.getMap(105100100).getPortal(0)); //神殿底層
		return true;
}