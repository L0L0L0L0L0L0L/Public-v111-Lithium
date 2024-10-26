/*
	名字:	外星基地
	地圖:	一般牢房
	描述:	610040500
*/

function start() {
	if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28750)).getStatus() > 0 && ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28753)).getStatus() != 2) {
		Packages.server.quest.MapleQuest.getInstance(28774).forfeit(ms.getPlayer());
		Packages.server.quest.MapleQuest.getInstance(28775).forfeit(ms.getPlayer());
		Packages.server.quest.MapleQuest.getInstance(28776).forfeit(ms.getPlayer());
		Packages.server.quest.MapleQuest.getInstance(28777).forfeit(ms.getPlayer());
		Packages.server.quest.MapleQuest.getInstance(28778).forfeit(ms.getPlayer());
		ms.getPlayer().getQuestRemove(Packages.server.quest.MapleQuest.getInstance(28750));
		ms.getPlayer().getQuestRemove(Packages.server.quest.MapleQuest.getInstance(28751));
		ms.getPlayer().getQuestRemove(Packages.server.quest.MapleQuest.getInstance(28753));
		ms.getPlayer().fakeRelog();
            		}
		ms.dispose();
}