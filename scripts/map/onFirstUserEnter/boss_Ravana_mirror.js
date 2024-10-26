/*
	名字:	黃金寺廟
	地圖:	惡靈洞穴
	描述:	809061010
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("Ravana has appeared."));
	ms.dispose();
}