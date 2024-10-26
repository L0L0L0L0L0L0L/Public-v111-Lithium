/*
	名字:	時間之路
	地圖:	三扇門
	描述:	270000000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31165)).getStatus() > 0) {
		pi.getPlayer().changeMap(pi.getMap(272000000), pi.getMap(272000000).getPortal(1)); //時間神殿
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "I can't enter this place yet. Where does it lead?"));
		return false;
}