/*
	名字:	米哈逸
	地圖:	提姆森林
	描述:	913002200
*/

function start() {
	if (cm.getPlayer().getJob() != 1110) {
		cm.sendOk("What's going on? How's the search? The Master of Disguise was not found in this area. I'll Stay here and be on the lookout. so you can search other arena instead.");
		cm.dispose();
		return;
		}
		cm.sendNext("Darn, you found me! Then there's only one way out! Let's fight, like #rBlack Wings#k should!");
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.removeNpc(cm.getPlayer().getMap().getId(), cm.getNpc());
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001009), new java.awt.Point(250, 88));
		}
		cm.dispose();
}