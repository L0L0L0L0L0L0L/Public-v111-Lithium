/*
	名字:	初學採集者必要的東西
	地圖:	專業技術村 &amp;lt;梅斯特鎮&gt;
	描述:	910001000
*/

var status = -1;

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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(7955)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(7955).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			qm.sendOk("You don't have enough slots in your Etc tab. Talk to me after emptying at least two slots in your Etc tab.");
			qm.dispose();
			return;
			}
		if (!qm.getPlayer().itemQuantity(4330018)) {
			Packages.server.quest.MapleQuest.getInstance(7955).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainMeso(-10000);
			qm.gainItem(4022000, -10);
			qm.gainItem(4022001, -10);
			qm.gainItem(4022023, -10);
			qm.gainItem(4330017, 1);
			qm.sendNext("Here, take this bag. It should be quiet useful...way better than the bag you get from #p9031001# or #p9031002#. Use it well.");
			qm.dispose();
			return;
			}
			qm.sendNext("Oh, you already got a bag from me! I can't give you the same bag again. That would be such a faux pas. I'll give you something else instead. Use it when you need to craft something in the future.");
			break;
	case 1:
		Packages.server.quest.MapleQuest.getInstance(7955).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.gainMeso(-10000);
		qm.gainItem(4022000, -10);
		qm.gainItem(4022001, -10);
		qm.gainItem(4022023, -10);
		qm.gainItem(4021021, 3);
		qm.gainItem(4007005, 3);
		qm.dispose();
}
}