/*
	名字:	愛奧斯之石I
	地圖:	愛奧斯塔100樓
	描述:	221023200
*/

var map = [221020000, 221021200, 221022100];

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
		cm.sendNext("Please try again later.");
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
		var chat = "It's a magic stone for Eos Tower tourists. It will take you to your desired location for a small fee. \r\n(You can use a #bEos Rock Scroll#k in lieu of mesos.)";
		for (var i = 0; i < map.length; i++)
		chat += "\r\n#L" + i + "##b#m" + map[i] + "#(15000 Mesos)#l";
		cm.sendSimple(chat);
	case 1:
		select = selection;
		cm.sendYesNo("Would you like to move to #b#m" + map[select] + "##k? The price is #b15000 mesos#k.");
		break;
	case 2:
		if (cm.getPlayer().getMeso() < 15000) {
			cm.sendNext("You don't have enough mesos. Sorry, but you can't use this service if you can't pay the fee.");
			cm.dispose();
			return;
			}
			cm.dispose();
			cm.gainMeso(-15000);
			cm.getPlayer().changeMap(cm.getMap(map[select]), cm.getMap(map[select]).getPortal(0));
}
}