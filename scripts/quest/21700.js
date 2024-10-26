/*
	名字:	新的開始
	地圖:	瑞恩村
	描述:	140000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 4) {
		qm.sendNext("No? Are you saying you can train on your own? I'm just letting you know that you'll get better results if you train with an instructor. You can't live in this world alone. You must learn to get along with other people.");
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
		qm.sendNextS("It seems like you've started to remember things. Your Polearm must have recognized you. This means you are surely #bAran, the wielder of Polearms#k. Is there anything else you remember? Skills you used with the Polearm perhaps? Anything?", 8);
		break;
	case 1:
		qm.sendNextPrevS("#b(You tell her that you remember a few skills.)", 2);
		break;
	case 2:
		qm.sendNextPrevS("That's not a lot, but it's progress. Our focus, then, should be to get you back to the state before you were frozen. You may have lost your memory, but I'm sure it won't take long for you to recover the abilities that your body remembers.", 8);
		break;
	case 3:
		qm.sendNextPrevS("How do I recover my abilities?", 2);
		break;
	case 4:
		qm.sendAcceptDecline("There is only one way to do that. Train! Train! Train! Train! If you continue to train, your body will instinctively remember its abilities. To help you through the process, I'll introduce you to an instructor.");
		break;
	case 5:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21700)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendNext("Wait, I was going to give you a Practice Polearm for training, but your Equip tab seems to be full. You've always been best at wielding Polearms, so I'm sure it will come in handy. Please empty a slot in your Equip tab and accept this Polearm.");
			qm.dispose();
			return;
			}
			qm.gainItem(1442077, 1);
			Packages.server.quest.MapleQuest.getInstance(21700).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(21700));
			}
			qm.sendNext("I gave you a #bPolearm#k because I figured it would be best for you to use a weapon you're familiar with. It will be useful in your training.");
			break;
	case 6:
		qm.sendPrev("You'll find a Training Center if you exit to the #bleft#k. There, you'll meet #b#p1202006##k. I'm a bit worried because I think he may be struggling with bouts of Alzheimer's, but he spent a long time researching skills to help you. I'm sure you'll learn a thing or two from him.");
		break;
	case 7:
		qm.dispose();
}
}