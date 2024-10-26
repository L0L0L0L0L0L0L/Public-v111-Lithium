/*
	名字:	楓之島
	地圖:	冒險者修練場2
	描述:	1010200
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("maplemap/enter/1010200", 3));
	ms.dispose();
}