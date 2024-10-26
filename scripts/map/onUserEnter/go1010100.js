/*
	名字:	楓之島
	地圖:	冒險者修練場1
	描述:	1010100
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("maplemap/enter/1010100", 3));
	ms.dispose();
}