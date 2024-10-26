/*
	名字:	雷本礦山
	地圖:	發電廠大廳
	描述:	310050000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(24088)).getStatus() == 1) {
	if (pi.getMap(931040000).getCharacters().size() < 1) {
		pi.getMap(931040000).resetFully();
		pi.getPlayer().changeMap(pi.getMap(931040000), pi.getMap(931040000).getPortal(1)); //人偶師房間
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(310050000));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "This field has already been taken by someone. Please try again later, or try a different channel."));
		return false;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23268)).getStatus() == 1) {
		pi.getPlayer().changeMap(pi.getMap(931050220), pi.getMap(931050220).getPortal(1)); //普蘭西斯的房間
		return true;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23954)).getStatus() == 1) {
	if (pi.getMap(931020010).getCharacters().size() < 1) {
		pi.getPlayer().changeMap(pi.getMap(931020010), pi.getMap(931020010).getPortal(1)); //普蘭西斯的房間
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Defeat all the puppets inside Francis's room."));
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(310050000));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Francis's room is locked. Come back later."));
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "It appears to be someone's room... Sounds noisy in there, so you probably shouldn't go in."));
		return false;
}