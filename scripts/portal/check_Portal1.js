/*
	名字:	過去的神木村
	地圖:	燃燒的神木村2
	描述:	272000200
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31169)).getStatus() > 1) {
		pi.getPlayer().changeMap(pi.getMap(272000300), pi.getMap(272000300).getPortal(1)); //燃燒的神木村3
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Starling is injured and needs to be helped as soon as possible."));
		return false;
}