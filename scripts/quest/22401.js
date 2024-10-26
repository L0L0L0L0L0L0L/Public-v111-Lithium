/*
	名字:	龍可以騎嗎？
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
		if (status > 8) {
		qm.sendNext("You'd better make sure you prepare these two things. I don't want you to get hurt, master.");
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
		qm.sendNext("Master, what is it? Huh? Mounting? Isn't that like riding around on pigs or birds or wolves? What about it?");
		break;
	case 1:
		qm.sendNextPrevS("#bWell, I was wondering if you think it's possible for me to ride an Onyx Dragon?", 2);
		break;
	case 2:
		qm.sendNextPrev("Ride an Onyx Dragon... HOLD ON JUST A MINUTE. What are you saying? You want to...ride me? But I'm your partner, not some little pet! How could you, master...");
		break;
	case 3:
		qm.sendNextPrevS("#bDon't be silly! That's why I want to know if I can ride you. BECAUSE you're my partner...");
		break;
	case 4:
		qm.sendNextPrev("Oooh, I get... Wait, huh?! Well, I suppose it would make things more convenient, but if I ever get tired, I get to ride on you, okay?");
		break;
	case 5:
		qm.sendNextPrevS("What?! Are you tying to kill your one and only master?", 2);
		break;
	case 6:
		qm.sendNextPrev("Fine, fine. Nevermind. I was just joking anyways. If I tried to ride on your back, you'd turn into a flat old pancake. But if you want to ride me, no problem. You're not that big.");
		break;
	case 7:
		qm.sendNextPrevS("So it's okay for me to ride on your back then?", 2);
		break;
	case 8:
		qm.sendNextPrev("Yea, why not? I can fly a whole lot faster than you anyway. But we can't just take off here and now. Two things must be prepared first.");
		break;
	case 9:
		qm.sendAcceptDecline("You need a #bsaddle#k and the #bMonster Riding skill#k! I don't think you'd survive long on my back without something to sit on. Think you can prepare both those things?");
		break;
	case 10:
		Packages.server.quest.MapleQuest.getInstance(22401).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendOkS("#bYou should go talk to the person riding a Dragon that #p1032001##k mentioned. Talk to #b#p1032001##k first, though.", 2);
		break;
	case 11:
		qm.dispose();
}
}