/*
	名字:	妖精 艾溫
	地圖:	魔法森林
	描述:	101000000
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
		if (status < 3) {
		cm.sendNext("It's not easy making " + item + ". Please get the materials ready.");
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
		cm.sendNext("Yeah... I am the master alchemist of the fairies. But the fairies are not supposed to be in contact with a human being for a long period of time... a strong person like you will be fine, though. If you get me the materials, I'll make you a special item.");
		break;
	case 1:
		cm.sendSimple("What do you want to make? #b\r\n#L0#Moon Rock#l\r\n#L1#Star Rock#l\r\n#L2#Black Feather#l");
		break;
	case 2:
		if (selection == 0)
			cm.sendYesNo("So you want to make Moon Rock To do that you need refined one of each of these: #bBronze Plate, Steel Plate, Mithril Plate, Adamantium Plate, Silver, Orihalcon Plate and Gold#k. Throw in 10,000 mesos and I'll make it for you.");
		if (selection == 1)
			cm.sendYesNo("So you want to make the Star Rock? To do that you need refined one of each of these: #bGarnet, Amethyst, AquaMarine, Emerald, Opal, Sapphire, Topaz, Diamond and Black Crystal#k. Throw in 15,000 mesos and I'll make it for you.");
		if (selection == 2) {
			cm.sendYesNo("So you want to make Black Feather To do that you need #b1 Flaming Feather, 1 Moon Rock and 1 Black Crystal#k. Throw in 30,000 mesos and I'll make it for you. Oh yeah, this piece of feather is a very special item, so if you drop it by any chance, it'll disappear, as well as you won't be able to give it away to someone else.");
			}
			item = selection < 1 ? "Moon Rock" : selection < 2 ? "Star Rock" : "Black Feather";
			select = selection;
			break;
	case 3:
		if (select == 0) {
			if (cm.getPlayer().itemQuantity(4011000) && cm.getPlayer().itemQuantity(4011001) && cm.getPlayer().itemQuantity(4011002) && cm.getPlayer().itemQuantity(4011003) && cm.getPlayer().itemQuantity(4011004) && cm.getPlayer().itemQuantity(4011005) && cm.getPlayer().itemQuantity(4011006) && cm.getPlayer().getMeso() >= 10000) {
				for (var i = 4011000; i < 4011007; i++) {
				cm.gainItem(i, -1);
				}
				cm.gainMeso(-10000);
				cm.gainItem(4011007, 1);
				cm.sendNext("Ok here, take Moon Rock. It's well-made, probably because I'm using good materials. If you need my help down the road, feel free to come back.");
				cm.dispose();
				return;
				}
				cm.sendNext("Are you sure you have enough mesos? Please check and see if you have the refined #bBronze Plate, Steel Plate, Mithril Plate, Adamantium Plate, Silver, Orihalcon Plate and Gold#k, one of each.");
				}
		if (select == 1) {
			if (cm.getPlayer().itemQuantity(4021000) && cm.getPlayer().itemQuantity(4021001) && cm.getPlayer().itemQuantity(4021002) && cm.getPlayer().itemQuantity(4021003) && cm.getPlayer().itemQuantity(4021004) && cm.getPlayer().itemQuantity(4021005) && cm.getPlayer().itemQuantity(4021006) && cm.getPlayer().itemQuantity(4021007) && cm.getPlayer().itemQuantity(4021008) && cm.getPlayer().getMeso() >= 15000) {
				for (var j = 4021000; j < 4021009; j++) {
				cm.gainItem(j, -1);
				}
				cm.gainMeso(-15000);
				cm.gainItem(4021009, 1);
				cm.sendNext("Ok here, take Star Rock. It's well-made, probably because I'm using good materials. If you need my help down the road, feel free to come back.");
				cm.dispose();
				return;
				}
				cm.sendNext("Are you sure you have enough mesos? Please check and see if you have the refined #bGarnet, Amethyst, AquaMarine, Emerald, Opal, Sapphire, Topaz, Diamond, Black Crystal#k, one of each.");
				}
		if (select == 2) {
			if (cm.getPlayer().itemQuantity(4001006) && cm.getPlayer().itemQuantity(4011007) && cm.getPlayer().itemQuantity(4021008) && cm.getPlayer().getMeso() >= 30000) {
				for (var k = 4001006; k < 4021009; k += 10001) {
				cm.gainItem(k, -1);
				}
				cm.gainMeso(-30000);
				cm.gainItem(4031042, 1);
				cm.sendNext("Ok here, take Black Feather. It's well-made, probably because I'm using good materials. If you need my help down the road, feel free to come back.");
				cm.dispose();
				return;
				}
				cm.sendNext("Are you sure you have enough mesos? Check and see if you have #b1 Flaming Feather, #b1 Moon Rock and 1 Black Crystal#k ready for me.");
				}
				cm.dispose();
}
}