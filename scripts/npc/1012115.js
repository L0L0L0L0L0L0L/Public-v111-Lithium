/*
	名字:	弓箭手村草叢
	地圖:	弓箭手村北邊山丘
	描述:	100010000
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20706)).getStatus() != 1 || cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(20731)).getStatus() != 0) {
		cm.sendOk("It's an all-too-common forest.");
		cm.dispose();
		return;
		}
		cm.showNpcSpecialEffect(1012115, "blackShadow");
		Packages.server.quest.MapleQuest.getInstance(20731).forceStart(cm.getPlayer(), 0, 1);
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You have spotted the shadow! Better report to #p1103001#."));
		cm.dispose();
}