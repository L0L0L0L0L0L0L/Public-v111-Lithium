/*
	名字:	保護修亞勒
	地圖:	人煙稀少的公園
	描述:	931000440
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 3) {
		qm.sendNext("Heh, fine by me. I can hold my own. I guess you really don't care what the Black Wings do to me.");
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
		qm.sendNext("ls someone really after me? To think someone would want to hurt an old man like me... Those Black Wings are truly cowards. Still, I'm not worried. I've been through too much in life. They can't scare me!");
		break;
	case 1:
		qm.sendNextPrevS("#b(#p2159201# doesn't seem scared at all. How brave.)", 2);
		break;
	case 2:
		qm.sendNextPrev("I think the Black Wings are too chicken to come out with you around. Let's find a way to lure them out.");
		break;
	case 3:
		qm.sendNextPrevS("#bBut if I leave your side, you'll be in danger. You're the one they're after...", 2);
		break;
	case 4:
		qm.sendAcceptDecline("Heh, they think they can frighten this old man. Nah, I trust you. You're a strong member of the Resistance. You'll keep me safe. Now, let's go someplace more secluded, where the Black Wings will feel safe enough to show their faces.");
		break;
	case 5:
		var em = qm.getEventManager("ProtectingSurl");
		var prop = em.getProperty("state");
		if (prop == null || prop == 0) {
			em.startInstance(qm.getPlayer());
			qm.dispose();
			return;
			}
			qm.sendNext("Huh? Someone must have gone into the Park Corner. Try again a little later.");
			qm.dispose();
}
}