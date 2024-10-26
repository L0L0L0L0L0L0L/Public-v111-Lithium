/*
	名字:	菲利屋司
	地圖:	結冰的精靈森林
	描述:	910150001
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
		if (type == 5) {
		qm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
		reactor = 'action' + (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(24007)).getStatus() > 0 ? 1 : 0);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNextS("Elders! You're okay! But...but the village...!", 2);
		break;
	case 1:
		cm.sendNextPrev("A fierce, frozen curse has fallen upon the town. Your Highness, I see it has fallen upon you as well.");
		break;
	case 2:
		cm.sendNextPrevS("I sense it from you most of all! Is this the power of the Black Mage?!", 4, 1033203);
		break;
	case 3:
 		cm.sendNextPrevS("The children are already trapped in ice, and soon, the adults will follow them. It takes longer to freeze the stronger Elves, which is why we are still all right, but our time is limited...", 4, 1033204);
		break;
	case 4:
 		cm.sendNextPrevS("This is my fault. We sealed the Black Mage, but he managed to #rcurse#k us anyway...", 2);
		break;
	case 5:
		cm.sendNextPrevS("So it is his doing?!", 4, 1033203);
		break;
	case 6:
		cm.sendNextPrevS("I knew this was his doing...", 4, 1033204);
		break;
	case 7:
		cm.sendNextPrev("The Black Mage has cursed our sovereign, and the curse has spread to all Elves...");
		break;
	case 8:
		cm.sendNextPrevS("I should have been more careful. Please, I didn't mean for this to happen...", 2);
		break;
	case 9:
		cm.sendNextPrev("What a fearful being, this Black Mage. Even form beyond the seal, he wields such power... It is a miracle we were able to seal him at all.");
		break;
	case 10:
		cm.sendNextPrevS("There was no way you could stop this, Your Majesty. Nobody could have.", 4, 1033204);
		break;
	case 11:
		cm.sendNextPrevS("That's right! It's not your fault, My Liege! You sealed him! YOU'RE the hero!", 4, 1033203);
		break;
	case 12:
		cm.sendNextPrevS("I shouldn't have fought the Black Mage in the first place! If I'd let him be, this wouldn't have happened to the Elves. I've failed my people!", 2);
		break;
	case 13:
		cm.sendNextPrevS("Don't say such things, Your Highness! Even if you'd let him be, the Black Mage would have come for us sooner or later.", 4, 1033204);
		break;
	case 14:
		cm.sendNextPrev("It's our fault. We are your council. We should have better prepared you to face the Black Mage.");
		break;
	case 15:
		cm.sendNextPrevS("I'm supposed to be the Elder of War, but even I was too weak to join the fight. I'm the one who failed you, Your Highness...", 4, 1033203);
		break;
	case 16:
		cm.sendNextPrevS("No, this isn't your fault! I'm the one who decided to face the Black Mage. I don't regret fighting...I regret failing to protect my people.", 2);
		break;
	case 17:
		cm.sendNextPrev("In that case, we all regret failing to do this, Your Majesty.");
		break;
	case 18:
		cm.sendNextPrevS("This is not your burden alone. The decision to fight the Black Mage was the decision of the Elves, and so we will all share in the results, whatever they may be.", 4, 1033204);
		break;
	case 19:
		cm.sendNextPrevS("No one blames you, Your Highness!", 4, 1033203);
		break;
	case 20:
		cm.sendNextPrevS("Everyone...", 2);
		break;
	case 21:
		cm.sendNextPrev("Regardless of this wicked curse, we will survive. We will overcome this together.");
		break;
	case 22:
		cm.sendNextPrev("Long as Your Highness is safe, the hope for the Elves lives on.");
		break;
	case 23:
		cm.sendNextPrevS("Is there a way?", 2);
		break;
	case 24:
		cm.sendNextPrev("We can't stop the curse now. But we are the Elves. We may outlive it.");
		break;
	case 25:
		cm.sendNextPrev("Your Highness, we should seal Elluel before the curse can spread beyond the village. We cannot avoid it, but we can keep it from spreading beyond the Elves. #bWe Elves will all slumber here, undisturbed by the outside world#k.");
		break;
	case 26:
		cm.sendNextPrevS("We don't know how long the curse will last, but time is on our side. Your Highness, we've nothing to worry about.", 4, 1033204);
		break;
	case 27:
		cm.sendNextPrevS("Eventually we will awaken together, and the Black Mage will be a distant memory!", 4, 1033203);
		break;
	case 28:
		cm.sendNextPrev("Not even the curse of the Black Mage can last forever. In the end, we will be the victors.");
		break;
	case 29:
		cm.sendNextPrevS("Yes! We will win!", 2);
		break;
	case 30:
		cm.sendNextPrev("Of course we will. Ah... I'm growing weak. Your Highness, it is time to seal the village. It is the only way we can rest in peace.");
		break;
	case 31:
		cm.sendNextPrev("There are some things we should take care of first. I believe #bAstilda#k wants to speak with you.");
		break;
	case 32:
		Packages.server.quest.MapleQuest.getInstance(24007).forceStart(cm.getPlayer(), 0, 1);
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendSimple("You have a question. Your Majesty? \r\n#b#L0#What is this place?#l\r\n#L1#Who am I#l\r\n#L2#Who are you?#l\r\n#L3#What happened?#l\r\n#L4#What do I have to do again?#l");
		break;
	case 1:
		if (selection == 0)
			cm.sendNext("Oh dear, has the curse taken hold on you already? This is Elluel, village of the Elves. Until recently, we were safe from the Black Mage...");
		if (selection == 1)
			cm.sendNext("You are Mercedes, ruler of the Elves, of course! I didn't realize memory loss was part of the curse...");
		if (selection == 2)
			cm.sendNext("The Elves elect three Elders to advise the sovereign. Astilda, the eldest, is the Eider of Life. Danika, the youngest, is the talented Elder of War. And I, humble though my skills may be, am the Elder of Magic.");
		if (selection == 3)
			cm.sendNext("You don't remember? A handful of heroes emerged from Victoria Island to stop the Black Mage's reign of terror. They came to Elluel, and you went them to seal the Black Mage away. And then this happened...");
		if (selection == 4) {
			cm.sendNext("We cannot lift the curse, but we can seal the village away and sleep it off. You must see to the seal...");
			}
			break;
	case 2:
		cm.dispose();
}
}