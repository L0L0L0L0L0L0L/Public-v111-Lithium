
var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 6) {
		qm.sendNext("I know it seems hopeless. Maybe it is. But we can't give up yet!");
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
		qm.sendNext("Have you met someone who remembers the details of what happened? Who? #p2161002#... He was the captain of the king's knights. I didn't know he was still her... So, what did #p2161002# have to say? Did you learn what made Leon change so drastically?");
		break;
	case 1:
		qm.sendNextPrevS("#b(You explained everything you heard from #p2161002#.)", 2);
		break;
	case 2:
		qm.sendNextPrev("Yes...that's right. That day, thick, black clouds covered the sky, and an enemy army attacked our kingdom. The castle walls crumbled. Everything was on fire. And I was in the tower... filled with smoke... That's what happened.");
		break;
	case 3:
		qm.sendNextPrevS("#b(Judging from #p2161001#'s reaction, #p2161002#'s story seems to be true.)", 2);
		break;
	case 4:
		qm.sendNextPrev("So that's why Leon changed. I resented Leon for everything that happened. But I know better now. And I won't let him stay like this any longer.");
		break;
	case 5:
		qm.sendNextPrevS("#bSounds like you have a plan.", 2);
		break;
	case 6:
		qm.sendNextPrev("The castle has a secret passage that #p2161002# doesn't know about. I wasn't supposed to tell anyone... but that hardly matters now. Follow me to the Audience Room, and I'll... speak to him.");
		break;
	case 7:
		qm.sendYesNo("I'll meet him face to face. I couldn't go before, because of the monsters, but I can go now if you're willing to help me. Please, come with me to the Audience Room. Can I count on you?");
		break;
	case 8:
		if (qm.getMap(921140000).getCharacters().size() < 1) {
			Packages.server.quest.MapleQuest.getInstance(3178).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.getMap(921140000).resetFully();
			qm.getMap(921140000).killMonster(9300295);
			shammos = Packages.server.life.MapleLifeFactory.getMonster(9300295);
			qm.getPlayer().changeMap(qm.getMap(921140000), qm.getMap(921140000).getPortal(1));
			qm.getPlayer().getMap().spawnMonsterWithEffectBelow(shammos, new java.awt.Point(qm.getPlayer().getMap().getPortal(0).getPosition()), 12);
			shammos.switchController(qm.getPlayer(), false);
			qm.getClient().getSession().write(Packages.tools.packet.MobPacket.getNodeProperties(shammos, qm.getPlayer().getMap()));
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Escort Ifia to the Audience Room, protecting her from the monsters along the way."));
			qm.getPlayer().startMapTimeLimitTask(600, qm.getMap(211061001));
			qm.dispose();
			return;
			}
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Try again soon."));
			qm.dispose();
}
}