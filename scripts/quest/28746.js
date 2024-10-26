/*
	名字:	是什麼在震?
	地圖:	新葉城-市區中心
	描述:	600000000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
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
		qm.sendYesNo("First off, we've got to find out what caused that earthquake! According to my egghead homies in #b#m600000000##k, this wasn't a natural phenomenon. I think you should take a look into it.");
		break;
	case 1:
		qm.sendNext("Take this... #b#v2430680# #t2430680##k...thing. The guys who made it said you could 'activate it to find the earthquake's epicenter,' whatever that means. So, do that.");
		break;
	case 2:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Please check and see if you have an empty slot available at your Consume. inventory."));
			qm.dispose();
			return;
			}
			qm.gainItem(2430680, qm.getPlayer().itemQuantity(2430680) ? 0 : 1);
			qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28746)).setStatus(1);
			qm.getPlayer().updateQuest(qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28746)), true);
			qm.dispose();
}
}