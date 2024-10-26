/*
	名字:	亞凱斯特的水晶
	地圖:	亞凱斯特的水晶
	描述:	任務消耗品
*/

function start() {
	if (im.getPlayer().getMap().getId() != 211060400) {
		im.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You cannot use it here."));
		im.dispose();
		return;
		}
		im.gainItem(2430159, -1);
		im.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3182)).setCustomData("211060400");
		im.getPlayer().updateQuest(im.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3182)), true);
		im.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The crystal emits a mysterious light, and the curse is also shattered."));
		im.dispose();
}