/*
	名字:	安全！
	地圖:	菇菇森林深處
	描述:	106020300
*/

function start() {
	if (cm.getPlayer().getMap().getId() == 106020300) {
	if (cm.getPlayer().itemQuantity(2430014)) {
		qm.sendOkS("It seems as if the barrier could be broken using a Killer Mushroom Spore.", 3);
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2314)).getStatus() == 1) {
		cm.sendNextS("This looks to be a type of Mushroom Spore that has been transformed by magic into a strong defense barrier. It doesn't appear penetrable through physical force. Return to the #b#p1300003##k and report this matter.", 3);
		}
		}
	if (cm.getPlayer().getMap().getId() == 106020500) {
	if (cm.getPlayer().itemQuantity(2430015)) {
		cm.sendNextS("It looks like the #bThorn Remover#k should be used right around here.", 3);
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2322)).getStatus() == 1 && cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2322)).getCustomData() < 1) {
		cm.sendNextS("The colossal castle wall is covered with thorny vines. it's going to be difficult getting into the castle. For now. go report this to the #bSecretary of Domestic Affairs#k.", 3);
}
}
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (cm.getPlayer().getMap().getId() == 106020300) {
			cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2314)).setCustomData(1);
			cm.getPlayer().updateQuest(cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2314)), true);
			cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.AranTutInstructionalBalloon("Effect/OnUserEff.img/normalEffect/mushroomcastle/chatBalloon1"));
			}
		if (cm.getPlayer().getMap().getId() == 106020500) {
			cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2322)).setCustomData(1);
			cm.getPlayer().updateQuest(cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2322)), true);
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("Go report this to the Secretary of Domestic Affairs."));
			}
			}
			cm.dispose();
}