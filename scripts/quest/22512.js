/*
	名字:	龍魔導士的工作
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
		if (status > 3) {
		qm.sendNext("WHAT? You're refusing to help? Whoa. Look, you might want to think this through. I know you're a good person and you want to help others...right?");
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
		qm.sendNext("Master! I'm touched! You are such a good person. Let's help all the people who need our help, okay? That's our calling!");
		break;
	case 1:
		qm.sendNextPrevS("#bWhat the...? What calling?", 2);
		break;
	case 2:
		qm.sendNextPrev("Well, master, you and I are so powerful together, you know? I have a feeling we were given these powers to help mankind! It's your calling as a Dragon Master, I think.");
		break;
	case 3:
		qm.sendNextPrevS("#bMy calling as...a Dragon Master?", 2);
		break;
	case 4:
		qm.sendAcceptDecline("Yup! That's what I'm talking about! I just KNOW there are people out there in desperate need of the Dragon Master's help!");
		break;
	case 5:
		qm.sendNextS("#b(You agree to help others using your powers as a Dragon Master. Sounds grandiose, even to you. But you'd better get started! Check around #m100000000# to see if anyone needs help.)", 2);
		break;
	case 6:
		Packages.server.quest.MapleQuest.getInstance(22512).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}