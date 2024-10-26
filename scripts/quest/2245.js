/*
	名字:	前往崔斯坦的墳墓
	地圖:	神殿底層
	描述:	105100100
*/

var status = -1;

function start(mode, type, selection) {
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
		var em = qm.getEventManager("BalrogQuest");
		var prop = em.getProperty("state");
		if (prop == null || prop == 0) {
			em.startInstance(qm.getPlayer());
			Packages.server.quest.MapleQuest.getInstance(2245).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Someone is already in this map, Better come back later."));
			qm.dispose();
}
}