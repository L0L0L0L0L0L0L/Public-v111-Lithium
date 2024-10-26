/*
	名字:	阿杜比斯的任務Ⅰ
	地圖:	1-2區域
	描述:	280010011
*/

function act() {
	rm.getPlayer().changeMap(rm.getMap(280010000), rm.getMap(280010000).getPortal(0));
	rm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "An unknown force has returned you to the starting point."));
}