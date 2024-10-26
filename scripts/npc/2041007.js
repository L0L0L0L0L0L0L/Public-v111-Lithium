/*
	名字:	米努
	地圖:	玩具城美髮店
	描述:	220000004
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
		var chat = "歡迎光臨玩具城美髮店，我是米努，只需要持有本店的會員卡，就可以享受我們專業的服務。#b";
		chat += "\r\n#L0##v5150053##t5150053#";
		chat += "\r\n#L1##v5151036##t5151036#";
		cm.sendSimple(chat);
		break;
	case 1:
		if (selection < 1) {
		if (cm.getPlayer().getGender() < 1)
			hair = [30300, 30310, 30320, 30330, 30340, 30350, 30360, 30370];
		else
			hair = [31300, 31310, 31320, 31330, 31340, 31350, 31360];

			for (var i = 0; i < hair.length; i++)
			hair[i] = hair[i] + parseInt(cm.getPlayer().getHair() % 10); //讀取當前發色
			cm.sendStyle("使用專用的機器，可以提前看到美髮後的自己，選一個你喜歡的樣式。", hair);
			}
		if (selection > 0) {
			var color = parseInt(cm.getPlayer().getHair() / 10) * 10;
			hair = [];

			for (var i = 0; i < 8; i++)
			hair[i] = color + i;
			cm.sendStyle("使用專用的機器，可以提前看到染髮後的自己，選一個你喜歡的顏色。", hair);
			}
			select = selection;
			break;
	case 2:
		if (select < 1 && cm.getPlayer().itemQuantity(5150053) || select > 0 && cm.getPlayer().itemQuantity(5151036)) {
			cm.gainItem(select < 1 ? 5150053 : 5151036, -1);
			cm.setHair(hair[selection]);
			cm.sendOk("您的新髮型已經燙好了，喜歡嗎？");
			cm.dispose();
			return;
			}
			cm.sendOk("很抱歉，沒有我們指定的會員卡，恐怕我不能為您服務。");
			cm.dispose();
}
}