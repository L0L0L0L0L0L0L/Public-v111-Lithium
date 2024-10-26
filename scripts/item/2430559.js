/*
	名字:	盧頓的技能書
	地圖:	盧頓的技能書
	描述:	任務消耗品
*/

function start() {
	im.gainItem(2430559, -1);
	im.gainItem(2290285, 1);
	im.getPlayer().updateInfoQuest(3152, ";use=1;use=1");
	im.getPlayer().updateQuest(im.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3152)), true);
	im.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Obtained [Mastery Book] Mystery Mastery Book."));
	im.dispose();
}