/*
	名字:	點火裝置
	地圖:	可可島某處
	描述:	3000500
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2566)).getStatus() != 1) {
		cm.dispose();
		return;
		}
	if (cm.getPlayer().itemQuantity(4032985)) {
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("You already have the lgnition Device."));
		cm.dispose();
		return;
		}
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("You found the Ignition Device. Bring it to Cutter."));
		cm.gainItem(4032985, 1);
		cm.dispose();
}