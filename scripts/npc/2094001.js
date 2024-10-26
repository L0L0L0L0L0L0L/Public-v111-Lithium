/*
    Name: Yu Yang
    Map: Yu Yang's Gratitude
    Description: 925100600
*/

var status;
var item;
var qty;

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
			if (cm.getPlayer().getMap().getId() == 925100500) {
				cm.sendYesNo("Sob!! I didn't expect you to come and rescue me. It seems that my grandfather still cares a lot for me. Thank you so much for your help. Please accept this commemorative gift.\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v4001455# #t4001455# 1");
			}
			if (cm.getPlayer().getMap().getId() == 925100600) {
				var chat = "Sir, thank you for your help in freeing me from the pirates. I will remember your great kindness. If you have any extra Pirate King Hat Fragments, I can craft some items for you. #b";
				item = ["Craft #z1002571#", "Craft #z1002572#", "Craft #z1002573#", "Craft #z1002574#", "Leave here"];
				for (var i = 0; i < item.length; i++)
					chat += "\r\n#L" + i + "#" + item[i] + "#l";
				cm.sendSimple(chat);
			}
			break;
		case 1:
			if (cm.getPlayer().getMap().getId() == 925100500) {
				if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
					cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Not enough space in the ETC inventory"));
					cm.dispose();
					return;
				}
				cm.getPlayer().changeMap(cm.getMap(925100600), cm.getMap(925100600).getPortal(0));
				cm.gainItem(4001455, 1);
				cm.dispose();
				return;
			}
			if (selection < 4) {
				item = [1002571, 1002572, 1002573, 1002574];
				qty = [10, 20, 40, 60];
				cm.sendYesNo("Would you like to craft #z" + item[selection] + "#? Just provide the necessary materials.\r\n\r\n#v4001455# #t4001455# " + qty[selection] + "");
			}
			if (selection > 3) {
				cm.getPlayer().changeMap(cm.getMap(925100700), cm.getMap(925100700).getPortal(0));
				cm.dispose();
				return;
			}
			select = selection;
			break;
		case 2:
			if (cm.getPlayer().itemQuantity(4001455) < qty[select]) {
				cm.sendOk("Sorry, the materials you provided are not enough to meet the crafting requirements.");
				cm.dispose();
				return;
			}
			if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
				cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Not enough space in the equipment inventory"));
				cm.dispose();
				return;
			}
			cm.gainItem(4001455, -qty[select]);
			cm.gainItem(item[select], 1);
			cm.sendOk("#h0# Sir, here is your #z" + item[select] + "#. Please take good care of it.");
			cm.dispose();
	}
}
