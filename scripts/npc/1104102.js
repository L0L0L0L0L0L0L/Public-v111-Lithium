/*
	名字:	伊麗娜
	地圖:	提諾森林
	描述:	913002000
*/

function start() {
	if (cm.getPlayer().getJob() != 1310) {
		cm.sendOk("How's the search? I don't see anything peculiar around the area I'll keep my eye on the area, so I want you to search other areas as well.");
		cm.dispose();
		return;
		}
		cm.sendNext("Darn, you found me! Then there's only one way out! Let's fight, like #rBlack Wings#k should!");
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.removeNpc(cm.getPlayer().getMap().getId(), cm.getNpc());
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001009), new java.awt.Point(2520, 78));
		}
		cm.dispose();
}