/*
	名字:	時間之路
	地圖:	三扇門
	描述:	270000000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20755)).getStatus() > 1 || pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20755)).getCustomData() == "Complete") {
		pi.getPlayer().changeMap(pi.getMap(272030000), pi.getMap(272030000).getPortal(1)); //次元的縫隙
		return true;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20755)).getStatus() > 0) {
	if (pi.getMap(927010000).getCharacters().size() < 1) {
		pi.getMap(927010000).resetFully();
		pi.getPlayer().changeMap(pi.getMap(927010000), pi.getMap(927010000).getPortal(0)); //時間神殿迴廊
		pi.getPlayer().startMapTimeLimitTask(420, pi.getMap(270000000));
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "This field has already been taken by someone. Please try again later, or try a different channel."));
		return false;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20752)).getStatus() == 1) {
		pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20752)).setCustomData("find");
		pi.getPlayer().updateQuest(pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20752)), true);
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You feel a strange energy here."));
		return false;
}