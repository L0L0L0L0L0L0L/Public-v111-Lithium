/*
	名字:	稱號擂臺賽勝利者
	地圖:	玩具城
	描述:	220000000
*/

var status = -1;

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(29021)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(29021).forceStart(qm.getPlayer(), qm.getNpc(), null);
			Packages.server.quest.MapleQuest.getInstance(7054).forceStart(qm.getPlayer(), qm.getNpc(), 0);
			qm.dispose();
			return;
			}
			qm.sendNext("了不起！！！沒人能做到這樣的好成績，你在怪物擂臺賽中獲勝150次，符合擁有擂臺賽勝利者的稱號，祝賀你！");
			break;
	case 1:
		qm.sendPrev("我休菲凱曼向世界宣佈，你是這個名譽的稱號的主人。\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v1142187# #t1142187# 1");
		break;
	case 2:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "裝備道具視窗的欄位不足"));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(29021).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(1142187, 1);
			qm.dispose();
}
}