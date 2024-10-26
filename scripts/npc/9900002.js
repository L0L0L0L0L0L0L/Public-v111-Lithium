/*
    Name:    MapleStory GM
    Map:
    Description:
*/
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
			if (status < 2) {
				cm.dispose();
				return;
			}
			status--;
			break;
		case 1:
			status++;
			break;
	}
	switch (status) {
		case 0:
			var chat = "Hello #r#h ##k#k, I can provide some simple services here.#r";
			chat += "\r\n#L0#Free Market";
			chat += "\r\n#L1#View Map Drop Rates";
			cm.sendSimple(chat);
			break;
		case 1:
			if (selection == 0) {
				cm.dispose();
				cm.openNpc(9000087);
			} else if (selection == 1) {
				if (cm.getMap().getAllMonstersThreadsafe().size() <= 0) {
					cm.sendOk("Sorry, there are no monsters on the current map, so drop rates cannot be checked.");
					cm.dispose();
					return;
				}
				var selStr = "Please select the monster whose drop rate you want to check.\r\n\r\n#b";
				var iz = cm.getMap().getAllUniqueMonsters().iterator();
				while (iz.hasNext()) {
					var zz = iz.next();
					selStr += "#L" + zz + "##o" + zz + "##l\r\n";
				}
				cm.sendSimple(selStr);
			}
			select = selection;
			break;
		case 2:
			if (select == 0) {
				// Handled by NPC 9000087, no need for further action here
				cm.dispose();
			} else if (select == 1) {
				cm.sendNext(cm.checkDrop(selection));
				cm.dispose();
			}
			break;
	}
}
