/*
	名字:	奧拉
	地圖:	未知廢礦區I
	描述:	280010000
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		cm.dispose();
		return;
	case 0:
		if (status < 2) {
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		eim = cm.getPlayer().getEventInstance();
		chat = "#e調查廢礦洞穴（第一階段）#n#b";
		if (eim.getProperty(cm.getPlayer().getName()) != null) { //判斷領取過獎勵的組員
			cm.sendOk("調查廢礦洞穴任務已經結束，你現在可以通過那邊的出口離開礦場了。");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().itemQuantity(4001018)) {
			chat += "\r\n#L0#已經搜集好了物品";
			}
		if (eim.getProperty("reward1") != null) {
			chat += "\r\n#L1#領取獎勵品";
			}
		if (eim.getProperty("reward2") != null) {
			chat += "\r\n#L2#領取獎勵品";
			}
			chat += "\r\n#L3#請告訴我應該做什麼？";
			cm.sendSimple(chat);
			break;
	case 1:
		if (selection == 0) {
			cm.sendYesNo("測試通過，你帶回來了火石的母礦，以及#c4001015#張#b#z4001015##k，在這種情況下，我可以分給每一位組員一塊碎片，" + (cm.getPlayer().itemQuantity(4001015) < 30 ? "確定之後，請你與其它組隊與我重新交談領取獎勵。" : "還有廢礦的回城卷軸，它可以隨時帶你到廢礦，確定之後，請你與其它組隊與我重新交談領取獎勵。") + "");
			}
		if (selection == 1) {
			cm.sendNext("你的小組帶回來了火石的母礦。\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v4031061# #t4031061# 1 \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 12000 exp");
			}
		if (selection == 2) {
			cm.sendNext("你的小組帶回來了火石的母礦，以及30張回家卷軸秘笈。\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v4031061# #t4031061# 1 \r\n#v2030007# #t2030007# 5 \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 20000 exp");
			}
		if (selection == 3) {
			cm.sendOk("想要挑戰殘暴炎魔，你必須要了它的基礎內容，這個礦區裡蘊藏著火石的母礦，這是召喚怪物的核心材料之一，請在附近礦洞裡找到它，並且由組長帶回來交給我。\r\n\r\n哦，你能幫我個忙嗎？有一些廢礦卷軸藏在這附近的岩石下麵，如果你能得到30個，我可以給你一些其它的獎勵。");
			cm.dispose();
			}
			select = selection;
			break;
	case 2:
		if (select < 1) {
			eim.setProperty(cm.getPlayer().itemQuantity(4001015) < 30 ? "reward1" : "reward2", 1);
			cm.gainItem(4001015, cm.getPlayer().itemQuantity(4001015) < 30 ? 0 : -30);
			cm.gainItem(4001018, -1);
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
			eim.startEventTimer(3 * 60000);
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "探索廢礦任務已經完成，請各位組員來找我領取獎勵"));
			cm.dispose();
			}
		if (select > 0) {
			if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "其它道具視窗的欄位不足"));
			cm.dispose();
			return;
			}
			cm.gainItem(2030007, eim.getProperty("reward1") == 1 ? 0 : 5);
			cm.gainItem(4031061, 1);
			cm.gainExp(eim.getProperty("reward1") == 1 ? 12000 : 20000);
			eim.setProperty(cm.getPlayer().getName(), 1); //記錄領取過獎勵的組員
			cm.sendOk("調查廢礦洞穴任務已經結束，你現在可以通過那邊的出口離開礦場了。");
			}
			cm.dispose();
}
}