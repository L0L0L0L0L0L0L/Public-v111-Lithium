function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(6301)).getStatus() != 1) {
		cm.sendOk("It is foolish to try to peer into the future...");
		cm.dispose();
		return;
	}
	if (!cm.getPlayer().itemQuantity(4000175)) {
		cm.sendOk("You can only open the distorted dimension if you have found #b#z4000175##k.");
		cm.dispose();
		return;
	}
	if (cm.getMap(923000000).getCharacters().size() > 0) {
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "The distorted dimension is currently crowded, please try again later."));
		cm.dispose();
		return;
	}
	cm.gainItem(4000175, -1);
	cm.getPlayer().changeMap(cm.getMap(923000000), cm.getMap(923000000).getPortal(2));
	cm.getPlayer().startMapTimeLimitTask(1200, cm.getMap(230040001));
	cm.dispose();
}
