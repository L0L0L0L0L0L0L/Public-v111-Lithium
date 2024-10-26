/*
	名字:	傑克
	地圖:	疼痛洞穴
	描述:	610020011
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
		if (status < 4) {
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
		cm.sendNext("嘿，你知道#b守护者城堡#k正在進行的探險嗎？對於熱愛冒險的人來說，這是一個很好的提升自己的機會。");
		break;
	case 1:
		cm.sendYesNo("話雖如此，但是面臨著新的挑戰，也必須有合適的藥劑來強化自己的能力，我現在正在研究一種特製藥物#b#v2022284##t2022284##k，但是這種藥物需要大量的物質提供，如果你能滿足製作要求，我可以為你製作一些。");
		break;
	case 2:
		selectItem = selection;

		items = [2022284];
		var matSet = [[4032010, 4032011, 4032012]];
		var matSetQty = [[60, 60, 45]];
		item = items[0];
		mat = matSet[0];
		matQty = matSetQty[0];

		var chat = "好的，你想做些#t" + item + "#？要做多少呢？";
		cm.sendGetNumber(chat, 1, 1, 100)
		break;
	case 3:
		qty = (selection > 0) ? selection : (selection < 0 ? -selection : 1);
		var chat = "你想製作";
		chat += qty + "個#t" + item + "#？";
		chat += "我需要你提供足夠的材料才能完成。#b";
		for (var i = 0; i < mat.length; i++)
		chat += "\r\n#v" + mat[i] + "#" + (matQty[i] * qty) + "#t" + mat[i] + "#";
		cm.sendYesNo(chat);
		break;
	case 4:
		for (var i = 0; i < mat.length; i++)
		if (cm.itemQuantity(mat[i]) < matQty[i] * qty) {
			cm.sendOk("很抱歉，你所提供的材料不能滿足製作要求。");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
			cm.playerMessage(1, "消耗道具視窗的欄位不足。");
			cm.dispose();
			return;
			}
			for (var i = 0; i < mat.length; i++)
			cm.gainItem(mat[i], -matQty[i] * qty);
			cm.gainItem(item, qty);
			cm.sendOk("做好了，如果還有需要，再來找我。");
			cm.dispose();
}
}