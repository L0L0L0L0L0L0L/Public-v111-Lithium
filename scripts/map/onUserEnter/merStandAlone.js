/*
	名字:	結冰的精靈森林
	地圖:	發光的洞穴入口
	描述:	910150002
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getMidMsg("Press the Up key to go to the connected area.", false, 0));
	ms.dispose();
}