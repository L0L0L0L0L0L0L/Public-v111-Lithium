/*
	名字:	蒙特鳩研究所
	地圖:	研究所1樓走道
	描述:	261010000
*/

function enter(pi) {
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3360)).getStatus() == 2) {
		pi.getPlayer().changeMap(pi.getMap(261030000), pi.getMap(261030000).getPortal(pi.getPlayer().getMap().getId() == 261010000 ? 2 : 1));
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Your name is on the list. Now transporting to the Secret Passage."));
		return true;
		}
	if (pi.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3360)).getStatus() == 1) {
	if (pi.getPlayer().getInfoQuest(3360).indexOf("arr2=o") != -1 && pi.getPlayer().getMap().getId() == 261020200) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The security device is not yet unlocked. Please enter the passcode in the other location as well."));
		return false;
		}
	if (pi.getPlayer().getInfoQuest(3360).indexOf("arr3=o") != -1 && pi.getPlayer().getMap().getId() == 261010000) {
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The security device is not yet unlocked. Please enter the passcode in the other location as well."));
		return false;
		}
		pi.openNpc(2111024);
		return true;
		}
		pi.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You are not authorized to enter the Secret Passage."));
		return false;
}