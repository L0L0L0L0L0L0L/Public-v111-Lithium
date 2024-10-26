/*
	名字:	楓之島
	地圖:	楓之港
	描述:	2000000
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("maplemap/enter/2000000", 3));
	ms.dispose();
}