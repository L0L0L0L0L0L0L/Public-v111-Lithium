/*
	名字:	詛咒之林
	地圖:	玩偶師的避難所
	描述:	101040311
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21734)).getStatus() == 1) {
		pi.getPlayer().changeMap(pi.getMap(910510100), pi.getMap(910510100).getPortal(1)); //傀儡師秘密通路
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Something seems to be blocking its way."));
		return false;
}