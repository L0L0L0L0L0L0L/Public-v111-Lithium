/*
	名字:	馬萊尼西亞島
	地圖:	克蘭卡叢林盆地
	描述:	600010200
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28746)).getStatus() < 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Due to the damage caused by the earthquake, the road ahead has been closed."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(600010300), pi.getMap(600010300).getPortal(1)); //叢林山谷
		return false;
}