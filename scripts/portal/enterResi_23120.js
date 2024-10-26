/*
	名字:	黑色翅膀佔領地
	地圖:	埃德爾斯坦
	描述:	310000000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23120)).getStatus() != 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The door is locked."));
		return false;
		}
	if (pi.getMap(931000410).getCharacters().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "This field has already been taken by someone. Please try again later, or try a different channel."));
		return false;
		}
		pi.getMap(931000410).resetFully();
		pi.getPlayer().changeMap(pi.getMap(931000410), pi.getMap(931000410).getPortal(1)); //修亞勒的水倉庫
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Fill the water tank with the water you've brought!"));
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(310000000));
		return true;
}