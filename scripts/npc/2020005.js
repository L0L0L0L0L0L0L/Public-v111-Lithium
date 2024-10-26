/*
	名字:	亞凱斯特
	地圖:	冰原雪域市集
	描述:	211000100
*/

var item = [2050003, 2050004, 4006000, 4006001];
var cost = [300, 400, 5000, 5000];

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case - 1:
		cm.dispose();
		return;
	case 0:
		if (status < 3) {
		cm.dispose();
		return;
		}
		if (status < 4) {
		cm.sendNext("I see. Well, please understand that I carry many different items here. I'm only selling these items to you, so I won't be ripping you off in any way shape or form.");
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
		cm.sendSimple("What is it? \r\n#L0##bI want to buy something really rare.");
		break;
	case 1:
		if (cm.getPlayer().getLevel() < 30) {
			cm.sendNext("I am Alcaster the Magician. I have been studying all kinds of magic for over 300 years.");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3035)).getStatus() < 2) {
			cm.sendNext("If you decide to help me out, then in return, I'll make the item available for sale.");
			cm.dispose();
			return;
			}
			var chat = "Thanks to you, #bThe Book of Ancient#k is safely sealed. As a result, l used up about half of the power l have accumulated over the last 800 years...but can now die in peace. Would you happen to be looking for rare items by any chance? As a sign of appreciation for your hard work, I'll sell some items in my possession to you and ONLY you. Pick out the one you want! #b";
			for (var i = 0; i < item.length; i++)
			chat += "\r\n#L" + i + "##t" + item[i] + "#(Price : " + cost[i] + " mesos)#l";
			cm.sendSimple(chat);
			break;
	case 2:
		text1 = [["So the item you need is #bHoly Water#k, right? That's The item that cures the state of being sealed and cursed. It's not an easy item to get, but for you, I'll sell it for cheap. It'll cost you #b300 mesos#k per. How many would you like to buy?"],
		["So the item you need is #bAll Cure Potion#k, right? That's The item that cures all. It's not an easy item to get, but for you, I'll sell it for cheap. It'll cost you #b400 mesos#k per. How many would you like to buy?"],
		["So the item you need is #bThe Magic Rock#k, right? That's The item that possesses magical power and is used for high-quality skills. It's not an easy item to get, but for you, I'II sell it for cheap. It'll cost you #b5000 mesos#k per. How many would you like to buy?"],
		["So the item you need is #bThe Summoning Rock#k, right? That's The item that possesses summoning power and is used for high-quality skills. It's not an easy item to get, but for you, I'll sell it for cheap. It'll cost you #b5000 mesos#k per. How many would you like to buy?"]];
		cm.sendGetNumber(text1[selection], 1, 1, 100);
		select = selection;
		break;
	case 3:
		cm.sendYesNo("Are you sure you want to buy #r" + selection + " #t" + item[select] + "#(s)#k? It'll cost you " + cost[select] + " mesos per #t" + item[select] + "#, which will cost you #r" + (cost[select] * selection) + "#k mesos total.");
		num = selection;
		break;
	case 4:
		if (cm.getPlayer().getMeso() < cost[select] * num || cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1 || cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.sendNext("Are you sure you have enough mesos? Please check if the Etc or Use windows of your Item Inventory is full, or if you have at least #r" + (cost[select] * num) + "#k mesos.");
			cm.dispose();
			return;
			}
			cm.gainMeso(-cost[select] * num);
			cm.gainItem(item[select], num);
			cm.sendNext("Thank you. If you need anything else, come see me anytime. l may have lost a lot of power, but l can still make magical items!");
			cm.dispose();
}
}