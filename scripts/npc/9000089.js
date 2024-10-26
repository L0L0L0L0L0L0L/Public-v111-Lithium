/*
	Name:	Taxi
	Map:	Taxi
	Description:	Taxi
*/

var map = [104000000, 100000000, 102000000, 101000000, 103000000, 120000000];
var cost = [1200, 1000, 1000, 800, 1000, 1000];

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
			cm.sendNext("Hello, would you like to travel quickly and safely to other villages? To prioritize customer satisfaction, please use #p" + cm.getNpc() + "# to assist you.");
			break;
		case 1:
			var chat = "We have a special 90% discount for beginners. Please choose the village you want to go to.";
			for (var i = 0; i < map.length; i++)
				if (map[i] != cm.getPlayer().getMap().getId())
					chat += "\r\n#L" + i + "##b#m" + map[i] + "##k(" + (cost[i] / (cm.getPlayer().getJob() == 0 ? 10 : 1)) + " mesos)#l";
			cm.sendSimple(!(cm.getPlayer().itemQuantity(4032313) || cm.getPlayer().itemQuantity(4033074)) ? chat : "Hey! It looks like you have a discount ticket. I can take you for free to " + (cm.getPlayer().itemQuantity(4032313) ? "#m100000000#" : "#m102020400#") + ".\r\n#L0##bUse " + (cm.getPlayer().itemQuantity(4032313) ? "#t4032313#" : "#t4033074#") + "#l");
			break;
		case 2:
			if (cm.getPlayer().itemQuantity(4032313) || cm.getPlayer().itemQuantity(4033074)) {
				cm.gainItem(cm.getPlayer().itemQuantity(4033074) ? 4033074 : 4032313, -1);
				map = cm.getPlayer().itemQuantity(4033074) ? 102020400 : 100000000;
				cm.getPlayer().changeMap(cm.getMap(map), cm.getMap(map).getPortal(cm.getPlayer().itemQuantity(4033074) ? 1 : 3));
				cm.dispose();
				return;
			}
			select = selection;
			cm.sendYesNo("Do you really want to go to #m" + map[select] + "#? The fare is #b" + (cost[select] / (cm.getPlayer().getJob() == 0 ? 10 : 1)) + "#k mesos.");
			break;
		case 3:
			if (cm.getPlayer().getMeso() > (cost[select] / (cm.getPlayer().getJob() == 0 ? 10 : 1))) {
				cm.gainMeso(-(cost[select] / (cm.getPlayer().getJob() == 0 ? 10 : 1)));
				cm.getPlayer().changeMap(cm.getMap(map[select]), cm.getMap(map[select]).getPortal(0));
				cm.dispose();
				return;
			}
			cm.sendOk("Sorry, it seems you don’t have enough mesos to pay for the fare.");
			cm.dispose();
	}
}