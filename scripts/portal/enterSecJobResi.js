/*
	名字:	黑色翅膀佔領地
	地圖:	埃德爾斯坦
	描述:	310000000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23121)).getStatus() == 1) {
	if (pi.getMap(931000420).getCharacters().size() < 1) {
		pi.getMap(931000420).resetFully();
		pi.getPlayer().changeMap(pi.getMap(931000420), pi.getMap(931000420).getPortal(1)); //危險！臨時機場
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("Thieves have attacked! Defeat all the thieves and then go see Ace the Pilot."));
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Thieves have attacked! Defeat all the thieves and then go see Ace the Pilot."));
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(310000000));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "This field has already been taken by someone. Please try again later, or try a different channel."));
		return false;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23023)).getStatus() == 1 || pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23024)).getStatus() == 1 || pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23025)).getStatus() == 1) {
	if (pi.getMap(931000100).getCharacters().size() < 1) {
		pi.getMap(931000100).resetFully();
		pi.getPlayer().changeMap(pi.getMap(931000100), pi.getMap(931000100).getPortal(1)); //2次轉職
		pi.getPlayer().getMap().spawnNpc(2159100, new java.awt.Point(-157, -23)); //須勒
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(310000000));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "This field has already been taken by someone. Please try again later, or try a different channel."));
		return false;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23141)).getStatus() > 0 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23142)).getStatus() < 2) {
		pi.getPlayer().changeMap(pi.getMap(931000600), pi.getMap(931000600).getPortal(1)); //臨時機場
		return true;
		}
		pi.getPlayer().changeMap(pi.getMap(310000010), pi.getMap(310000010).getPortal(1)); //埃德爾斯坦臨時機場
		return true;
}