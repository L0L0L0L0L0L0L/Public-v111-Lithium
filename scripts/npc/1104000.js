/*
	名字:	普蘭西斯
	地圖:	傀儡師的洞穴
	描述:	910510000
*/

function start() {
	cm.sendNext("Wait, what is this? Who are you? What... #ba Cygnus Knight?#k How did you find me...? Well, since I'm found and all. as a Proud member of #rthe Black Wings#k, prepare to die, Knight!");
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.removeNpc(cm.getPlayer().getMap().getId(), cm.getNpc());
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300285), new java.awt.Point(479, 245));
		}
		cm.dispose();
}