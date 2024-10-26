/*
	名字:	騎士團要塞
	地圖:	榮譽殿堂
	描述:	271030600
*/

function enter(pi) {
	if (pi.getPlayer().itemQuantity(4032923)) {
		pi.getPlayer().changeMap(pi.getMap(271040000), pi.getMap(271040000).getPortal(1)); //西格諾斯庭園
		return true;  
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31149)).getStatus() == 1) {
		pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31149)).setCustomData("find");
		pi.getPlayer().updateQuest(pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(31149)), true);
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "The Cygnus Garden has been located."));
		return false;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "The door seems to be locked."));
		return false;
}