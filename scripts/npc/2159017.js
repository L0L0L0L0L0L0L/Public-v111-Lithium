/*
    Name:    John
    Map:     Cursed Ice Plain
    Description: 932000300
*/

function start() {
	if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
		cm.sendOk("Don't be fooled by it; it's all lies. Please eliminate this Ice Man.");
		cm.dispose();
		return;
	}
	cm.sendYesNo("Thank you very much for your help in defeating the terrifying Ice Man. Please accept this commemorative gift.\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#v4001529# #t4001529# 1");
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Not enough slots in the ETC inventory."));
			cm.dispose();
			return;
		}
		cm.gainItem(4001529, 1);
		cm.getPlayer().changeMap(cm.getMap(932000400), cm.getMap(932000400).getPortal(0));
	}
	cm.dispose();
}
