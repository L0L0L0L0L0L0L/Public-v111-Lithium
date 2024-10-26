/*
	名字:	卡伊琳
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
		cm.sendNext("If you wish to experience what it's like to be a Pirate, come see me again.");
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
		cm.sendNext("Pirates never miss their targets, as they fire based on their excellent dexterity and strength or use physical skills to instantly suppress enemies. The Gunslinger rains down rapid-fire shots and calls forth various summons. The Brawler displays physical fighting skills, and can also call on the fearsome Sea Serpent.");
		break;
	case 1:
		cm.sendYesNo("Do you want to preview the Pirate?");
		break;
	case 2:
		cm.dispose();
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroLock(1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroDisableUI(true));
		cm.getPlayer().changeMap(cm.getMap(1020500), cm.getMap(1020500).getPortal(0)); //Effect/Direction3.img/pirate/Scene00
}
}