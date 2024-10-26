/*
	名字:	黑色翅膀佔領地
	地圖:	埃德爾斯坦
	描述:	310000000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23925)).getStatus() == 1) {
	if (pi.getMap(931010010).getCharacters().size() < 1) {
		pi.getMap(931010010).resetFully();
		pi.getPlayer().changeMap(pi.getMap(931010010), pi.getMap(931010010).getPortal(1)); //戒備深嚴的住宅
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("Defeat the robots and get Gabrielle's clothes."));
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Guard Robots are guarding the Mansion. Defeat the robots and get Gabrielle's clothes."));
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(310000000));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You can hear someone inside the Mansion. Come back later, so you don't get caught."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(310000004), pi.getMap(310000004).getPortal(1)); //住宅
		return true;
}