/*
	名字:	飢餓的小龍
	地圖:	寶貝龍
	描述:	寶貝龍
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 2) {
		qm.sendNext("*gasp* How can you refuse to feed your Dragon? This is child abuse! ");
		qm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		qm.sendNext("Yo, master. Now that I've shown you what I can do, it's your turn. Prove to me...that you can find food! I'm starving. You can use my power now, so you have to take care of me.");
		break;
	case 1:
		qm.sendNextPrevS("Eh, I still don't get what's going on, but I can't let a poor little critter like you starve, right? Food, you say? What do you want to eat?", 2);
		break;
	case 2:
		qm.sendNextPrev("Hi, I was just born a few minutes ago. How would I know what I eat? All I know is that I'm a Dragon... I'm YOUR Dragon. And you're my master. You have to treat me well!");
		break;
	case 3:
		qm.sendAcceptDecline("I guess we're supposed to learn together. But I'm hungry. Master, I want food. Remember, I'm a baby! I'll start crying soon!");
		break;
	case 4:
		Packages.server.quest.MapleQuest.getInstance(22501).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendOkS("#b(#p1013000# the baby Dragon appears to be extremely hungry. You must feed him. Maybe your Dad can give you advice on what dragons eat.)", 2);
		break;
	case 5:
		qm.dispose();
}
}