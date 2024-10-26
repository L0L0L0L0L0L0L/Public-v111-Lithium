/*
	名字:	隱密之地
	地圖:	茂盛的森林
	描述:	900020110
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(0));
	ms.dispose();
}