/*
	名字:	伊培賀
	地圖:	青蛙嘴的家
	描述:	922030001
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
		cm.sendNextS("I can't believe you've come all this way. Seeing your face, I presume you are quite angry.", 1);
		break;
	case 1:
		cm.sendNextPrevS("You deceived me! You were lying to me all this time! I will not let you get away with this!", 3);
		break;
	case 2:
		cm.sendNextPrevS("What do you mean I deceived you? You let yourself imagine what you wanted. Anyway, thanks to you, we were able to accomplish quite a lot. But you are nothing but a hindrance now.", 1);
		break;
	case 3:
		cm.sendNextPrevS("You'd better get out of here now.", 1);
		break;
	case 4:
		cm.removeNpc(cm.getPlayer().getMap().getId(), cm.getNpc());
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300393), new java.awt.Point(196, -21));
		cm.dispose();
}
}