/*
	名字:	墮落城市地鐵
	地圖:	2號線第2區段
	描述:	103020410
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2866)).getStatus() == 1) {
	if (pi.getMap(910310200).getCharacters().size() < 1) {
		pi.getMap(910310200).resetFully();
		pi.getPlayer().changeMap(pi.getMap(910310200), pi.getMap(910310200).getPortal(1)); //2號線3區間
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(103020410));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You cannot go to #m103020420# at this time. Try again later."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(103020420), pi.getMap(103020420).getPortal(3)); //2號線3區間
		return true;
}