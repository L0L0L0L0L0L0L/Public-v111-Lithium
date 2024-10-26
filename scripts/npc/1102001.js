/*
	名字:	奇理科
	地圖:	第 2 練武場
	描述:	913001000
*/

function start() {
	cm.sendAcceptDecline("Have you found all the proof for the test? Do you want to get out of here?");
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.getPlayer().changeMap(cm.getMap(130020000), cm.getMap(130020000).getPortal(12));
		cm.dispose();
}