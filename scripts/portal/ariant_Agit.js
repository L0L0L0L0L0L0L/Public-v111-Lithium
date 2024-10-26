/*
	名字:	納希沙漠
	地圖:	納希民宅
	描述:	260000200
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3936)).getStatus() > 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The lock opens from the inside of the door. The door slowly opens."));
		pi.getPlayer().changeMap(pi.getMap(260000201), pi.getMap(260000201).getPortal(1)); //破舊的空屋
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The door is locked."));
		return false;
}