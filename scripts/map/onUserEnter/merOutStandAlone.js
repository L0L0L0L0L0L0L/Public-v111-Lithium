/*
	名字:	結冰的精靈森林
	地圖:	盛開的森林
	描述:	910150003
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getMidMsg("Press the Ctrl key to do a regular attack.", false, 0));
	ms.dispose();
}