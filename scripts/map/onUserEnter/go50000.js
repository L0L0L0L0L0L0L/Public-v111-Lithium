/*
	名字:	楓之島
	地圖:	大菇菇
	描述:	50000
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("maplemap/enter/50000", 3));
	ms.dispose();
}