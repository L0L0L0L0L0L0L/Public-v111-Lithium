/*
	名字:	可疑的入口
	地圖:	危險的狸貓巢穴
	描述:	310050520
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23970)).getStatus() == 1) {
	if (cm.getPlayer().getPosition().x > 300) {
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "It's too far away to see clearly. I must get closer."));
		cm.dispose();
		return;
		}
		cm.sendNext("#v3800091# Through a crack in the boulder, you can see a small organism trapped inside. You try to enter but the door is locked.");
		Packages.server.quest.MapleQuest.getInstance(23982).forceStart(cm.getPlayer(), 0, 1);
		}
		cm.dispose();
}