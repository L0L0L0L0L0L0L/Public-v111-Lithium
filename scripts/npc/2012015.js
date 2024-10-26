/*
	名字:	冰原雪域魔法石
	地圖:	天空之城塔&amp;lt;1層&gt;
	描述:	200082100
*/

var map = [200080200, 200080600, 200081400];

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
		var chat = "This is a magic stone for Orbis Tower travelers. This will take you to your desired floor if you pay a fee. \r\n(You can use the #bOrbis Rock Scroll#k in place of Mesos.)";
		for (var i = 0; i < map.length; i++)
		chat += "\r\n#L" + i + "##b#m" + map[i] + "# (5000 Mesos)#l";
		cm.sendSimple(chat);
	case 1:
		select = selection;
		cm.sendYesNo("Would you like to move to #b#m" + map[select] + "##k? The price is #b5000 mesos#k.");
		break;
	case 2:
		if (cm.getPlayer().getMeso() < 5000) {
			cm.sendNext("You don't have enough mesos. Sorry, but you can't use this service if you can't pay the fee.");
			cm.dispose();
			return;
			}
			cm.dispose();
			cm.gainMeso(-5000);
			cm.getPlayer().changeMap(cm.getMap(map[select]), cm.getMap(map[select]).getPortal(0));
}
}