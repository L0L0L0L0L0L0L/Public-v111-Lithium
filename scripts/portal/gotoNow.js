/*
	名字:	黑暗時間神殿
	地圖:	黑魔法師的房前迴廊
	描述:	272010200
*/

function enter(pi) {
	if (pi.getPlayer().getMap().getAllMonstersThreadsafe().size() < 1) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31178)).getStatus() < 2) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("Let's listen to what the goddess said first."));
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Let's listen to what the goddess said first."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(272000000), pi.getMap(272000000).getPortal(2)); //時間裂縫
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Due to the monster's obstruction, the exit has been closed."));
		return false;
}