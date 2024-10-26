/*
	名字:	黑暗的祭壇石像
	地圖:	黑暗的祭壇 入口
	描述:	272030300
*/

function start() {
	var em = cm.getEventManager("ArkariumAK");
	var prop = em.getProperty("state");
	if (prop == null || prop == 0) {
		em.startInstance(cm.getPlayer());
		cm.dispose();
		return;
		}
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
		cm.dispose();
}