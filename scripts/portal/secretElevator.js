/*
	名字:	水泥路
	地圖:	埃德爾斯坦散步路道3
	描述:	310030200
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23947)).getStatus() > 1) {
	if (pi.getMap(310030210).getCharacters().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "It's a strange-looking machine. Looks like it's on."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(310030210), pi.getMap(310030210).getPortal(0)); //秘密通道
		pi.getPlayer().startMapTimeLimitTask(15, pi.getMap(310060120));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "It's a strange-looking machine. Don't touch it. It looks dangerous."));
		return false;
}