/*
	名字:	危險的躲迷藏
	地圖:	礦山後面
	描述:	931000030
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(0));
	ms.dispose();
}