/*
	名字:	保管庫書桌
	地圖:	危險的圖書館
	描述:	930010000
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21764)).getStatus() > 0) {
		cm.sendNextS("Oh no! The Gentlemen has already taken the Seal Stone! Head to Athena Pierce!", 2);
		cm.dispose();
		return;
		}
		Packages.server.quest.MapleQuest.getInstance(21764).forceStart(cm.getPlayer(), 0, 1);
		cm.sendOkS("The Seal Stone should be here somewhere... Wait a minute, it's gone! No way... It couldn't have been the Black Wings, could it...?!", 2);
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300353), new java.awt.Point(-249, 68));
		cm.dispose();
}