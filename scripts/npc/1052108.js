/*
	名字:	倒下的垃圾桶
	地圖:	沼地小屋
	描述:	103030101
*/

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2878)).getStatus() == 1) {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2878)).getCustomData() == "check") {
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() != 0) {
		cm.sendNext("#b(The Ligators aren't giving you time to check the Trash Can. Eliminate them first.)");
		cm.dispose();
		return;
		}
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2878)).setCustomData("check");
		cm.getPlayer().updateQuest(cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2878)), true);
		cm.sendNextS("This Trash Can is empty! I'd better let JM From tha Streetz now about this. ...?! Ligators? Didn't Nella just have me catch a bunch of Ligators?", 2);
		cm.dispose();
		return;
		}
		cm.sendOk("#b(All that's in the Trash Can is a spider web.)");
		cm.dispose();
}