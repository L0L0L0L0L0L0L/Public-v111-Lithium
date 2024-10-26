

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 5) {
		qm.sendNext("It's rather a simple request...");
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
		qm.sendNext("Thank you for doing me this favor. Until next time.");
		break;
	case 1:
		qm.sendNextPrevS("Are you really not feeling so well?", 2);
		break;
	case 2:
		qm.sendNextPrev("Oh no, it's just that... Hmm...");
		break;
	case 3:
		qm.sendNextPrevS("Then, what is it? I don't think you're really that sick...", 2);
		break;
	case 4:
		qm.sendNextPrev("Well...I should be honest. As a hunter, this is pretty embarrassing to say, but...");
		break;
	case 5:
		qm.sendNextPrev("It happened a few days ago. I was hunting the Hectors out in the fields as usual. But suddenly, a great wind blew and, before I knew it, the #b#o6090001##k was standing before me!");
		break;
	case 6:
		qm.sendNextPrevS("The Snow Witch? What's that?", 2);
		break;
	case 7:
		qm.sendNextPrev("The Snow Witch is a legendary monster made of ice. I thought it was just a legend... Anyway, when I first encountered her, I barely managed to drive her off. But when I went hunting the next time, I ran into her again... She was completely unharmed. I was terrified...she can't be beaten! So, I stopped hunting completely, telling everyone that I got sick...");
		break;
	case 8:
		qm.sendAcceptDecline("But I can't just keep asking others for favors... So, I was thinking maybe Alcaster can help me... Would you go visit #bAlcaster#k for me? If I go myself, then people will find out about everything...");
		break;
	case 9:
		qm.sendNext("Alcaster is somewhere here in #bEI Nath#k. Please, don't tell anybody about this. People will make fun of me if they find out...");
		break;
	case 10:
		Packages.server.quest.MapleQuest.getInstance(3185).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}