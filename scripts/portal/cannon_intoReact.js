/*
	名字:	可可島
	地圖:	可可島近海處
	描述:	3000400
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2565)).getStatus() == 1) {
		pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.AranTutInstructionalBalloon("UI/tutorial.img/22"));
		}
		return false;
}