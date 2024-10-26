/*
	名字:	翅膀使者
	地圖:	危險的發電所
	描述:	931040010
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
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
		qm.sendNext("That's #rCommander #p1033230##k, leader of the Black Mage's army, thank you very much!");
		break;
	case 1:
		qm.sendNextPrevS("How are you still alive?", 2);
		break;
	case 2:
		qm.sendNextPrev("I could say the same to you. Anyway, ever since I heard you were out there, running around Maple World, I've wanted to see you again. I'd say this worked out quite nicely, don't you?");
		break;
	case 3:
		qm.sendNextPrevS("I thought the Black Wings knew an awful lot about me, and now I know why.", 2);
		break;
	case 4:
		qm.sendNextPrev("That's right! I've been telling my friends here ALL about you. They're a good little bunch of minions, if a bit overeager at times.");
		break;
	case 5:
		qm.sendNextPrevS("Minions...?", 2);
		break;
	case 6:
		qm.sendNextPrev("Yes. You've met them, of course. In fact, they guided you here.");
		break;
	case 7:
		qm.sendNextPrevS("You're the master of the Black Wings!", 2);
		break;
	case 8:
		qm.sendNextPrev("How astute! Yes, I am the founder. I got bored, you see, being alone all those years.");
		break;
	case 9:
		qm.sendNextPrevS("But why? The Black Mage is gone! What's the point of all this?", 2);
		break;
	case 10:
		qm.sendNextPrev("You may have sealed the Black Mage away, but soon he will... Oh my, I almost told you a secret! You crafty Elf!");
		break;
	case 11:
		qm.sendNextPrev("Enough talking. Let's play!");
		break;
	case 12:
		qm.removeNpc(qm.getPlayer().getMap().getId(), 1033230);
		Packages.server.quest.MapleQuest.getInstance(24091).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300435), new java.awt.Point(716, 5));
		qm.dispose();
}
}