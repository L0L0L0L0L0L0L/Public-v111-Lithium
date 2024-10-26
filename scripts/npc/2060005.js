/*
	名字:	坎特
	地圖:	動物園
	描述:	230000003
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(6002)).getStatus() > 1) {
		cm.sendNext("You already guarded the pig, and you did just fine.");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(6002)).getStatus() < 1) {
		cm.sendOk("What pig? Where did you hear about that?");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().itemQuantity(4031508) > 5 && cm.getPlayer().itemQuantity(4031507) > 5) {
		cm.sendNext("I don't need another one of #bKenta's Reports#k and I'm all stocked up on #bPheromone#k. You don't need to go in.");
		cm.dispose();
		return;
		}
		var em = cm.getEventManager("ProtectPig");
		var prop = em.getProperty("state");
	if (prop == null || prop == 0) {
		cm.getPlayer().removeAll(4031507);
		cm.getPlayer().removeAll(4031508);
		em.startInstance(cm.getPlayer());
		cm.dispose();
		return;
		}
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Someone is attempting to protect the Watch Hog already. Please try again later."));
		cm.dispose();
}