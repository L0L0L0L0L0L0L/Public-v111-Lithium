/*
	名字:	被破壞的弓箭手村
	地圖:	被破壞的弓箭手村
	描述:	271010000
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
		qm.sendNextS("But where did you come from? Since Cygnus's attack, we've heard nothing from the rest of the world.", 1);
		break;
	case 1:
		qm.sendNextPrevS("(You can't exactly reveal that you're from the past...) Um, I was knocked out...yeah! I just woke up here. I, uh, can't remember what happened. Anyway, what's going on here?", 3);
		break;
	case 2:
		qm.sendNextPrevS("Perhaps the horrors of war have taken your memory. Cygnus has been corrupted by the Black Mage, and her Knights have become our enemies. They attacked us, and...and father... I'm sorry, this is still too painful for me. Please ask Athena Pierce to tell you the rest.", 1);
		break;
	case 3:
		qm.sendNextPrevS("Okay, I understand.", 3);
		break;
	case 4:
		Packages.server.quest.MapleQuest.getInstance(31105).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}