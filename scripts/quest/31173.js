/*
	名字:	最後的歐尼斯龍
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
		qm.sendNext("The Black Mage's curse has afflicted our entire family. All of us will one day wither away to dust. No further descendants will be born of our line.");
		break;
	case 1:
		qm.sendNextPrevS("How can such a terrible thing be true?!", 2);
		break;
	case 2:
		qm.sendNextPrev("The Black Mage recognized his greatest threat. He campaigned endlessly for us to join him, but we refused at every turn. One day, he chose to eliminate us all. We became the thorn in his side. His curse was swift and wicked, but not without its flaws. I was able to protect Freud completely by redirecting the curse onto myself.");
		break;
	case 3:
		qm.sendNextPrevS("Why did you do that?", 2);
		break;
	case 4:
		qm.sendNextPrev("Should a king not protect those who are most important to him? How could I walk this world with pride had I let my friends perish. I sacrificed my life for his, in return for a simple favor.");
		break;
	case 5:
		qm.sendNextPrevS("Can I ask what the favor was?", 2);
		break;
	case 6:
		qm.sendNextPrev("My kind lives a nearly infinite life, but our descendants are rare. The Black Mage's curse saw to the end of that line completely. Even the youngest of us was afflicted and doomed. But one of us could not be touched. One tiny life remained untouched inside its egg.");
		break;
	case 7:
		qm.sendNextPrev("However, that egg was lost in Leafre during the battle. I asked Freud to find it and hide it safely away from harm. Unfortunately, I did not anticipate Freud's exhaustion from the sealing spell.");
		break;
	case 8:
		qm.sendNextPrev("So, I would ask of you the same favor. Find the little egg and bring it to me so that I may teach it what I can before I pass from this plane.");
		break;
	case 9:
		qm.sendNextPrev("If you lose Last Onyx Dragon Egg in the process, forfeit the quest, and talk to me again.");
		break;
	case 10:
		Packages.server.quest.MapleQuest.getInstance(31173).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 0:
		qm.sendNext("You may already know, but there is another of our young who escaped the Black Mage's curse. He remained safe in his egg while we fought. I need you to find him.");
		break;
	case 1:
		qm.sendNextPrevS("You lost an egg?", 2);
		break;
	case 2:
		qm.sendNextPrev("It is an unfortunate truth. When we returned from the battle against the Black Mage, its egg was missing. If I am correct, it is hidden in Leafre and is in grave danger. Leafre is full of monsters still under the Black Mage's influence.");
		break;
	case 3:
		qm.sendNextPrevS("Relax, I'm Aran. I'll return with the egg in a flash.", 2);
		break;
	case 4:
		qm.sendNextPrev("If you lose Last Onyx Dragon Egg in the process, forfeit the quest, and talk to me again.");
		break;
	case 5:
		Packages.server.quest.MapleQuest.getInstance(31173).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 0:
		qm.sendNext("The hands of fate are truly out of our control. To think I would ask a favor of you...");
		break;
	case 1:
		qm.sendNextPrevS("What is it?", 2);
		break;
	case 2:
		qm.sendNextPrev("Please bring me our missing child. It lay sleeping while we battled the Black Mage, but it has been lost in Leafre.");
		break;
	case 3:
		qm.sendNextPrevS("(Could that child be...) I understand. I'll leave now.", 2);
		break;
	case 4:
		qm.sendNextPrev("If you lose Last Onyx Dragon Egg in the process, forfeit the quest, and talk to me again.");
		break;
	case 5:
		Packages.server.quest.MapleQuest.getInstance(31173).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}

function action4(mode, type, selection) {
	switch (status) {
	case 0:
		qm.sendNext("Mercedes, Ruler of the Elves, dear friend. I must ask of you a favor. Bring me our last child.");
		break;
	case 1:
		qm.sendNextPrevS("The last child? (Could it be the little Onyx Dragon that travels with Evan?)", 2);
		break;
	case 2:
		qm.sendNextPrev("Our youngest child was lost in Leafre during the battle with the Black Mage. You must return him to us. He is the last of our kind who remains free from the Black Mage's curse.");
		break;
	case 3:
		qm.sendNextPrevS("I could never turn down a friend in need. I accept.", 2);
		break;
	case 4:
		qm.sendNextPrev("If you lose Last Onyx Dragon Egg in the process, forfeit the quest, and talk to me again.");
		break;
	case 5:
		Packages.server.quest.MapleQuest.getInstance(31173).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}

function end(mode, type, selection) {
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
		var reactor = 'action' + (qm.getPlayer().getJob() < 2000 ? 5 : qm.getPlayer().getJob() < 2200 ? 6 : qm.getPlayer().getJob() < 2300 ? 7 : qm.getPlayer().getJob() < 2400 ? 8 : 5);
		eval(reactor)(mode, type, selection);
}

function action5(mode, type, selection) {
	switch (status) {
	case 0:
		qm.sendNext("Thank you. I will take the child from you now.");
		break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31173)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(31173).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(4033081, -1);
			qm.gainExp(301891);
			}
			qm.sendPrev("The egg will travel to safety with Freud when he awakens. It is a burden, but one he will oblige gladly for the price we have paid. With this, our hopes for the future have been reopened.");
			break;
	case 2:
		qm.dispose();
}
}

function action6(mode, type, selection) {
	switch (status) {
	case 0:
		qm.sendNext("You do not disappoint. I will take this child from here.");
		break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31173)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(31173).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(4033081, -1);
			qm.gainExp(301891);
			}
			qm.sendNextPrev("Your courage provides a powerful shield, my friend. Even after centuries gone by, I find myself in admiration of you. The Onyx Dragons owe you a debt we can never truly repay.");
			break;
	case 2:
		qm.sendNextPrevS("There's no need for the sappy thanks. Friends help one another.", 2);
		break;
	case 3:
		qm.sendNextPrev("As you wish. This child was to be protected by Freud, but I fear we may never meet again. Such events are simply not meant to be.");
		break;
	case 4:
		qm.sendNextPrevS("It is enough that I got to see him one more time.", 2);
		break;
	case 5:
		qm.dispose();
}
}

function action7(mode, type, selection) {
	switch (status) {
	case 0:
		qm.sendNext("Please give me the child.");
		break;
	case 1:
		if (qm.getPlayer().getSkillLevel(20010194) < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You learned the Inherited Will skill."));
			qm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(20010194), 1, 1, -1);
			qm.gainItem(4033081, -1);
			}
			qm.sendNextPrev("Give the child to Freud when he awakens. He will be able to protect it until it is able to hatch. Please take this small token as my gift to you. Open your skill window and view the Beginner skill tab.");
			break;
	case 2:
		qm.sendNextPrevS("This is a wonderful gift. I don't know that I really deserve it, but thank you.", 2);
		break;
	case 3:
		qm.sendNextPrevS("Evan, I have a strange feeling. Whenever I look at the egg, my heart beats faster.", 4, 1013000);
		break;
	case 4:
		qm.sendNextPrevS("(That egg is #p1013000#! You actually SAVED #p1013000#! Is this fate?)", 2);
		break;
	case 5:
		qm.sendNextPrevS("Evan, are you feeling well? Your face has gone dark.", 4, 1013000);
		break;
	case 6:
		qm.sendNextPrevS("Oh, no. I was just patting myself on the back for helping out.", 2);
		break;
	case 7:
		qm.sendNextPrevS("You have an odd way of showing it. I would recommend not making that horrible face in polite company.", 4, 1013000);
		break;
	case 8:
		qm.sendNextPrev("(This is a bizarre coincidence. It's at a great moment like this that you feel like all of the struggles you've faced were more than worth it.)");
		break;
	case 9:
		qm.sendNextPrev("Perhaps I have one more thing that could be of aid to you. Freud used this chair throughout his travels. I have held it for many years. I believe he would appreciate me passing it on to you.");
		break;
	case 10:
		Packages.server.quest.MapleQuest.getInstance(31173).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.gainItem(3010216, 1);
		qm.gainExp(301891);
		qm.dispose();
}
}

function action8(mode, type, selection) {
	switch (status) {
	case 0:
		qm.sendNextS("I brought the egg.", 2);
		break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31173)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(31173).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(4033081, -1);
			qm.gainExp(301891);
			}
			qm.sendNextPrev("I knew you would, oh Ruler of the Elves. You must know how important this child is.");
			break;
	case 2:
		qm.sendNextPrevS("#p2144006#, will Freud take over from here?", 2);
		break;
	case 3:
		qm.sendNextPrev("Even traveling through time does not diminish your brilliance. I hope that Freud will awaken soon before it is too late.");
		break;
	case 4:
		qm.sendNextPrevS("Do not worry. The Will of the Onyx Dragons will continue in the future.", 2);
		break;
	case 5:
		qm.dispose();
}
}