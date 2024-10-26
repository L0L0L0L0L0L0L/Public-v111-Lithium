/*
	名字:	赫麗娜
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
		cm.sendNext("If you wish to experience what it's like to be a Bowmen, come see me again.");
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
		cm.sendNext("Bowmen are blessed with dexterity and power, taking charge of long-distance attacks, providing support for those at the front line of the battle. Very adept at using landscape as part of the arsenal.");
		break;
	case 1:
		cm.sendYesNo("Do you want to preview the Bowman?");
		break;
	case 2:
		cm.dispose();
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroLock(1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroDisableUI(true));
		cm.getPlayer().changeMap(cm.getMap(1020300), cm.getMap(1020300).getPortal(0)); //Effect/Direction3.img/archer/Scene00
}
}