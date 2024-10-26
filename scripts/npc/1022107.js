/*
	名字:	勇士之村警告標示
	地圖:	風塵山丘
	描述:	102020100
*/

var map = [102020100, 102030000, 102030100, 102030200, 102030300];

var maps = ["Dusty Wind Hill", "Wild Boar Land", "Wild Pig Land", "Armor Pig Land", "Burning Heat"];

var mob = ["Dark Stump", "Wild Boar  Terrified Wild Boar", "Iron Hog", "Iron Boar", "Fire Boar  Iron Boar"];

var des = ["3-Way Road-Split that connects to the Burnt Land.", "None", "None", "None", "End of the Burnt Land. No path beyond this point."];

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		cm.dispose();
		return;
	case 0:
		if (type == 2) {
		cm.sendNext("#b(This look's a bit odd, lets take another look.)");
		cm.dispose();
		return;
		}
		if (type == 5) {
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
	for (var i = 0; i < map.length; i++)
	if (cm.getPlayer().getMap().getId() == map[i]) {
		slot = i;
		}
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22530)).getStatus() != 1) {
		cm.sendNext("" + maps[slot] + "  Warning Post\r\n\r\nMonsters Found : " + mob[slot] + "\r\nNotes : " + des[slot] + "");
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22530)).getCustomData() == null) {
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22530)).setCustomData("00000");
		Packages.server.quest.MapleQuest.getInstance(22597).forceStart(cm.getPlayer(), 0, 0);
		}
		x = cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22530)).getCustomData();
		y = cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22597)).getCustomData();
		ch = x[slot];
	if (ch == '1') {
		cm.sendNext("You already checked this Warning Post. Find another Warning Post.");
		cm.dispose();
		return;
		}
		reactor = 'action' + (cm.getPlayer().getMap().getId() == 102030100 ? 1 : 0);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("" + maps[slot] + "  Warning Post\r\n\r\nMonsters Found : " + mob[slot] + "\r\nNotes : " + des[slot] + "\r\nConfirm : ");
		break;
	case 1:
		cm.sendYesNo("#b(You don't think there's a mistake on the Warning Post. Mark the Confirm button with an O and be on your way. )");
		break;
	case 2:
		cm.sendNext("#b(You marked the Warning Post with an O.)#k\r\n\r\n" + maps[slot] + "  Warning Post\r\n\r\nMonsters Founding : " + mob[slot] + "\r\nNotes : " + des[slot] + "\r\nConfirm : O");
		break;
	case 3:
		var next = x.substr(0, slot) + '1' + x.substr(slot + 1);
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22530)).setCustomData(next);
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22597)).setCustomData(parseInt(y) + 1);
		cm.getPlayer().updateQuest(cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22597)), true);
		cm.sendNext("You confirmed " + (parseInt(y) + 1) + " Perion Warning Posts. Confirm all 5, then go report to Mike.");
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNext("Wild Pig Land  Warning Post\r\n\r\nMonsters Found : Iron Hog  Fire Boar\r\nNotes : None\r\nConfirm : ");
		break;
	case 1:
		cm.sendSimple("#b(You noticed that a monster listed in the Warning Post isn't actually in the area. Erase any monsters that shouldn't have been listed.) \r\n\r\n#L0##bIron Hog#l\r\n#L1#Fire Boar#l");
		break;
	case 2:
		if (selection < 1) {
			cm.sendNext("#b(Well, what's a bit strange? Are you sure there's no monster like Iron Hog? Take a closer look.)");
			cm.dispose();
			return;
			}
		if (selection > 0) {
			cm.sendNext("#b(You erased the monster name that was incorrectly added to the Warning Post and marked the confirm button with an O.)#k\r\n\r\nWild Pig Land  Warning Post\r\n\r\nMonsters Found : Iron Hog \r\nNotes : None\r\nConfirm : O");
			}
			break;
	case 3:
		var next = x.substr(0, slot) + '1' + x.substr(slot + 1);
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22530)).setCustomData(next);
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22597)).setCustomData(parseInt(y) + 1);
		cm.getPlayer().updateQuest(cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22597)), true);
		cm.sendNext("You confirmed " + (parseInt(y) + 1) + " Perion Warning Posts. Confirm all 5, then go report to Mike.");
		cm.dispose();
}
}