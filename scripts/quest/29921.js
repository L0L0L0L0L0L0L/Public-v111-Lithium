/*
	名字:	鯨魚號捐獻王
	地圖:	維多利亞港
	描述:	104000000
*/

function start(mode, type, selection) {
	Packages.server.quest.MapleQuest.getInstance(29921).forceComplete(qm.getPlayer(), qm.getNpc());
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("<Nautilus Donor> has been rewarded."));
	qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "<Nautilus Donor> has been rewarded."));
	qm.dispose();
}

function end(mode, type, selection) {
	qm.dispose();
}