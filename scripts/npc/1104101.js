/*
	名字:	奧茲
	地圖:	練武場入口
	描述:	913002400
*/

function start() {
	if (cm.getPlayer().getJob() != 1210) {
		cm.sendOk("How is the search going? I don't see anything suspicious around the area. I'll keep looking, so please search other areas as well.");
		cm.dispose();
		return;
		}
		cm.sendNext("Darn, you found me! Then there's only one way out! Let's fight, like #rBlack Wings#k should!");
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.removeNpc(cm.getPlayer().getMap().getId(), cm.getNpc());
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001009), new java.awt.Point(472, 70));
		}
		cm.dispose();
}