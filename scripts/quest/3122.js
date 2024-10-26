/*
	名字:	封印的確認
	地圖:	長老公館
	描述:	211000001
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 2) {
		qm.dispose();
		return;
		}
		if (status < 4) {
		qm.sendNext("What? Are you just wasting my time?");
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
		qm.sendSimple("What? Are you crazy? You're going to trust Shammos and go there yourself? \r\n#L0##bWell, it's not that I trust him, I just feel bad for him. If left alone, his delusions will end up killing him.#l");
		break;
	case 1:
		qm.sendYesNo("You feel bad for Shammos? You don't even know anything about him! \r\nYou know what, just forget it. I shouldn't be wasting this much time on Shammos's delusions... If you really want to go, then go Just make sure you don't put your hands on the seal. Got it?");
		break;
	case 2:
		qm.sendNext("You can enter the Ice Gorge by going through the cave at the Ice Ravine Entrance. It's extremely cold, so you won't find any living beings there. Be prepared, it's much colder than even EI Nath is.");
		break;
	case 3:
		qm.sendYesNo("I can sand you to the Ice Ravine Entrance. Do you want to go now?");
		break;
	case 4:
		Packages.server.quest.MapleQuest.getInstance(3122).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(921120000), qm.getMap(921120000).getPortal(1));
		qm.dispose();
}
}

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
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
		qm.sendYesNo("Oh. Were you able to confirm that the seal is still?");
		break;
	case 1:
		qm.sendNextS("Shammos, calm down. I saw it with my own eyes. He was perfectly sealed.", 2);
		break;
	case 2:
		qm.sendNextPrev("Are you absolutely sure? Okay then, that's good.... Thank you so much. Thanks to you, I think everything will be all right. Everything...");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(3122).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.gainExp(22000);
		qm.dispose();
}
}