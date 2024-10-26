/*
	名字:	封印庭園
	地圖:	老婆之屋
	描述:	200050001
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 5) {
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
		qm.sendNextS("What is it? I usually don't welcome uninvited guests, but you have a mysterious aura that makes me curious about what you have to say.", 8);
		break;
	case 1:
		qm.sendNextPrevS("#b(You tell her about #o9300347#.)", 2);
		break;
	case 2:
		qm.sendNextPrevS("#o9300347#? It's definitely a big problem, but I don't think it's enough to really affect #m200000000# Wait, where did you say the #o9300347# was, again?", 8);
		break;
	case 3:
		qm.sendNextPrevS("#m200060001#？", 2);
		break;
	case 4:
		qm.sendNextPrevS("...#m200060001#? If #o9300347# is there, then that must mean someone is trying to enter #m920030001#! But why? And more importantly, who?", 8);
		break;
	case 5:
		qm.sendNextPrevS("#m920030001#?", 2);
		break;
	case 6:
		qm.sendAcceptDecline("I can't tell you about #m920030001#. If you want to find out, I must first see whether you are worthy of the information. Do you mind if I look into your fate?");
		break;
	case 7:
		Packages.server.quest.MapleQuest.getInstance(21738).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendOk("Well, now let's look into your fate. Give me a second.");
		break;
	case 8:
		qm.dispose();
}
}