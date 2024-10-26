/*
	名字:	地鐵站 服務員
	地圖:	地鐵售票處
	描述:	103020000
*/

var item = [4031036, 4031037, 4031038];
var cost = [500, 1200, 2000];

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
		if (status < 1) {
		cm.dispose();
		return;
		}
		if (status < 2) {
		cm.sendNext("You can enter the premise once you have bought the ticket. I heard there are strange devices in there everywhere but in the end, rare precious items await you. So let me know if you ever decide to change your mind.");
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
		if (cm.getPlayer().getLevel() < 20) {
			cm.sendNext("You can enter if you purchase a ticket, but it will be too much for you. Please come again after you make some more preparations. There's no telling what devices are set up deep underground!");
			cm.dispose();
			return;
			}
			cm.sendSimple("You must purchase the ticket to enter. Once you have made the purchase, you can enter through #p1052007# on the right. What would you like to buy? #b\r\n#L0#Ticket to Construction Site B1#l\r\n#L1#Ticket to Construction Site B2#l\r\n" + (cm.getPlayer().getLevel() > 99 ? "#L2#Ticket to Construction Site B3#l" : ""));
			break;
	case 1:
		select = selection;
		cm.sendYesNo("Will you purchase the Ticket to #bConstruction Site B" + (select + 1)+ "#k? It'll cost you " + cost[select] + " Mesos. Before making the purchase, please make sure you have an empty slot on your ETC inventory.");
		break;
	case 2:
		if (cm.getPlayer().getMeso() < cost[select] || cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.sendNext("Are you lacking Mesos? Check and see if you have an empty slot on your ETC inventory or not.");
			cm.dispose();
			return;
			}
		if (select == 0)
			cm.sendNext("You can insert the ticket in the #p1052007#. I heard Area 1 has some precious items available but with so many traps all over the place most come back out early. Wishing you the best of luck.");
		if (select == 1)
			cm.sendNext("You can insert the ticket in the #p1052007#. I heard Area 2 has rare, precious items available but with so many traps all over the place most come back out early. Please be safe.");
		if (select == 2) {
			cm.sendNext("You can insert the ticket in the #p1052007#. I heard Area 3 has very rare, very precious items available but with so many traps all over the place most come back out early. Wishing you the best of luck.");
			}
			cm.gainMeso(-cost[select]);
			cm.gainItem(item[select], 1);
			cm.dispose();
}
}