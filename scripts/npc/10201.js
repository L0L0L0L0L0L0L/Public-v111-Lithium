/*
	名字:	漢斯
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
		cm.sendNext("If you wish to experience what it's like to be a Magician, come see me again.");
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
		cm.sendNext("Magicians possess elemental magic with fancy effects, and various support magic useful in party hunting. The elemental magic learned after the 2nd Job Advancement inflicts fatal damage on enemies with the opposite element.");
		break;
	case 1:
		cm.sendYesNo("So, do you want to preview the Magician?");
		break;
	case 2:
		cm.dispose();
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroLock(1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroDisableUI(true));
		cm.getPlayer().changeMap(cm.getMap(1020200), cm.getMap(1020200).getPortal(0)); //Effect/Direction3.img/magician/Scene00
}
}