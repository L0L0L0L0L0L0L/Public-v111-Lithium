/*
	名字:	第二個導管手把
	地圖:	失蹤煉金術士的家
	描述:	261000001
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3339)).getStatus() < 1) {
		cm.sendOk("The pipe didn't move one bit.");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3339)).getCustomData() != 2) {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3339)).getCustomData() == 1) {
		cm.sendNext("The sequence was incorrect! The pipe handle makes a sharp, shrieking metal noise and returns to its original position. Looks like you'll have to start over.");
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3339)).setCustomData(0);
		cm.dispose();
		return;
		}
		cm.sendNext("The sequence may have been incorrect. The pipe remains still.");
		cm.dispose();
		return;
		}
		cm.sendGetText("As the pipe moved downwards, a security device appeared. A password may need to be entered.");
}

function action(mode, type, selection) {
	if (mode > 0)
		if (cm.getText() == "my love Phyllia" || cm.getText() == "") {
			cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3339)).setCustomData(0);
			cm.getPlayer().changeMap(cm.getMap(261000001), cm.getMap(261000001).getPortal(1));
			cm.dispose();
			return;
			}
			cm.sendNext("The password is incorrect! The pipe handle makes a sharp, shrieking metal noise and returns to its original position. Looks like you'll have to start over.");
			cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3339)).setCustomData(0);
			cm.dispose();
}