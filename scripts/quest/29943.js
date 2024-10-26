/*
	名字:	特殊课程高级生
	地圖:	反抗者本部
	描述:	310010000
*/

function start(mode, type, selection) {
	Packages.server.quest.MapleQuest.getInstance(29943).forceComplete(qm.getPlayer(), qm.getNpc());
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("<Special Training Graduate> has been rewarded."));
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "<Special Training Graduate> has been rewarded."));
	qm.dispose();
}

function end(mode, type, selection) {
	qm.dispose();
}