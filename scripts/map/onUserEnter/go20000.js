/*
	名字:	楓之島
	地圖:	嫩寶村
	描述:	20000
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("maplemap/enter/20000", 3));
	ms.dispose();
}