/*
	名字:	奇里盧
	地圖:	前往耶雷弗的站台
	描述:	104020120
*/

function start() {
	cm.sendYesNo("Eh... So... Um... Are you trying to leave Victoria to go to a different region? You can take this boat to #b#m130000000##k. There, you will see bright sunlight shining on the leaves and feel a gentle breeze on your skin. It's where Shinsoo and Empress Cygnus are. Would you like to go to #m130000000#? \r\n\r\nIt will take about #b30 seconds#k, and it will cost you #b1000#k Mesos.");
}

function action(mode, type, selection) {
	switch (mode) {
	case 0:
		cm.sendNext("Nothing I can do if you're not going...");
		break;
	case 1:
		if (cm.getPlayer().getMeso() < 1000) {
			cm.sendNext("Uh... it looks like you don't have the money... The fee is #b1000#k Mesos... Check your inventory to see how much money you have...");
			cm.dispose();
			return;
			}
			cm.gainMeso(-1000);
			cm.getPlayer().changeMap(cm.getMap(200090030), cm.getMap(200090030).getPortal(0));
			cm.getPlayer().startMapTimeLimitTask(30, cm.getMap(130000210));
			}
			cm.dispose();
}