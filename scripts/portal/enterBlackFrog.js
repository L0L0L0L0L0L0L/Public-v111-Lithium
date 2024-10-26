/*
	名字:	玩具城
	地圖:	玩具城村莊
	描述:	220000300
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22596)).getStatus() == 1) {
	if (pi.getMap(922030001).getCharacters().size() > 0) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "This field has already been taken by someone. Please try again later, or try a different channel."));
		return false;
		}
		pi.getMap(922030001).resetFully();
		pi.getPlayer().changeMap(pi.getMap(922030001), pi.getMap(922030001).getPortal(1)); //青蛙嘴的家
		pi.getPlayer().getMap().spawnNpc(1013206, new java.awt.Point(146, -21));
		pi.getPlayer().startMapTimeLimitTask(600, pi.getMap(220000300));
		return true;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22581)).getStatus() > 0 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22596)).getStatus() < 2) {
		pi.getPlayer().changeMap(pi.getMap(922030000), pi.getMap(922030000).getPortal(1)); //青蛙嘴的家
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The door is locked."));
		return false;
}