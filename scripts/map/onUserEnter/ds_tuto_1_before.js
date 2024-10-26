/*
	名字:	隱藏地圖
	地圖:	場面轉換1
	描述:	927000080
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case - 1:
		ms.dispose();
		return;
	case 0:
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("demonSlayer/text8", 3));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 1:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("demonSlayer/text9", 3));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 3000));
		break;
	case 2:
		ms.dispose();
		ms.getPlayer().changeMap(ms.getMap(927000010), ms.getMap(927000010).getPortal(0));
}
}