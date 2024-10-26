/*
	名字:	亞普力耶
	地圖:	戰鬥結束後
	描述:	910150000
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		cm.dispose();
		return;
	case 0:
		if (type == 2) {
		cm.sendNextS("I have more questions!", 2);
		cm.dispose();
		return;
		}
		if (type == 5) {
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
		reactor = 'action' + (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(24006)).getStatus() > 0 ? 1 : 0);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNextS("Afrien? Freud? Are you okay?!", 2);
		break;
	case 1:
		cm.sendNextPrev("Mercedes... You survived.");
		break;
	case 2:
		cm.sendNextPrevS("Of course! I managed to seal him away. I can't let myself die after that! But what about you? And the others? Where are they?", 2);
		break;
	case 3:
		cm.sendNextPrev("We may have #bdefeated the Black Mage#k, but he sent everyone flying in different directions with that last spell. We're lucky we ended up in the same place.");
		break;
	case 4:
		cm.sendNextPrevS("You're right... I didn't realize how far away we ended up. At least we're safe.", 2);
		break;
	case 5:
		cm.sendNextPrevS("Now that the fight is over, I feel so weak... Not just that, but I feel so cold...", 2);
		break;
	case 6:
		cm.sendNextPrevS("Come to think of it, has it always been snowy here? There's all this heat, and yet snow is falling... Strange...", 2);
		break;
	case 7:
		cm.sendNextPrev("You can't feel it, Mercedes? The #rgreat curse#k... It's been placed upon you, Freud, and the others.");
		break;
	case 8:
		cm.sendNextPrevS("C-curse?", 2);
		break;
	case 9:
		cm.sendNextPrev("There's an icy cold curse clinging to you. You might have been able to shrug it off if you weren't weak from fighting the Black Mage. It looks like he's not letting us off so easily...");
		break;
	case 10:
		cm.sendNextPrevS("You should be able to survive it, at least. But I'm worried about Freud... He's too weak.", 2);
		break;
	case 11:
		cm.sendNextPrev("I'll take care of him. For now, I'm more worried about you, Mercedes. You're the #bruler of the Elves#k. If the curse is on you, #rwon't it be placed upon all of the Elves#k?");
		break;
	case 12:
		cm.sendNextPrevS("...!", 2);
		break;
	case 13:
		cm.sendNextPrev("Hurry back to #bElluel#k. If the #bBlack Mage's curse is on all of the Elves#k, then you must return to your people.");
		break;
	case 14:
		cm.sendNextPrevS("All right! Afrien... We will meet again!", 2);
		break;
	case 15:
		cm.sendNextPrev("...I pray you're right.");
		break;
	case 16:
		Packages.server.quest.MapleQuest.getInstance(24006).forceStart(cm.getPlayer(), 0, 1);
		cm.sendYesNoS("#b(The other heroes will make it through somehow. For now, return to town using your return skill.)", 2);
		break;
	case 17:
		cm.dispose();
		cm.getPlayer().changeMap(cm.getMap(910150001), cm.getMap(910150001).getPortal(0));
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("If you have questions, you need but ask. \r\n\r\n#b#L0#What's our current situation?#l\r\n#L1#What about the others?#l\r\n#L2#Are you all right?#l\r\n#L3#Why must I go?#l\r\n#L4#I need to get back to Elluel!#l");
		break;
	case 1:
		if (type == 5) select = selection;
		if (select == 0) {
			cm.sendNext("We managed to seal the Black Mage away, but his last spell scattered us all across the world. At least you and Freud were sent to the same place. I'm more worried about the curse the Black Mage put on you.");
			cm.dispose();
			return;
			}
		if (select == 1) {
			cm.sendNext("We were all sent to different places. Don't worry, our friends are the strongest heroes in all of Maple World. They can take care of themselves...I hope.");
			cm.dispose();
			return;
			}
		if (select == 2) {
			cm.sendNext("There's no need to worry about me. I'm an Onyx Dragon, after all... I'm not weak. I am worried about Freud, though... But don't worry, I'll take care of him.");
			cm.dispose();
			return;
			}
		if (select == 3) {
			cm.sendNext("It's the Black Mage's curse. It'll freeze us all, maybe forever. You have to get back to Elluel and look after the Elves. If the curse is on you, their sovereign, then it'll spread to them, as well.");
			cm.dispose();
			return;
			}
		if (select == 4) {
			cm.sendNext("Now, go. Go and save the Elves.");
			}
			break;
	case 2:
		cm.sendNextPrevS("Yes. We will meet again, Afrien.", 2);
		break;
	case 3:
		cm.dispose();
		cm.getPlayer().changeMap(cm.getMap(910150001), cm.getMap(910150001).getPortal(0));
}
}