/*
	名字:	瑞恩島
	地圖:	瑞恩村
	描述:	140000000
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroLock(0));
	ms.dispose();
}