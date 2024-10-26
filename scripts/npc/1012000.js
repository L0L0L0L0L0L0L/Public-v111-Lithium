/*
	名字:	維多利亞計程車
	地圖:	弓箭手村
	描述:	100000000
*/

var map = [100000000, 101000000, 102000000, 103000000, 104000000, 105000000, 120000000];

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
		cm.sendNext("Use our taxi anytime you want to go to another town!");
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
		var reactor = 'action' + (cm.getPlayer().itemQuantity(4033074) ? 0 : 1);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("Ah, of course. Dr.Betty mentioned you. Do you have the coupon? Give it to me, and l will take you to Dr. Winston.");
		break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(102020400), cm.getMap(102020400).getPortal(1));
		cm.gainItem(4033074, -1);
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("Hello! I'm #p1012000#, and l am here to take you to your destination, quickly and safety. #b#p1012000##k values your satisfaction, so you can always reach your destination at an affordable price. l am here to serve you.");
		break;
	case 1:
		var chat = cm.getPlayer().getJob() == 0 ? "I offer a special 90 % discount for beginners. Please choose your destination." : "Please select your destination.";
		for (var i = 0; i < map.length; i++)
		if (map[i] != cm.getPlayer().getMap().getId())
		chat += "\r\n#L" + i + "##b#m" + map[i] + "# (" + (1000 / (cm.getPlayer().getJob() == 0 ? 10 : 1)) + " Meso)#l";
		cm.sendSimple(chat);
		break;
	case 2:
		select = selection;
		var Txt1 = "You don't have anything else to do here, huh? Do you really want to go to #b#m" + map[select] + "##k? It'll cost you #b" + (1000 / (cm.getPlayer().getJob() == 0 ? 10 : 1)) + " mesos#k.";
		var Txt2 = "Oh? That's a taxi coupon, isn't it? People who have Tru Taxi Coupon can go to Henesys 1 time for free. Would you like to go to Henesys right now?"
		cm.sendYesNo((cm.getPlayer().itemQuantity(4032313) && select == 0) ? Txt2 : Txt1);
		break;
	case 3:
		if (cm.getPlayer().itemQuantity(4032313) && select == 0) {
			cm.getPlayer().changeMap(cm.getMap(100000000), cm.getMap(100000000).getPortal(3));
			cm.gainItem(4032313, -1);
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getMeso() > (1000 / (cm.getPlayer().getJob() == 0 ? 10 : 1))) {
			cm.gainMeso(-(1000 / (cm.getPlayer().getJob() == 0 ? 10 : 1)));
			cm.getPlayer().changeMap(cm.getMap(map[select]), cm.getMap(map[select]).getPortal(0));
			cm.dispose();
			return;
			}
			cm.sendOk("You don't have enough mesos. Sorry to say this, but without them, you won't be able to ride the cab.");
			cm.dispose();
}
}