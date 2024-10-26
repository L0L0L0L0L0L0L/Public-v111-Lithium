/*
	名字:	楓之島
	地圖:	小樹林
	描述:	40000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(1035)).getStatus() == 2) {
		pi.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.AranTutInstructionalBalloon("UI/tutorial.img/23"));
		}
		return false;
}