/*
	名字:	精靈之林
	地圖:	國王休息處
	描述:	101050010
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(24005)).getStatus() == 1) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "I'm still so sleepy. I'll go outside when I'm more awake."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(101050000), pi.getMap(101050000).getPortal(7)); //櫻花處
		return true;
}