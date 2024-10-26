/*
	名字:	繳納箱
	地圖:	維多利亞港
	描述:	104000000
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
		var chat = "你好，打獵時候有收集到#b#v4001126##z4001126##k嗎？我正在收集它們，如果你給我楓葉，可以換取獎勵。#b";
		chat += "\r\n#L0#使用楓葉兌換35級楓葉武器#l";
		chat += "\r\n#L1#使用楓葉兌換43級楓葉武器#l";
		chat += "\r\n#L2#使用楓葉兌換64級楓葉武器#l";
		chat += "\r\n#L3#使用楓葉和#z1092030#兌換64級楓葉盾#l";
		chat += "\r\n#L4#使用楓葉抽獎#l";
		cm.sendSimple(chat);
		break;
	case 1:
		select = selection;
		if (selection == 0) {
			chat = "兌換35級楓葉武器需要33張#b#v4001126##z4001126##k，看看你需要什麼吧。#b";
			var items = [1302020, 1382009, 1462014, 1472030, 1482020, 1492020];
			for (var i = 0; i < items.length; i++)
			chat += "\r\n#L" + items[i] + "#兌換#z" + items[i] + "#";
			cm.sendSimple(chat);
			}
		if (selection == 1) {
			chat = "兌換43級楓葉武器需要66張#b#v4001126##z4001126##k，看看你需要什麼吧。#b";
			var items = [1302030, 1332025, 1382012, 1412011, 1422014, 1432012, 1442024, 1452022, 1462019, 1472032, 1482021, 1492021];
			for (var i = 0; i < items.length; i++)
			chat += "\r\n#L" + items[i] + "#兌換#z" + items[i] + "#";
			cm.sendSimple(chat);
			}
		if (selection == 2) {
			chat = "兌換64級楓葉武器需要99張#b#v4001126##z4001126##k，看看你需要什麼吧。\r\n";
			var items = [1302064, 1312032, 1322054, 1332055, 1332056, 1372034, 1382039, 1402039, 1412027, 1422029, 1432040, 1442051, 1452045, 1462040, 1472055, 1482022, 1492022];
			for (var i = 0; i < items.length; i++)
			chat += "\r\n#L" + items[i] + "#兌換#z" + items[i] + "#";
			cm.sendSimple(chat);
			}
		if (selection == 3) {
			chat = "兌換64級楓葉盾需要50張#b#v4001126##z4001126##k和一個#b#v1092030##z1092030##k。#b";
			var items = [1092045, 1092046, 1092047];
			for (var i = 0; i < items.length; i++)
			chat += "\r\n#L" + items[i] + "#兌換#z" + items[i] + "#";
			cm.sendSimple(chat);
			}
		if (selection == 4) {
			chat = "要用#z4001126#抽獎嗎？需要花費10張#b#v4001126##z4001126##k，即使抽不中還有楓幣獎勵哦，確定要參與items嗎？可能會獲得這些獎勵:\r\n";
			item1 = [4005000, 4005001, 4005002, 4005003, 1002419, 4005004, 4021000, 4021001, 4021002, 4021003, 4021004, 4021005, 4021006, 4021007, 4021008, 2002023, 2022121, 2022195, 2022439, 2022440, 2022441, 2022308, 2022307, 2002028, 2002029, 2022306, 2022305];
			for (var i = 0; i < item1.length; i++) {
			chat += "#v" + item1[i] + "#";
			}
			cm.sendYesNo(chat);
			}
			break;
	case 2:
		maple = (select == 0 ? 33 : select == 1 ? 66 : select == 2 ? 99 : select == 3 ? 50 : 10);
		if (cm.itemQuantity(4001126) < maple) {
		if (select < 3) {
			if (cm.canHold(selection)) {
			var item = cm.gainItem(selection, 1, true, false);
			cm.gainItem(4001126, -maple);
			cm.sendOk("#z" + selection + "#已經發送到您的背包，請注意查收。");
			cm.dispose();
			return;
			}
			cm.sendOk("在收到#b#z" + selection + "##k之前，請檢查一下背包是否留有空位。");
			cm.dispose();
			return;
			}
		if (select == 3) {
			if (cm.itemQuantity(1092030)) {
			if (cm.canHold(selection)) {
			var item = cm.gainItem(selection, 1, true, false);
			cm.gainItem(4001126, -maple);
			cm.gainItem(1092030, -1);
			cm.sendOk("#z" + selection + "#已經發送到您的背包，請注意查收。");
			cm.dispose();
			return;
			}
			cm.sendOk("在收到#b#z" + selection + "##k之前，請檢查一下背包是否留有空位。");
			cm.dispose();
			return;
			}
			cm.sendOk("你的背包裡沒有#z1092030#，無法完成兌換。");
			cm.dispose();
			return;
			}
		if (select == 4) {
			if (cm.itemQuantity(4001126) < maple) {
			var random = Math.floor(Math.random() * item1.length * 5);
			if (random < item1.length) {
			if (cm.canHold(item1[random])) {
			var item = cm.gainItem(item1[random], 1, true, false);
			cm.gainItem(4001126, -maple);
			cm.sendOk("恭喜，這次抽中了#v" + item1[random] + "#");
			cm.dispose();
			return;
			}
			cm.sendOk("在收到物品之前，請檢查一下背包是否留有空位。");
			cm.dispose();
			return;
			}
			cm.gainItem(4001126, -maple);
			var meso = Math.floor(Math.random() * 20000);
			cm.gainMeso(meso);
			cm.sendOk("抱歉，這次什麼也沒抽到，" + meso + "楓幣作為安慰。");
			cm.dispose();
			return;
			}
			cm.sendOk("你沒有足夠的#b#v4001126##z4001126##k進行抽獎。");
			cm.dispose();
			return;
			}
			}
			cm.sendOk("如果你沒有足夠的#b#v4001126##z4001126##k，在楓之谷裡任何怪物都有可能掉落喲。");
			cm.dispose();
}
}