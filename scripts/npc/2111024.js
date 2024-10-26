/*
	名字:	秘密通道
	地圖:	研究所B-1區
	描述:	261020200
*/

function start() {
	cm.sendGetText("Please enter the passcode.");
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (cm.getText() == cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3360)).getCustomData()) { //讀取隨機密碼
		if (cm.getPlayer().getInfoQuest(3360).indexOf("arr2=o") != -1 || cm.getPlayer().getInfoQuest(3360).indexOf("arr3=o") != -1) {
			cm.getPlayer().changeMap(cm.getMap(261030000), cm.getMap(261030000).getPortal(cm.getPlayer().getMap().getId() == 261010000 ? 2 : 1));
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The security device has been unlocked. Your name has entered the list."));
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(3360));
			cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3360)).setStatus(2);
			cm.getPlayer().updateQuest(qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3360)), true);
			cm.dispose();
			return;
			}
			cm.getPlayer().updateInfoQuest(3360, cm.getPlayer().getInfoQuest(3360) + (cm.getPlayer().getMap().getId() == 261020200 ? ";arr2=o" : ";arr3=o"));
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The security device has been unlocked."));
			cm.dispose();
			return;
			}
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "Incorrect passcode. You are not authorized to enter the Secret Passage."));
			}
			cm.dispose();
}