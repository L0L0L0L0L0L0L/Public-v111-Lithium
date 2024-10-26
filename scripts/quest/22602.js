/*
	名字:	脫皮之後1
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
		if (status > 12) {
		qm.sendNext("Huh? Why not? You think I might need this scale at some point? I don't need any old scales, because I've got new ones, see? Well, think whatever you want, master.");
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
		qm.sendNext("Master! Look, I've grown some more.");
		break;
	case 1:
		qm.sendNextPrevS("#bOh my! You really grew! Whoa, your voice is even different!", 2);
		break;
	case 2:
		qm.sendNextPrev("Ahem... Really? Do I sound cool?");
		break;
	case 3:
		qm.sendNextPrevS("#bDefinitely! Dragons really do grow in leaps and bounds!", 2);
		break;
	case 4:
		qm.sendNextPrev("Yep! I shed my old scales and grew new ones. I guess in human terms, it would be something like...buying new clothes as your body grows?");
		break;
	case 5:
		qm.sendNextPrevS("#bYour new scales are so shiny and nice.", 2);
		break;
	case 6:
		qm.sendNextPrev("Yuuup. They are, aren't they?");
		break;
	case 7:
		qm.sendNextPrevS("#b(His body's grown but he still talks the same.)", 2);
		break;
	case 8:
		qm.sendNextPrev("Anyway, master, could you take a look at this? \r\n#v4032502#\r\nThis is one of the scales I shed. For some reason, this one's still shiny. All the others sort of fell apart. I feel like this scale still carries my strength in it. Do you think we could use it for something?");
		break;
	case 9:
		qm.sendNextPrevS("#bHmm, maybe.", 2);
		break;
	case 10:
		qm.sendNextPrev("Yippee! Humans don't have horns, scales, or claws like Dragons do, but they do have the ability to make useful things! That scale is extremely sturdy and carries with it my strength, so it will make you that much more powerful, master!");
		break;
	case 11:
		qm.sendNextPrevS("#bMir, you are awesome. When did you start thinking like that?", 2);
		break;
	case 12:
		qm.sendNextPrev("Ahem. It's not like I was born yesterday. I know a whole lot about humans now.");
		break;
	case 13:
		qm.sendAcceptDecline("Here you go, master. Take my scale. I know you'll be able to make something really great with it!");
		break;
	case 14:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendNext("Oh no, master! You've got too much baggage! Please empty one Equip slot in your Inventory.");
			qm.dispose();
			return;
			}
			qm.gainItem(1142156, 1);
			Packages.server.quest.MapleQuest.getInstance(22602).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(22602));
			qm.sendOk("#b(You received #p1013000#'s dragon scale. As you place your hand on the dragon scale, it magically transforms into #v1142156#.)");
			break;
	case 15:
		qm.dispose();
}
}