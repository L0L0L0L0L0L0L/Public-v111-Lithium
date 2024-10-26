/*
	名字:	龍沉睡的島
	地圖:	寂靜的洞穴
	描述:	914100022
*/

function act() {
	rm.getPlayer().getMap().killMonster(9300391);
	Packages.server.quest.MapleQuest.getInstance(22605).forceStart(rm.getPlayer(), 0, 1);
}