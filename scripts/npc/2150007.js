/*
	名字:	計程車
	地圖:	埃德爾斯坦
	描述:	310000000
*/

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
		if (status > 0) {
		cm.sendNext("It's your choice.");
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
		cm.sendSimple("Hello! This is the Edelstein Taxi service. l can take members of the Black Wings safely and quickly to their destination. And if you're not part of the Black Wings? Well, l guess I'll take you as long as you pay... So, where you off to? \r\n#L0##bVerne Mine#l");
		break;
	case 1:
		cm.sendYesNo("It costs #b10,000 mesos#k to go to #bVerne Mine#k. I'm sorry, but discounts only apply to members of the Black Wings. Are you willing to pay the full price?");
		break;
	case 2:
		if (cm.getPlayer().getMeso() < 10000) {
			cm.sendNext("You don't have enough mesos! l told you, it costs 10,000 mesos. If you don't have it, you're gonna be walking.");
			cm.dispose();
			return;
			}
			cm.dispose();
			cm.gainMeso(-10000);
			cm.getPlayer().changeMap(cm.getMap(310040200), cm.getMap(310040200).getPortal(3));
}
}