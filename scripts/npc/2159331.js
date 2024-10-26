/*
	名字:	莫斯提馬
	地圖:	時間通道
	描述:	220050300
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case - 1:
		cm.dispose();
		return;
	case 0:
		if (status < 1) {
		cm.dispose();
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
		cm.sendYesNo("Are you ready, #h0#? If you are, I'll send you to the past through the Crack of Time. You were very powerful in the past, #h0#, so be careful.");
		break;
	case 1:
		cm.sendNext("Good luck, #h0#.");
		break;
	case 2:
		var em = cm.getEventManager("q23215");
		var prop = em.getProperty("state");
		if (prop == null || prop == 0) {
			em.startInstance(cm.getPlayer());
			cm.dispose();
			return;
			}
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Someone is already in this map, Better come back later."));
			cm.dispose();
}
}