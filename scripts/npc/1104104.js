/*
	名字:	鷹眼
	地圖:	提弗森林
	描述:	913002100
*/

function start() {
	if (cm.getPlayer().getJob() != 1510) {
		cm.sendOk("How's the search? I don't see anything suspicious here, but who knows?");
		cm.dispose();
		return;
		}
		cm.sendNext("Oh... did l just get found? Then there's only one way out! Let's fight, like a #rBlack Wing#k should!");
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.removeNpc(cm.getPlayer().getMap().getId(), cm.getNpc());
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001009), new java.awt.Point(3633, 88));
		}
		cm.dispose();
}