/*
	名字:	競技場
	地圖:	進入競技場內部
	描述:	200101400
*/

function start() {
	var em = cm.getEventManager("Xerxes");
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
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "激戰薛西斯區域目前擁擠，請稍後再試"));
		cm.dispose();
}