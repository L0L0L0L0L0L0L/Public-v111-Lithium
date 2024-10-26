/*
    Name:    Astaroth's Gate
    Map:     Forest of Evil Aura 1
    Description:    101040310
*/

function start() {
	var em = cm.getEventManager("Astaroth");
	var prop = em.getProperty("state");
	if (cm.getPlayer().getMap().getId() == 101040310) {
		if (prop == null || prop == 0) {
			if (cm.getPlayer().getParty() == null) {
				em.startInstance(cm.getPlayer());
				cm.dispose();
				return;
			}
			em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
			cm.dispose();
			return;
		}
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Astaroth's hideout is currently crowded. Please try again later."));
		cm.dispose();
		return;
	}
	if (cm.getPlayer().getMap().getId() == 677000011) {
		cm.getPlayer().changeMap(cm.getMap(677000012), cm.getMap(677000012).getPortal(0));
		cm.dispose();
		return;
	}
	cm.sendYesNo("Are you sure you want to leave #b#m" + cm.getPlayer().getMap().getId() + "##k?");
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.getPlayer().changeMap(cm.getMap(101040310), cm.getMap(101040310).getPortal(0));
	cm.dispose();
}
