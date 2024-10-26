/*
	名字:	東邊城塔門
	地圖:	東邊城塔
	描述:	106021400
*/

function start() {
	cm.sendSimple("You will be moved to the Entrance to Wedding Hall. where would you like to go?\r\n\r\n#L0##b1. Bringing Dowo King Pepe (Party : 1-6 / Level : 30 or higher).#l\r\n#L1#2. Saving Violetta (Solo only / Level : 30 or higher)#l");
}

function action(mode,type,selection) {
	switch(selection) {
	case 0:
		var em = cm.getEventManager("KingPepeAndYetis");
		var prop = em.getProperty("state");
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
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
			cm.dispose();
			break;
	case 1:
		cm.getPlayer().changeMap(cm.getMap(106021401), cm.getMap(106021401).getPortal(1));
		}
		cm.dispose();
}