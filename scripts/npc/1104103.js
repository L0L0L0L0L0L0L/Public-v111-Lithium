/*
	名字:	伊卡勒特
	地圖:	提魯森林
	描述:	913002300
*/

function start() {
	if (cm.getPlayer().getJob() != 1410) {
		cm.sendOk("How's the search? I don't see anything different here. I'll stay here and keep looking, so you can search other areas.");
		cm.dispose();
		return;
		}
		cm.sendNext("Darn, you found me! Then there's only one way out! Let's fight, like #rBlack Wings#k should!");
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.removeNpc(cm.getPlayer().getMap().getId(), cm.getNpc());
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001009), new java.awt.Point(-2162, 88));
		}
		cm.dispose();
}