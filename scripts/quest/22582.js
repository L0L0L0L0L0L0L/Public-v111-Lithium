/*
	名字:	秘密團體的第三個任務
	地圖:	青蛙嘴的家
	描述:	922030000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 3) {
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
		qm.sendYesNo("Your third mission is to collect Secret Master Soul Teddy Ghosts.when you hunt the #r#o9001028#s#k that live deep inside the Clocktower of #m220000000#, you will find #b#t4000594#s#k. Collect 100 of them and bring them to me.");
		break;
	case 1:
		qm.sendNext("I won't leave, so come find me here. \r\nBy the way, you have a very unique lizard there. It looks like a dragon, but it can't be a dragon... Hmm, strange.");
		break;
	case 2:
		qm.sendYesNo("Anyway, I can send you to a place where you can find #r#o9001028#s#k. Would you like to go there now?");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(22582).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(922030002), qm.getMap(922030002).getPortal(1));
		qm.dispose();
}
}

function end(mode, type, selection) {
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
		qm.sendNext("Well it seems that you have completed the mission. Let us check the #t4000594#s you've brought back with you. \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 63300 exp");
		break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22582)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(22582).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(4000594, -100);
			qm.gainExp(14800);
			}
			qm.sendNextPrev("Heh heh heh... This should be plenty for us to carry out our plans...");
			break;
	case 2:
		qm.sendNextPrevS("#bLook... I have a question I want to ask...", 2);
		break;
	case 3:
		qm.sendNextPrev("I'm sorry, but my hands are tied taking care of all the Free Spirits you brought back. Can you come back later, when I'm finished making the item? It's going to take a little while.");
		break;
	case 4:
		qm.sendPrevS("#b(What good is defeating some monster deep inside the Clocktower, where no one even goes? You want to find out, but he does look pretty busy. You'll have to come back and speak to him later.)", 2);
		break;
	case 5:
		qm.dispose();
}
}