/*
	名字:	歐尼斯龍之王亞普力耶
	地圖:	燃燒的廢墟
	描述:	272000310
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
		var reactor = 'action' + (qm.getPlayer().getJob() < 2000 ? 1 : qm.getPlayer().getJob() < 2200 ? 2 : qm.getPlayer().getJob() < 2300 ? 3 : qm.getPlayer().getJob() < 2400 ? 4 : 1);
		eval(reactor)(mode, type, selection);
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		qm.sendNext("...Who are you?");
		break;
	case 1:
		qm.sendNextPrevS("Woah! You're huge! I'm #h0#. #p2144005# asked me to bring you his regards.", 2);
		break;
	case 2:
		qm.sendNextPrev("#p2144005#? Is he well? Is Aran with him?");
		break;
	case 3:
		qm.sendNextPrevS("He took Aran to Rien Island. He said that the ice there would help combat the Black Mage's curse.", 2);
		break;
	case 4:
		qm.sendNextPrev("I see. Thank you for your attention to my comrades. I know you have returned here from the future.");
		break;
	case 5:
		qm.sendNextPrevS("What?! How did you know?", 2);
		break;
	case 6:
		qm.sendNextPrev("I am the King of the Onyx Dragons. The depth of my knowledge is far outside the realm of your mind. I know that you are a great hero and that you will be a powerful ally. Myself and my friends, Freud, Aran, Maha, Mercedes, and the others, were the first to battle the Black Mage and prove his existence to the world.");
		break;
	case 7:
		qm.sendNextPrev("His energies were immense. Indeed, they were overwhelming. However, they were also disjointed. He had been weakened in a battle with his former right-hand commander, the Demon Slayer, whose family had been ruthlessly slain by the Black Mage. We took advantage of his weakened state and began our attack.");
		break;
	case 8:
		qm.sendNextPrev("Even then, the Black Mage's power was immense. If the great heroes had not united as they had, the Black Mage would have crushed us with little effort. We fought a lengthy and grueling battle and imprisoned him within the seal, but none of us escaped injury.");
		break;
	case 9:
		qm.sendNextPrevS("#p2144005# told me that the Black Mage cursed you all before you locked him away.", 2);
		break;
	case 10:
		qm.sendNextPrev("Indeed, his fury was such at the time of his imprisonment that he cursed us all. It was all I could do to protect Freud. I took the entirety of the blow myself, saving Freud's life, but crippling my own in the process. I can feel it working even as we speak. It freezes me from the core.");
		break;
	case 11:
		qm.sendNextPrevS("Is there no way to lift the curse?", 2);
		break;
	case 12:
		qm.sendNextPrev("Breaking the seal is the only way to break the curse, but it is an impossible task. The seal that Freud and I constructed will bind him forever. Now, please, leave me. I grow tired and must catch my breath.");
		break;
	case 13:
		Packages.server.quest.MapleQuest.getInstance(31172).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.gainExp(301891);
		qm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 0:
		qm.sendNext("Aran...you look well.");
		break;
	case 1:
		qm.sendNextPrevS("#p2144006#. Long time no see.", 2);
		break;
	case 2:
		qm.sendNextPrev("You as well. It's been too long. Several centuries in your case, yes? Tell me, how did you make it here? I believed it impossible.");
		break;
	case 3:
		qm.sendNextPrevS("You seem a lot less surprised than I thought you'd be. I got here through the Crack in Time that #p2144010# created. I've come back to stop his treacherous plans. I never thought I'd see YOU here though!", 2);
		break;
	case 4:
		qm.sendNextPrev("I see. The future holds many surprises. I apologize for my uncouth behavior, but could you come back later. I have much to think about.");
		break;
	case 5:
		Packages.server.quest.MapleQuest.getInstance(31172).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.gainExp(301891);
		qm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 0:
		qm.sendNext("Welcome, my future friend.");
		break;
	case 1:
		qm.sendNextPrevS("Wha-?! How do you know who I am?!", 2);
		break;
	case 2:
		qm.sendNextPrev("I am the King of the Onyx Dragons! Such knowledge is mine to hold. Who is this young human beside you?");
		break;
	case 3:
		qm.sendNextPrevS("My name is #p1013000#. #p2144006#.", 4, 1013000);
		break;
	case 4:
		qm.sendNextPrev("#p1013000#(Our last descendant has grown so much...)");
		break;
	case 5:
		qm.sendNextPrev("I am afraid I have much on my mind right now. Could you kindly return to me later?");
		break;
	case 6:
		Packages.server.quest.MapleQuest.getInstance(31172).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.gainExp(301891);
		qm.dispose();
}
}

function action4(mode, type, selection) {
	switch (status) {
	case 0:
		qm.sendNext("Mercedes?! Have my eyes become so dull that I see two of you? How did you come to be in this time? I believed it to be impossible!");
		break;
	case 1:
		qm.sendNextPrevS("You are a sight to behold, as always, #p2144006#. I returned to this time through the Crack in Time that #p2144010# created. I had to follow him to stop his nefarious plot. I certainly did not expect to find you here.", 2);
		break;
	case 2:
		qm.sendNextPrev("The future holds many surprised. It is strange to meet you in this time. It leaves me much to think about. Would you return to me later?");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(31172).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.gainExp(301891);
		qm.dispose();
}
}