/*
	名字:	林車長
	地圖:	廢棄的地鐵月台
	描述:	910320000
*/

function start() {
	switch (cm.getPlayer().getMap().getId()) {
	case 910320001:
		cm.getPlayer().changeMap(cm.getMap(910320000), cm.getMap(910320000).getPortal(0));
		cm.dispose();
		break;
	case 910330001:
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "其它道具視窗的欄位不足"));
		cm.dispose();
		return;
		}
		cm.gainItem(4001321, 1);
		cm.getPlayer().changeMap(cm.getMap(910320000), cm.getMap(910320000).getPortal(0));
		cm.dispose();
		break;
	case 910320000:
		var chat = "您好，我是林車長，堆積灰塵的月臺區域突然出現了很多怪物，我實在是沒有辦法去清理，你能為我去做這件事嗎，這樣對大家都會有幫助的。#b";
		chat += "\r\n#L0#進去挑戰";
		chat += "\r\n#L1#火車訓練 999";
		chat += "\r\n#L2#領取勳章 <#z1142141#>";
		cm.sendSimple(chat);
		break;
	default:
		cm.sendYesNo("確定要離開#b#m" + cm.getPlayer().getMap().getId() + "##k嗎？");
}
}

function action(mode, type, selection) {
	switch (selection) {
	case 0:
		if (cm.getPlayer().getLevel() < 25 || cm.getPlayer().getLevel() > 35) {
			cm.sendOk("很抱歉哦，這次的任務只適用於#b25-35#k等之內。");
			cm.dispose();
			return;
			}
			if (!cm.start_PyramidSubway(-1)) {
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "堆積灰塵的月臺目前擁擠，請稍後再試"));
			}
			break;
	case 1:
		if (!cm.getPlayer().itemQuantity(4001321)) {
			cm.sendOk("很抱歉哦，沒有攜帶#b#z4001321##k不允許進入月臺。");
			cm.dispose();
			return;
			}
		if (cm.bonus_PyramidSubway(-1)) {
			cm.gainItem(4001321, -1);
			cm.dispose();
			return;
			}
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "999號列車月臺目前擁擠，請稍後再試"));
			cm.dispose();
			break;
	case 2:
		var record = cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(7662));
		var data = record.getCustomData();
		if (data == null) {
			record.setCustomData(0);
			data = record.getCustomData();
			}
			var mons = parseInt(data);
		if (mons < 10000) {
			cm.sendOk("至少要殺死1萬隻怪物，目前 : " + mons);
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "裝備道具視窗的欄位不足"));
			cm.dispose();
			return;
			}
			cm.gainItem(1142141, cm.getPlayer().itemQuantity(1142141) ? 0 : 1);
			cm.dispose();
			break;
	default:
		if (mode > 0)
			cm.getPlayer().changeMap(cm.getMap(910320000), cm.getMap(910320000).getPortal(0));
			}
			cm.dispose();
}