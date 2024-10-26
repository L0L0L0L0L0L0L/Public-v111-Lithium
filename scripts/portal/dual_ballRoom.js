/*
	名字:	維多利亞
	地圖:	秘密花園上層
	描述:	103050100
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2363)).getStatus() != 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You don't need to enter this training area."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(910350000), pi.getMap(910350000).getPortal(3)); //珠子之房
		return true;
}