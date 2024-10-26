/*
	名字:	妖精 羅雯
	地圖:	魔法森林
	描述:	101000000
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21714)).getStatus() == 1 || cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21717)).getStatus() == 1 || cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21718)).getStatus() == 1) {
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You will be moved to the South Secret Forest."));
		cm.getPlayer().changeMap(cm.getMap(910100002), cm.getMap(910100002).getPortal(3));
		cm.dispose();
		return;
		}
		cm.sendOk("You can't go to the Secret Forest anytime you want.");
		cm.dispose();
}