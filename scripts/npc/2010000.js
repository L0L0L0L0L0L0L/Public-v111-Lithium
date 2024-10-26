/*
	名字:	查裡中士
	地圖:	天空之城
	描述:	200000000
*/

var item = [4000073, 4000059, 4000076, 4000058, 4000078, 4000060, 4000062, 4000048, 4000081, 4000061, 4000070, 4000071, 4000072, 4000051, 4000055, 4000069, 4000052, 4000050, 4000057, 4000049, 4000056, 4000079, 4000053, 4000054, 4000080];

var eQuestPrizes = new Array();

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
		cm.sendNext("Hmmm...it shouldn't be a bad deal for you. Come see me at the right time and you may get a much better item to be offered. Anyway, let me know when you have a change of heart.");
		cm.dispose();
		return;
		}
		if (status < 3) {
		cm.dispose();
		return;
		}
		if (status < 4) {
		cm.sendNext("Hmmm ... it shouldn't be a bad deal for you at all. If you come at the right time I can hook you up with good items. Anyway if you feel like trading, feel free to come.");
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
		cm.sendNext("Hey, got a little bit of time? Well, my job is to collect items here and sell them elsewhere, but these days the monsters have become much more hostile so it's been difficult getting good items ... What do you think? Do you want to do some business with me?");
		break;
	case 1:
		cm.sendYesNo("The deal is simple. You get me something I need, I get you something you need. The problem is, I deal with a whole bunch of people, so the items I have to offer may change every time you see me. What do you think? Still want to do it?");
		break;
	case 2:
		var chat = "Ok! First you need to choose the item that you'll trade with. The better the item, the more likely the chance that I'll give you something much nicer in return. #b"
		for (var i = 0; i < item.length; i++)
		chat += "\r\n#L" + i + "#100 #t" + item[i] + "#s#l";
		cm.sendSimple(chat);
		break;
	case 3:
		select = selection;
		cm.sendYesNo("Let's see, you want to trade your #b100 #t" + item[selection] + "##k with my stuff, right? Before trading make sure you have an empty slot available on your use or etc. inventory. Now, do you really want to trade with me?");
		break;
	case 4:
		if (cm.getPlayer().itemQuantity(item[select]) < 100) {
			cm.sendOk("Hmmm... are you sure you have #b100 #t" + item[select] + "##k?");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1 || cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.sendNext("Your use and etc. inventory seem to be full. You need the free spaces to trade with me! Make room, and then find me...");
			cm.dispose();
			return;
			}
			itemSet = (Math.floor(Math.random() * eQuestPrizes[select].length));
			reward = eQuestPrizes[select];

			cm.gainItem(item[select], -100);
			cm.gainExp(100 * cm.getPlayer().getLevel());
			cm.gainItem(reward[itemSet][0], reward[itemSet][1]);
			cm.sendOk("For your #b100 #t" + item[select] + "##k, here's my #b" + reward[itemSet][1] + " #t" + reward[itemSet][0] + "##k. What do you think? Do you like the items I gave you in return? I plan on being here for a while, so if you gather up more items, I'm always open for a trade ...");
			break;
	case 5:
		cm.dispose();
}
}

eQuestPrizes[0] = [[2000001, 20], [2010004, 10], [2000003, 15], [4003001, 15], [2020001, 15], [2030000, 15]];	
eQuestPrizes[1] = [[2000003, 20], [2000001, 30], [2010001, 40], [4003001, 20], [2040002, 1]];
eQuestPrizes[2] = [[2000002, 25], [2000006, 10], [2022000, 5], [4000030, 15], [2040902, 1]];
eQuestPrizes[3] = [[2000002, 30], [2000006, 15], [2020000, 20], [4003000, 5], [2041016, 1]];
eQuestPrizes[4] = [[2000002, 15], [2010004, 15], [2000003, 25], [4003001, 30], [2040302, 1]];
eQuestPrizes[5] = [[2000002, 30], [2000006, 15], [2020000, 20], [4003000, 5], [2040402, 1]];
eQuestPrizes[6] = [[2000002, 30], [2020000, 20], [2000006, 15], [4003000, 5], [2040402, 1]];
eQuestPrizes[7] = [[2000006, 25], [2020000, 20], [4020000, 7], [4020001, 7], [4020002, 3], [4020007, 2], [2040708, 1]];
eQuestPrizes[8] = [[2020005, 30], [2020006, 15], [2022001, 30], [4003003, 1], [2040505, 1]];
eQuestPrizes[9] = [[2000006, 25], [4020005, 7], [4020003, 7], [4020004, 7], [4020008, 2], [2040802, 1]];
eQuestPrizes[10] = [[2002004, 15], [2002005, 15], [2002003, 15], [4001005, 1], [2040502, 1]];
eQuestPrizes[11] = [[2000006, 20], [4010004, 7], [4010003, 7], [4010005, 7], [4003002, 1], [2040602, 1]];
eQuestPrizes[12] = [[2000006, 20], [4010002, 7], [4010001, 7], [4010000, 7], [4010006, 2], [4003000, 5], [2040702, 1]];
eQuestPrizes[13] = [[2000006, 20], [4010004, 7], [4010005, 7], [4010006, 3], [4020007, 2], [4020008, 2], [2040705, 1]];
eQuestPrizes[14] = [[2000006, 30], [4020006, 7], [4020008, 2], [4020007, 2],	 [2070010, 1], [2040805, 1]];
eQuestPrizes[15] = [[2000006, 30], [4020006, 7], [4020008, 2], [4020007, 2], [2041020, 1]];
eQuestPrizes[16] = [[2000001, 30], [2000003, 20], [4003001, 20], [2010001, 40], [2040002, 1]];
eQuestPrizes[17] = [[2000002, 15], [2000003, 25], [2010004, 15], [2050004, 15], [4003001, 30], [2040302, 1]];
eQuestPrizes[18] = [[2000006, 25], [2020006, 25], [4010004, 8], [4010005, 8], [4010006, 3], [4020007, 2], [4020008, 2], [2040705, 1]];
eQuestPrizes[19] = [[2000002, 30], [2020000, 20], [2000006, 15], [4003000, 5], [2041005, 1]];
eQuestPrizes[20] = [[2000002, 30], [2020000, 20], [2000006, 15], [4003000, 5], [2041005, 1]];
eQuestPrizes[21] = [[2000002, 30], [2020000, 20], [2000006, 15], [4003000, 5], [2041005, 1]];
eQuestPrizes[22] = [[2000006, 20], [2020005, 30], [2020006, 15], [2050004, 20], [4003003, 1], [2041002, 1]];
eQuestPrizes[23] = [[2000006, 25], [2050004, 50], [2022001, 35], [4020000, 8], [4020001, 8], [4020002, 8], [4020007, 2], [2041023, 1]];
eQuestPrizes[24] = [[2000006, 35], [4020006, 9], [4010008, 4], [4020007, 4], [2041008, 1]];