/*
	名字:	猶塔家	
	地圖:	小閣樓
	描述:	100030100
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(0));
	ms.dispose();
}