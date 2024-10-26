/*
	名字:	銀河鑽頭爆炸
	地圖:	新葉城
	描述:	600000000
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28779)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(28779).forceStart(qm.getPlayer(), qm.getNpc(), 0);
			qm.dispose();
			return;
			}
			qm.sendNext("I'm guessing you're going to have to destroy that thing about 300 times. I know, it's a lot, but it's the future of NLC we're talking about!");
			break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28779)).getCustomData() < 300) {
			qm.sendOk("Looks like you've destroyed the #r#o9400802##k " + qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28779)).getCustomData() + " time(s). Only a few left!");
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.SETUP).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Please check and see if you have an empty slot available at your SETUP. inventory."));
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(28779).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28779)).setStatus(0);
			qm.gainItem(3062220, 1);
			qm.gainExp(1000000);
			qm.dispose();
}
}