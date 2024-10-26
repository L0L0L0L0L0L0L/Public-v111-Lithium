/*
	名字:	隱藏地圖
	地圖:	秘密廣場1
	描述:	931050010
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(1));
	ms.dispose();
	ms.openNpc(2159314);
}