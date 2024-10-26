/*
	名字:	耶雷弗
	地圖:	聯盟會議場
	描述:	913050010
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroLock(0));
	ms.dispose();
}