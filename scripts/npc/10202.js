/*
	名字:	武術教練
	地圖:	選擇岔道
	描述:	1020000
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
		if (status > 0) {
		cm.sendNext("If you wish to experience what it's like to be a Warrior, come see me again.");
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
		cm.sendNext("Warriors possess an enormous power with stamina to back it up, and they shine the brightest in melee combat situation. Regular attacks are powerful to begin with, and armed with complex skills, the job is perfect for explosive attacks.");
		break;
	case 1:
		cm.sendYesNo("So, do you want to preview the Warrior?");
		break;
	case 2:
		cm.dispose();
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroLock(1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroDisableUI(true));
		cm.getPlayer().changeMap(cm.getMap(1020100), cm.getMap(1020100).getPortal(0)); //Effect/Direction3.img/swordman/Scene00
}
}