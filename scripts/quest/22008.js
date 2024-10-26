/*
	名字:	追趕後院的狐狸
	地圖:	前院
	描述:	100030102
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendNext("Oh what.. Are you scared of the #o9300385#es? Don't tell anyone you're related to me. That's shameful.");
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
		qm.sendAcceptDecline("It's strange. The chickens are acting funny. They used to hatch way more Eggs. Do you think the Foxes have something to do with it? If so, we better hurry up and do something.");
		break;
	case 1:
		Packages.server.quest.MapleQuest.getInstance(22008).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendNextS("Right? Let us go and defeat those Foxes. Go on ahead and defeat #r10 #o9300385#es#k in #b#m100030103##k first. I'II follow you and take care of what's left behind. Now, hurry over to #m100030103#!", 1);
		break;
	case 2:
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.getEvanTutorial("UI/tutorial/evan/10/0"));
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
	switch (status) {
	case 0:
		qm.sendNext("Did you defeat the #o9300385#es?");
		break;
	case 1:
		qm.sendNextPrevS("#bWhat happened to slaying the Foxes left behind?", 2);
		break;
	case 2:
		qm.sendNextPrev("Oh, that? Haha. I did chase them, sort of, but I wanted to make sure that they catch up to you. I wouldn't want you eaten by a #o9300385# or anything. So I just let them be.");
		break;
	case 3:
		qm.sendNextPrevS("#bAre you sure you weren't just hiding because you were scared of the Foxes?", 2);
		break;
	case 4:
		qm.sendNextPrev("What? No way! Sheesh, I fear nothing!");
		break;
	case 5:
		qm.sendNextPrevS("#bWatch out! There's a #o9300385# right behind you!", 2);
		break;
	case 6:
		qm.sendNextPrev("Eeeek! Mommy!");
		break;
	case 7:
		qm.sendNextPrevS("#b...", 2);
		break;
	case 8:
		qm.sendNextPrev("...");
		break;
	case 9:
		qm.sendNextPrev("You little brat! I'm your older brother. Don't you mess with me! Your brother has a weak heart, you know. Don't surprise me like that!");
		break;
	case 10:
		qm.sendNextPrevS("#b(This is why I don't want to call you Older Brother...)", 2);
		break;
	case 11:
		qm.sendNextPrev("Hmph! Anyway, I'm glad you were able to defeat the #o9300385#es. As a reward, I'll give you something an adventurer gave me a long time ago. Here you are. \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v1372043# 1 #t1372043# \r\n#v2022621# 25 #t2022621# \r\n#v2022622# 25 #t2022622# \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 910 exp");
		break;
	case 12:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22008)).getStatus() < 2) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1 || qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 2) {
			qm.sendOk("I was going to give you some food for defeating the Foxes, but I can't. Do you even have room in your Inventory? Empty your Etc window and make sure you have at least one open spot in Equip, huh?");
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(22008).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(1372043, 1);
			qm.gainItem(2022621, 25);
			qm.gainItem(2022622, 25);
			qm.gainExp(910);
			}
			qm.sendNextPrev("#bThis is a weapon that Magicians use. It's a Wand#k. You probably won't really need it, but it'll make you look important if you carry it around. Hahahahaha.");
			break;
	case 13:
		qm.sendPrev("Anyway, the Foxes have increased, right? How weird is that? Why are they growing day by day? We should really look into it and get to the bottom of this.");
		qm.dispose();
}
}