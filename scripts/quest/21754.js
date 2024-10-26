/*
	名字:	另一個封印石的情報
	地圖:	弓箭手培訓中心
	描述:	100000201
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 2) {
		qm.sendNext("Aren't you going to take the letter? Shall we catch up some more then?");
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
		qm.sendNextS("Aran! Aran... I knew I'd see you again someday. I knew it because you always keep your promises! I've been waiting for this moment.", 8);
		break;
	case 1:
		qm.sendNextPrevS("#b(#p1012100# greets you with a huge smile.)", 2);
		break;
	case 2:
		qm.sendAcceptDecline("I can finally give you the letter I couldn't hundreds of years ago. It's been a long time, so the letter is a little wrinkled...but I'm sure you can still read it.");
		break;
	case 3:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21754)).getStatus() < 1) {
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			qm.sendNext("Hm... I was going to give you the letter, but I think you have too many items in your inventory, Aran.");
			qm.dispose();
			return;
			}
			qm.gainItem(4032328, qm.getPlayer().itemQuantity(4032328) ? 0 : 1);
			Packages.server.quest.MapleQuest.getInstance(21754).forceStart(qm.getPlayer(), qm.getNpc(), null);
			}
			qm.sendNextS("I'd like to chat more, but I no longer have as much time as I used to since I've become a Bowman instructor. Please, come talk to me again later.", 9);
			break;
	case 4:
		qm.sendNextPrevS("I'm happy to have been of assistance, my dear friend.", 9);
		break;
	case 5:
		qm.sendPrevS("#b(You receive a letter from #p1012100#... You wonder what it says... You should read it with #p1002104#.)", 2);
		break;
	case 6:
		qm.dispose();
}
}