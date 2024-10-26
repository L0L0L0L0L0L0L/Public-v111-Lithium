/*
	名字:	乾枯的路
	地圖:	礦山後路
	描述:	310040210
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20741)).getStatus() == 1) {
		pi.getPlayer().changeMap(pi.getMap(931050600), pi.getMap(931050600).getPortal(1)); //傑利麥勒實驗室入口
		return true;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23144)).getStatus() == 1) {
		pi.getPlayer().changeMap(pi.getMap(931000630), pi.getMap(931000630).getPortal(2)); //傑利麥勒實驗室入口
		return true;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23146)).getStatus() == 1) {
	if (pi.getMap(931000640).getCharacters().size() < 1) {
		pi.getMap(931000640).resetFully();
		pi.getPlayer().changeMap(pi.getMap(931000640), pi.getMap(931000640).getPortal(1)); //傑利麥勒實驗室入口
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(310040210));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "This field has already been taken by someone. Please try again later, or try a different channel."));
		return false;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23147)).getStatus() == 1 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23150)).getStatus() != 1) {
	if (pi.getMap(931000650).getCharacters().size() < 1) {
		pi.getMap(931000650).resetFully();
		pi.getPlayer().changeMap(pi.getMap(931000650), pi.getMap(931000650).getPortal(1)); //傑利麥勒實驗室入口
		pi.openNpc(2159349);
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(310040210));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "This field has already been taken by someone. Please try again later, or try a different channel."));
		return false;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22613)).getStatus() == 1) {
	if (pi.getMap(931050720).getCharacters().size() < 1) {
		pi.getPlayer().changeMap(pi.getMap(931050720), pi.getMap(931050720).getPortal(1)); //實驗室內部
		pi.getPlayer().startMapTimeLimitTask(1200, pi.getMap(310040210));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "This field has already been taken by someone. Please try again later, or try a different channel."));
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "There's a loud noise coming from in there... Maybe you shouldn't go in."));
		return false;
}