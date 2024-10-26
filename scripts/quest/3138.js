

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 2) {
		qm.sendNextS("Who's sending me letters? I don't think I gave anybody my address...", 12);
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
		qm.sendNextS("Who's sending me letters? I don't think I gave anybody my address...", 16);
		break;
	case 1:
		qm.sendNextPrevS("Hey. I'm #b#p2161012##k, of the Silent Crusaders. Let me get right to the point. We Silent Crusaders take down bad guys and monsters.", 12);
		break;
	case 2:
		qm.sendNextPrevS("The #rLion King's Castle#k is full of something nasty right now. Overflowing with it. I'd take the cold winds of El Nath over these dark chills any day.", 12);
		break;
	case 3:
		qm.sendYesNoS("A lot of good people are having trouble out here, and I'm asking for your help to take care of it. Keep reading, if you're interested.", 12);
		break;
	case 4:
		qm.sendNextS("If you're still reading, I salute you. Also, I'll be seeing you in about 30 seconds, because I infused this letter with magic.", 12);
		break;
	case 5:
		Packages.server.quest.MapleQuest.getInstance(3138).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(211060000), qm.getMap(211060000).getPortal(2));
		qm.dispose();
}
}