/*
	名字:	武英
	地圖:	被封印的寺院
	描述:	925040100
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		cm.dispose();
		return;
	case 0:
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		cm.sendNextS("I have been waiting for you, the hero's successor.", 8);
		break;
	case 1:
		cm.sendNextPrevS("#b(The hero's successor? The Shadow Knight must know something. But like Mu Gong, you suspect he doesn't does realize that you ARE the hero.)", 2);
		break;
	case 2:
		cm.sendNextPrevS("The #bSeal Stone of Mu Lung#k is a seed that was sown by the heroes but we, the Black Wings, will be the ones that reap! You've fought some impressive battles against Francis and Dargoth, but I shall end your winning streak!", 8);
		break;
	case 3:
		cm.sendNextPrevS("It's a shame that I am facing the hero's successor as an enemy, but there is nothing I can do now. As a member of the Black Wings, I shall destroy you!", 8);
		break;
	case 4:
		cm.removeNpc(cm.getPlayer().getMap().getId(), cm.getNpc());
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300351), new java.awt.Point(897, 51));
		cm.dispose();
}
}