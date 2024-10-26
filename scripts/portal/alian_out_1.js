/*
	名字:	馬萊尼西亞島
	地圖:	叢林山谷
	描述:	600010300
*/

var quest = [28748, 28757, 28758, 28760, 28767]

function enter(pi) {
	for (var i = 0; i < quest.length; i ++)
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(quest[i])).getStatus() != 1) {
		pi.getPlayer().changeMap(pi.getMap(600010200), pi.getMap(600010200).getPortal(5)); //克蘭卡叢林盆地
		return true;
		}
		pi.openNpc(9201174);
		return true;
}