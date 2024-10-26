/*
	名字:	精靈之林
	地圖:	國王休息處
	描述:	101050010
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(0));
	ms.dispose();
}