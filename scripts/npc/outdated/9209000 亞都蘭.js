/*
	名字:	亞都蘭
	地圖:	維多利亞港
	描述:	104000000
*/

var time = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
var times = [1.7, 1.3, 0.5, 1.3, 1.2, 2, 0.8, 0.6, 1.2, 0.7, 1.3, 1.5, 0.9, 1.8, 1.3, 0.6, 1.4, 0.5, 1.9, 1.1, 0.7, 1.6, 1.2, 0.6];

var item0 = [[4000001, 4], [4000012, 10], [4000017, 30], [4000002, 5]];
var item1 = [[4000019, 2], [4000000, 3], [4000016, 5]];
var item2 = [[4000083, 18], [4000084, 25], [4000085, 25], [4000063, 25]];
var item3 = [[4000226, 100], [4000229, 110], [4000236, 106], [4000237, 116], [4000261, 135], [4000231, 120]];
var item4 = [[4000324, 12], [4000325, 13], [4000329, 14], [4000330, 18], [4000331, 22], [4000328, 15], [4000333, 23]];
var item5 = [[4032005, 100], [4032007, 110], [4032008, 120], [4032009, 130], [4032010, 140], [4032006, 150], [4032012, 160]];

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
		cm.sendSimple("旅行者，我是#p" + cm.getNpc() + "#，是一位仲介商人，需要我的幫忙嗎？\r\n#L0##b什麼是仲介商人#l\r\n#L1#我想賣一些不錯的貨#l");
		break;
	case 1:
		if (selection == 0) {
			cm.sendOk("我所收集到的產品會在楓之穀七天市場和其他城鎮銷售，不同的區域我收購的商品也會有所不同，至於收購價格每小時都會有所變動，也許在我這裏你會得到一個好價錢哦。");
			cm.dispose();
			}
		if (selection == 1) {
			for (var i = 0; i < time.length; i++)
			if (cm.getHourOfDay() == time[i])
			time = times[i];
			map = cm.getPlayer().getMap().getId();
			items = map == 100000000 ? item0 : map == 104000000 ? item1 : map == 200000000 ? item2 : map == 240000000 ? item3 : map == 260000000 ? item4 : item5;
			var chat = "好的，你想賣哪種商品？物價每小時的都會有變動。#b";
			for (var i = 0; i < items.length; i++) {
			items[i][1] *= time;
			chat += "\r\n#L" + i + "##v" + items[i][0] + "# (價格 : " + Math.round(items[i][1] * 100) / 100 + " 楓幣)#l";//四捨五入小數點後兩位
			}
			cm.sendSimple(chat);
			}
			break;
	case 2:
		item = items[selection];
		cm.sendGetNumber("你想賣 #b#t" + item[0] + "##k？想要賣多少個？", 1, 1, 100);
		break;
	case 3:
		item[1] = Math.round(item[1] * 100) / 100;
		cm.sendYesNo("你要賣#b" + selection + "#k個 #b#t" + item[0] + "##k? 單價: " + item[1] + "楓幣一個，總價是 #b" + (item[1] * selection) + "#k楓幣。");
		select = selection;
		break;
	case 4:
		if (cm.itemQuantity(item[0]) < select) {
			cm.sendOk("你沒有任何東西，別再浪費我的時間......我是一個忙碌的人。");
			cm.dispose();
			return;
			}
			cm.gainMeso(item[1] * select);
			cm.gainItem(item[0], - select);
			cm.sendOk("請收好你的#r" + item[1] * select + "#k楓幣，期待下次再和你交易。");
			cm.dispose();
}
}