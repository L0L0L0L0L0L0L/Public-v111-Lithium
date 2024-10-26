/*
	名字:	菇菇王國
	地圖:	城堡邊邊
	描述:	106020502
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroLock(0));
	ms.dispose();
}