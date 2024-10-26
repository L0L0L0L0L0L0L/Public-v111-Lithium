/*
	名字:	精靈之光
	地圖:	精靈之光
	描述:	任務消耗品
*/

function start() {
	if (im.getPlayer().getMap().getId() != 927010000) {
		im.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You cannot use it here."));
		im.dispose();
		return;
		}
	if (im.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		im.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Unable to use due to monster obstruction."));
		im.dispose();
		return;
		}
		im.gainItem(2430564, -1);
		im.getPlayer().getMap().spawnNpc(1103006, new java.awt.Point(-900, 66));
		im.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20755)).setCustomData("Complete");
		im.getPlayer().updateQuest(im.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20755)), true);
		im.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The magic of the Elven Light cleared the obstacles."));
		im.dispose();
}