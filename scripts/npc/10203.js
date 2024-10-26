/*
	名字:	達克魯
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
		cm.sendNext("If you wish to experience what it's like to be a Thief, come see me again.");
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
		cm.sendNext("The Thief is a class that possesses Luck, as well as some Dexterity and Strength. They have special battlefield skills, such as ambushing or hiding. The Thief is highly mobile and difficult to hit, making them fun classes to play with.");
		break;
	case 1:
		cm.sendYesNo("Do you want to preview the Thief?");
		break;
	case 2:
		cm.dispose();
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroLock(1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroDisableUI(true));
		cm.getPlayer().changeMap(cm.getMap(1020400), cm.getMap(1020400).getPortal(0)); //Effect/Direction3.img/rouge/Scene00
}
}