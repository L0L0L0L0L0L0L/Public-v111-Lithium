/*
	名字:	瑞恩島
	地圖:	瑞恩西邊平原
	描述:	140010000
*/

function enter(pi) {
	if (pi.getPlayer().getJob() == 2000 && pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21014)).getStatus() < 2) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "The town of Rien is to the right. Take the portal on the right and go into town to meet Lilin."));
		return false;
		}
		pi.getPlayer().changeMap(pi.getMap(140010100), pi.getMap(140010100).getPortal(2)); //瑞恩修練場入口
		return true;
}