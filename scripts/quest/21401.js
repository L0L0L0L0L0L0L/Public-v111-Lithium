/*
	名字:	勸解發飆的矛
	地圖:	瑞恩村
	描述:	140000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 2) {
		qm.sendNext("Do you need time to prepare? Hurry, I can't control mys elf much longer!");
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
		qm.sendNext("Why do I look like this, you ask? I don't want to talk about it, but I suppose I can't hide from you since you're my master...");
		break;
	case 1:
		qm.sendNextPrev("While you were trapped inside ice for hundreds of years, I, too, was frozen. It was a long time to be away from you. That's when the seed of darkness was planted in my heart.");
		break;
	case 2:
		qm.sendNextPrev("But since you awoke, I thought the darkness had gone away. I thought things would return to the way they were, but I was mistaken.");
		break;
	case 3:
		qm.sendAcceptDecline("Please, Aran. Please stop me from becoming enraged. Only you can control me. It's out of my hands now. Please do whatever it takes to #rstop me from going berserk#k!");
		break;
	case 4:
		if (qm.getMap(914020000).getCharacters().size() < 1) {
			Packages.server.quest.MapleQuest.getInstance(21401).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.getMap(914020000).resetFully();
			qm.getPlayer().changeMap(qm.getMap(914020000), qm.getMap(914020000).getPortal(1));
			qm.getPlayer().startMapTimeLimitTask(1200, qm.getMap(140000000));
			qm.dispose();
			return;
			}
			qm.sendNext("Ack, things are getting out of control. If this keeps up, you'll get hurt. I'll try to suppress it as long as I can. Just give me a bit of time and talk to me a little later.");
			qm.dispose();
}
}

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 2) {
		qm.sendNext("What, are you seriously saying you don't want your abilities restored? Are you scared? You're strong enough to handle your past abilities. You'll be fine.");
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
		qm.sendNext("Thank you, Aran. If it weren't for you, I would have become enraged and who knows what could have happened. Thank you. NOT! It's only your duty as my master...");
		break;
	case 1:
		qm.sendYesNo("Anyway, I just noticed how high of a level you've reached. If you were able to control me in my state of rage, I think you're ready to handle more abilities.");
		break;
	case 2:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21401)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendNext("Hey, I was going to give you a gift to congratulate you on your Job Advancement, but I can't. Check to make sure you have space in your Use and Equip tabs.");
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(21401).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(qm.getPlayer().getJob() + 1);
			qm.gainItem(1142132, 1);
			}
			qm.sendNext("Your skills have been restored. Those skills have been dormant for so long that you'll have to re-train yourself, but you'll be as good as new once you complete your training.");
			break;
	case 3:
		qm.sendNextPrev("Oh, and I've given you a Skill Book I compiled that consists of a skill called Maple Hero. It isn't one of the skills you had in the past, but it could come in handy sometime.");
		break;
	case 4:
		qm.sendNextPrev("Even with all that, however, you still have a long way to go until you return to the old you. I heard the skills you have forgotten are floating around in the form of Skill Books. You'll be able to return to the old you if you find and train all those skills.");
		break;
	case 5:
		qm.dispose();
}
}