/*
	名字:	楓之島
	地圖:	小樹林
	描述:	40000
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("maplemap/enter/40000", 3));
	ms.dispose();
}