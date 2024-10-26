/*
	名字:	失蹤的煉金術士─特力
	地圖:	特力的研究室
	描述:	926120200
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 3) {
		qm.sendOk("You are quite rude...");
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
		qm.sendNext("I don't know what you're doing here, but you should know... an alchemy lab is not all explosions and excitement. And if you think it's bad for humans, imagine how it is for fairies...");
		break;
	case 1:
		qm.sendNextPrev("Oh, her? That's my wife. You know, I haven't seen her in... quite some time. Yes, quite a long time indeed. Or my daughter. Hm, I wonder what she looks like now? Goodness, they would be so very cross with me...");
		break;
	case 2:
		qm.sendNextPrev("Ah, it is what it is. I have devoted myself to this research, so to this research I remain true. Once I am done, I can spend the rest of my days with #b#p2111004##k.");
		break;
	case 3:
		qm.sendNextPrev("You know, I didn't get the chance to send this #bpendant#k to her. It was to be my little gift, hidden #bbehind the frame#k as a little surprise... When will I see her again, I wonder?");
		break;
	case 4:
		qm.sendAcceptDecline("Forgive my ramblings. I have been here for... a very long time. A very long time indeed. Perhaps it would be best for you to go now. Staying here too long... well, I suspect it isn't healthy.");
		break;
	case 5:
		Packages.server.quest.MapleQuest.getInstance(3321).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().changeMap(qm.getMap(261020401), qm.getMap(261020401).getPortal(0));
		qm.dispose();
}
}