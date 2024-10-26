/*
	名字:	寶箱
	地圖:	地鐵車庫
	描述:	910360002
*/

var item = Array(4010003, 4010000, 4010002, 4010005, 4010004, 4010001);

function start() {
	if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "其它道具視窗的欄位不足"));
		cm.dispose();
		return;
		}
		cm.gainItem(4031039, cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2055)).getStatus() == 1 ? 1 : 0);
		cm.gainItem(item[parseInt(Math.random() * item.length)], 2);
		cm.getPlayer().changeMap(cm.getMap(103000000), cm.getMap(103000000).getPortal(0));
		cm.dispose();
}