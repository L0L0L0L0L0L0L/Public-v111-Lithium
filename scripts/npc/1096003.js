/*
	名字:	猴子
	地圖:	淺海地帶
	描述:	3000100
*/

function start() {
	cm.sendNextS("Ook! Ook! ", 1);
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(0));
		cm.getPlayer().addHP(cm.getPlayerStat("HP") > 40 ? -(cm.getPlayerStat("HP") / 2) : 0);
		cm.dispose();
}