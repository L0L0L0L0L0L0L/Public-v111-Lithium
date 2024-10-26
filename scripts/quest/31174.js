/*
	名字:	精靈之王
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
		qm.sendNext("You've rescued Aran and our tribe, but your help is still needed. I assume you saw Mercedes on your way here.");
		break;
	case 1:
		qm.sendNextPrevS("I did. Mercedes looked worse than Aran. What can I do to help?", 2);
		break;
	case 2:
		qm.sendNextPrev("Do not fear. Mercedes will return one day. The future of the Elves depends upon their ruler, and I have never known Mercedes to shirk responsibility, even at the edge of death. If you would be willing to lend your powers, the Elven people would be in great debt to you.");
		break;
	case 3:
		qm.sendNextPrevS("I'd be happy to help!", 2);
		break;
	case 4:
		qm.sendNextPrevS("You will feel your energy draining, but do not be alarmed. I will only take from you as much as is needed.", 1);
		break;
	case 5:
		qm.getPlayer().addHP((qm.getPlayerStat("HP") - 500) > (qm.getPlayerStat("MAXHP") / 2) ? -(qm.getPlayerStat("HP") / 2) : 0);
		qm.sendNextPrevS("You are a hero to your very core, on par with the greatest I've known. With your strength, I will create a crystal that can save Mercedes from the ravages of the curse. Please give me some time.", 1);
		break;
	case 6:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			qm.sendNext("You are carrying enough already. Return to me when you have lightened the burden in your Etc. tab.");
			qm.dispose();
			return;
			}
			qm.gainItem(4033082, qm.getPlayer().itemQuantity(4033082) ? 0 : 1);
			qm.sendNextPrevS("The #t4033082# is complete. Take this to Mercedes. With it in your possession, the lightest touch should restore life.", 1);
			break;
	case 7:
		Packages.server.quest.MapleQuest.getInstance(31174).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 0:
		qm.sendNext("Now, it is time that we see to Mercedes' safety.");
		break;
	case 1:
		qm.sendNextPrevS("I know what weighs upon your mind. It weighs upon mine as well. Mercedes' energies are fading.", 2);
		break;
	case 2:
		qm.sendNextPrev("Do not fear. Mercedes will return one day. The future of the Elves depends upon their ruler and I have never known Mercedes to shirk responsibility, even at the edge of death. If you would be willing to lend your powers, the Elven people would be in great debt to you.");
		break;
	case 3:
		qm.sendNextPrevS("I'm willing to lend my strength, as long as it's for the good of all.", 2);
		break;
	case 4:
		qm.sendNextPrevS("Noble, as always. I will use your Vitality to restore my strength enough to create a powerful crystal. This will bring life back to Mercedes.", 1);
		break;
	case 5:
		qm.getPlayer().addHP((qm.getPlayerStat("HP") - 500) > (qm.getPlayerStat("MAXHP") / 2) ? -(qm.getPlayerStat("HP") / 2) : 0);
		qm.sendNextPrevS("Please allow me the time to create the crystal.", 1);
		break;
	case 6:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			qm.sendNext("You are carrying enough already. Return to me when you have lightened the burden in your Etc. tab.");
			qm.dispose();
			return;
			}
			qm.gainItem(4033082, qm.getPlayer().itemQuantity(4033082) ? 0 : 1);
			qm.sendNextPrevS("The #t4033082# is complete. Take this to Mercedes. With it, the lightest touch should restore life.", 1);
			break;
	case 7:
		Packages.server.quest.MapleQuest.getInstance(31174).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 0:
		qm.sendNext("You've rescued Aran and our tribe, but your help is still needed. I assume you saw Mercedes on your way here.");
		break;
	case 1:
		qm.sendNextPrevS("I did. Mercedes looked worse than Aran. What can I do to help?", 2);
		break;
	case 2:
		qm.sendNextPrev("Do not fear. Mercedes will return one day. The future of the Elves depends upon their ruler and I have never known Mercedes to shirk responsibility, even at the edge of death. If you would be willing to lend your powers, the Elven people would be in great debt to you.");
		break;
	case 3:
		qm.sendNextPrevS("I'd be happy to help!", 2);
		break;
	case 4:
		qm.sendNextPrevS("You will feel your energy draining, but do not be alarmed. I will only take from you as much as is needed.", 1);
		break;
	case 5:
		qm.getPlayer().addHP((qm.getPlayerStat("HP") - 500) > (qm.getPlayerStat("MAXHP") / 2) ? -(qm.getPlayerStat("HP") / 2) : 0);
		qm.sendNextPrev("Your strength is incredible, an easy match for Freud. I feel the power of the Dragon Master within you. With your Vitality, I will create a powerful crystal. This will bring life back to Mercedes.", 1);
		break;
	case 6:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			qm.sendNext("You are carrying enough already. Return to me when you have lightened the burden in your Etc. tab.");
			qm.dispose();
			return;
			}
			qm.gainItem(4033082, qm.getPlayer().itemQuantity(4033082) ? 0 : 1);
			qm.sendNextPrevS("The #t4033082# is complete. Take this to Mercedes. With it, the lightest touch should restore life.", 1);
			break;
	case 7:
		Packages.server.quest.MapleQuest.getInstance(31174).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}

function action4(mode, type, selection) {
	switch (status) {
	case 0:
		qm.sendNext("Mercedes, it is time for you to fight. You must push yourself to escape this slumber.");
		break;
	case 1:
		qm.sendNextPrevS("What are you talking about? I just woke up, unless...", 2);
		break;
	case 2:
		qm.sendNextPrev("Do you remember anything before now? Before you arrived here?");
		break;
	case 3:
		qm.sendNextPrevS("I-I don't.", 2);
		break;
	case 4:
		qm.sendNextPrevS("Remain quiet and listen. I must borrow some of your energy for I have grown weak and we have little time. This is necessary to save you from great harm. You will feel your stamina draining, but do not be alarmed.", 1);
		break;
	case 5:
		qm.getPlayer().addHP((qm.getPlayerStat("HP") - 500) > (qm.getPlayerStat("MAXHP") / 2) ? -(qm.getPlayerStat("HP") / 2) : 0);
		qm.sendNextPrevS("Wait for a moment. Your great strength could make this curse far worse than it is.", 1);
		break;
	case 6:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			qm.sendNext("You are carrying enough already. Return to me when you have lightened the burden in your Etc. tab.");
			qm.dispose();
			return;
			}
			qm.gainItem(4033082, qm.getPlayer().itemQuantity(4033082) ? 0 : 1);
			qm.sendNextPrevS("The #t4033082# is complete. Take this to Mercedes and touch her with it gently. Awakening her now would create a ripple in time that could cause serious repercussions for you. The Mercedes that lies here is you, in what you would consider the past.", 1);
			break;
	case 7:
		Packages.server.quest.MapleQuest.getInstance(31174).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}