/*
	名字:	隱藏地圖
	地圖:	惡魔殺手LOGO
	描述:	931050310
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
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction6.img/DemonTutorial/SceneLogo"));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 6300));
		break;
	case 1:
		ms.dispose();
		ms.getPlayer().changeMap(ms.getMap(927000000), ms.getMap(927000000).getPortal(0));
}
}