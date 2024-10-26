/*
	名字:	可可
	地圖:	墮落城市
	描述:	103000000
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
		if (status < 3) {
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
		var chat = "你好，我是#b#p" + cm.getNpc() + "##k，我喜歡搜集各種各樣的稀有道具，如果你正好有，我願意用一些飾品和你交換。#b";
		var options = ["墜飾", "臉飾", "眼飾", "腰帶&勳章", "戒指"];
		for (var i = 0; i < options.length; i++)
		chat += "\r\n#L" + i + "#" + options[i] + "#l";
		cm.sendSimple(chat);
		break;
	case 1:
		if (selection == 0) {
			var chat = "好的，你想做哪一種墜飾？#b";
			items = [1122018,1122007,1122001,1122003,1122004,1122006,1122002,1122005,1122058];
			for (var i = 0; i < items.length; i++)
			chat += "\r\n#L" + i + "##z" + items[i] + "##l";
			}
		if (selection == 1) {
			var chat = "好的，你想做哪一種臉飾？#b";
			items = [1012181,1012182,1012183,1012184,1012185,1012186, 1012108, 1012109, 1012110, 1012111];
			for (var i = 0; i < items.length; i++)
			chat += "\r\n#L" + i + "##z" + items[i] + "##l";
			}
		if (selection == 2) {
			var chat = "好的，你想做哪一種眼飾？#b";
			items = [1022073, 1022088, 1022103, 1022089, 1022082];
			for (var i = 0; i < items.length; i++)
			chat += "\r\n#L" + i + "##z" + items[i] + "##l";
			}
		if (selection == 3) {
			var chat = "嗯...這些有點棘手，由於我技術不太好，我不知道我會做出哪一種，還是要交換嗎？";
			items = [];
			maxEqp = 0;
			for (var x = 1132005; x < 1132017; maxEqp++, x++)
				items[maxEqp] = x;

			for (var x = 1142000; x < 1142102; maxEqp++, x++)
				items[maxEqp] = x;

			for (var x = 1142107; x < 1142121; maxEqp++, x++)
				items[maxEqp] = x;

			for (var x = 1142122; x < 1142143; maxEqp++, x++)
				items[maxEqp] = x;		
				chat += "\r\n#L" + i + "##b我想試試看！";
				}
		if (selection == 4) {
			var chat = "好的，你想做哪一種戒指？#b";
			items = [1112407, 1112408, 1112401, 1112413, 1112414, 1112405, 1112402];
			for (var i = 0; i < items.length; i++)
			chat += "\r\n#L" + i + "##z" + items[i] + "##l";
			}
			select = selection;
			cm.sendSimple(chat);
			break;
	case 2:
			selectItem = selection;
		if (select == 0) {
			var matSet = [[4003004, 4030012, 4001356, 4000026], [4000026, 4001356, 4000073, 4001006], [4001343, 4011002, 4003004, 4003005], [4001343, 4011006, 4003004, 4003005], [4000091, 4011005, 4003004, 4003005], [4000091, 4011001, 4003004, 4003005], [4000469, 4011000, 4003004, 4003005], [4000469, 4011004, 4003004, 4003005], [1122007, 4003002, 4000413]];
			var matSetQty = [[20, 20, 5, 1], [5, 5, 10, 1], [10, 2, 20, 4], [10, 1, 20, 4], [15, 3, 30, 6], [15, 3, 30, 6], [20, 5, 20, 8], [20, 4, 40, 8], [1, 1, 1]];
			var costSet = [150000, 500000, 200000, 200000, 300000, 300000, 400000, 400000, 2500000];
			}
		if (select == 1) {
			var matSet = [[4006000, 4003004], [4006000, 4003004, 4000026], [4006000, 4003004, 4000026, 4000082, 4003002], [4006000, 4003005], [4006000, 4003005, 4000026], [4006000, 4003005, 4000026, 4000082, 4003002], [4001006, 4011008], [4001006, 4011008], [4001006, 4011008], [4001006, 4011008]];
			var matSetQty = [[5, 5], [5, 5, 5], [5, 5, 5, 5, 1], [5, 5], [5, 5, 5], [5, 5, 5, 5, 1], [1, 1], [1, 1], [1, 1], [1, 1]];
			var costSet = [100000, 200000, 300000, 125000, 250000, 375000, 500000, 500000, 500000, 500000, 25000, 25000, 25000, 25000];
			}
		if (select == 2) {
			var matSet = [[4001006, 4003002, 4000082, 4031203], [4001005, 4011008], [4001005, 4011008], [4001005, 4011008, 4000082], [4001006, 4003002, 4003000, 4003001]];
			var matSetQty = [[2, 2, 5, 10], [3, 2], [4, 3], [5, 3, 10], [2, 2, 10, 5]];
			var costSet = [250000, 250000, 300000, 400000, 200000];
			}
		if (select == 3) {
			var matSet = [[4001006, 4003005, 4003004]];
			var matSetQty = [[2, 5, 10]];
			var costSet = [15000];
			}
		if (select == 4) {
			var matSet = [[4003001, 4001344, 4006000], [4003001, 4001344, 4006000], [4021004, 4011008], [4011008, 4001006], [1112413, 2022039], [1112414, 4000176], [4011007, 4021009]];
			var matSetQty = [[2, 2, 2], [2, 2, 2], [1, 1], [1, 1], [1, 1], [1, 1], [1, 1]];
			var costSet = [10000, 10000, 10000, 20000, 15000, 15000, 10000];
			}
			item = items[selectItem];
			mat = matSet[selectItem];
			matQty = matSetQty[selectItem];
			cost = costSet[selectItem];

			var chat = "你想製作";
			chat += (select == 3 ? "随机的腰帶&勳章？" : "#t" + item + "#？");
			chat += "我需要你提供足夠的材料才能完成。#b";
			for (var i = 0; i < mat.length; i++)
			chat += "\r\n#v" + mat[i] + "#" + (matQty[i] * 1) + "#t" + mat[i] + "#";
			chat += "\r\n#v4031138#" + (cost * 1) + "楓幣";
			cm.sendYesNo(chat);
			break;
	case 3:
		for (var i = 0; i < mat.length; i++)
		if (cm.itemQuantity(mat[i]) < matQty[i] * 1) {
			cm.sendOk("很抱歉，你所提供的材料不能滿足製作要求。");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getMeso() < (cost * 1)) {
			cm.sendOk("很抱歉，请确定一下您有#b" + cost + "#k楓幣嗎？");
			cm.dispose();
			return;
			}
		if (!cm.canHold(item, 1)) {
			cm.sendOk("在收到#b#z" + item + "##k之前，請檢查一下背包是否留有空位。");
			cm.dispose();
			return;
			}
			for (var i = 0; i < mat.length; i++)
			cm.gainItem(mat[i], -matQty[i] * 1);
			cm.gainMeso(-cost * 1);
			cm.gainItem(select == 3 ? items[Math.floor(Math.random() * maxEqp)] : item, 1);
			cm.sendOk("完成了~看看我的手藝，不錯吧? 有需要請再來找我哦~");
			cm.dispose();
}
}