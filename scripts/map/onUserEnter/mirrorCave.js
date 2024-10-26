/*
	名字:	瑞恩島
	地圖:	鏡子洞窟
	描述:	140030000
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroLock(0));
	ms.dispose();
}