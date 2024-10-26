/*
	名字:	利拉
	地圖:	火山的氣息&amp;lt;第2階段&gt;
	描述:	280020001
*/

function start() {
	cm.sendNext("第二階段測試通過，這是你的獎勵。\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v4031062# #t4031062# 1");
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "其它道具視窗的欄位不足"));
		cm.dispose();
		return;
		}
		cm.gainItem(4031062, 1);
		cm.gainExp(100 * cm.getPlayer().getLevel());
		cm.getPlayer().changeMap(cm.getMap(211042300), cm.getMap(211042300).getPortal(0));
		}
		cm.dispose();
}