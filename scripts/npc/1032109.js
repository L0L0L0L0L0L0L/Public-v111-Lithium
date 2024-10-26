/*
	名字:	魔法圖書館角落
	地圖:	魔法圖書館
	描述:	910110000
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20718)).getCustomData() == null) {
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20718)).setCustomData(1);
		for (var i = 0; i < 20; i++)
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(2220100), new java.awt.Point(-250 + (Math.random() * 400), 183));
		Packages.server.quest.MapleQuest.getInstance(20732).forceStart(pi.getPlayer(), 0, 1);
		cm.showNpcSpecialEffect(1032109, "blackShadow");
		}
		cm.dispose();
}