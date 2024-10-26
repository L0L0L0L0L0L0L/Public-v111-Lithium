/*
	名字:	結界的圖騰
	地圖:	結界的圖騰
	描述:	任務消耗品
*/

function start() {
	if (im.getPlayer().getMap().getId() != 211041400) {
		im.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You cannot use it here."));
		im.dispose();
		return;
		}
		im.gainItem(2430180, -1);
		im.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3192)).setCustomData(1);
		im.getPlayer().updateQuest(im.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3192)), true);
		im.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The totem emitted a dazzling light and began to ignite flames."));
		im.dispose();
}