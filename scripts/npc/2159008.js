/*
	名字:	須勒
	地圖:	人煙稀少的石山
	描述:	931000020
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
	if (cm.getPlayer().getMap().getId() != 931000020) {
		cm.dispose();
		return;
		}
	switch (status) {
	case 0:
		cm.sendNext("Little rats. I say, how DARE you try to escape this place?");
		break;
	case 1:
		cm.sendNextPrevS("Shoot, we've been spotted!", 2);
		break;
	case 2:
		cm.sendNextPrev("Now, now, children. Don't make this harder than it needs to be. Just walk towards me, nice and easy... Wait, you're not one of the test subjects. You're one of the townspeople, aren't you?");
		break;
	case 3:
		cm.sendNextPrevS("That's right. I'm a resident of Edelstein, not a test subject. You can't boss ME around.", 2);
		break;
	case 4:
		cm.sendNextPrev("Oh my, oh my. I told them to make sure the townspeople kept their kids away from the mines... Alas, it's too late now. I can't allow you to tell anyone about this laboratory, so I guess you'll just have to stay here and...help with the experiments. *snicker*");
		break;
	case 5:
		cm.sendNextPrevS("Hmph. Big words, but let's see if you can catch me first.", 2);
		break;
	case 6:
		cm.sendNextPrev("Why, you insolent, little-- Ahem, ahem, ahem. Your words don't matter. Time for me to pull out the big guns. I do hope you're ready. If not, you will suffer.");
		break;
	case 7:
		cm.getPlayer().addHP(cm.getPlayerStat("HP") > 100 ? -(cm.getPlayerStat("HP") / 2) : 0);
		cm.sendNextPrevS("#b(He's tougher than I thought.)\r\n#r(Schiller's attack HALVED your HP!)", 2);
		break;
	case 8:
		cm.sendNextPrev("I say, got any more big words, kiddo? I'll make sure Gelimer performs some especially atrocious experiments on you. But I'll be nice if you come with me quiet-like.");
		break;
	case 9:
		cm.sendNextPrevS("Hold it right there!", 4, 2159010);
		break;
	case 10:
		cm.dispose();
		cm.getPlayer().changeMap(cm.getMap(931000021), cm.getMap(931000021).getPortal(0));
}
}