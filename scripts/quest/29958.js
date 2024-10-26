/*
	名字:	復活的家人
	地圖:	秘密廣場
	描述:	310010000
*/

function start(mode, type, selection) {
	Packages.server.quest.MapleQuest.getInstance(29958).forceComplete(qm.getPlayer(), qm.getNpc());
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("<Demon Reborn> has been rewarded."));
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "<Demon Reborn> has been rewarded."));
	qm.dispose();
}

function end(mode, type, selection) {
	qm.dispose();
}