/*
	名字:	使用矛的英雄
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
		if (status < 1) {
		qm.sendNext("#b(You need to think about this for a second...)");
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
		qm.sendYesNo("#b(Are you certain that you were the hero that wielded the #p1201001#? Yes, you're sure. You better grab the #p1201001# really tightly. Surely it will react to you.)");
		break;
	case 1:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
			qm.sendOkS("#b(You have too many items in your Equip tab. You should make some room.)", 2);
			qm.dispose();
			return;
			}
			Packages.server.quest.MapleQuest.getInstance(21101).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(2100);
			qm.resetStats(35, 4, 4, 4);
			qm.gainItem(1142129, 1);
			qm.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(20009000), 1, 1, -1);
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("You have acquired the Pig's Weakness skill."));
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You have acquired the Pig's Weakness skill."));
			qm.sendNextS("#b(You might be starting to remember something...)#k", 3);
			break;
	case 2:
		qm.getPlayer().changeMap(qm.getMap(914090100), qm.getMap(914090100).getPortal(0));
		qm.dispose();
}
}