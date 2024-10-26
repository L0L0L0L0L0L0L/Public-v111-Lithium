/*
	名字:	楓之島
	地圖:	冒險者修練場4
	描述:	1010400
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("maplemap/enter/1010400", 3));
	ms.dispose();
}