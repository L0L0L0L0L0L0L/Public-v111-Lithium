/*
	Name: Time Portal
	Map: Terra Forest Time Portal
	Description: 240070000
*/

var quest = [3718, 3723, 3728, 3735, 3740, 3743];
var map = [240070100, 240070200, 240070300, 240070400, 240070500, 240070600];

function start() {
	if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3718)).getStatus() < 2) {
		cm.sendOk("The time machine has not been activated.");
		cm.dispose();
		return;
	}
	for (limit = 0; limit < quest.length; limit++)
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(quest[limit])).getStatus() < 2) {
			break;
		}
	if (limit < 1) {
		cm.sendOk("To open the Time Portal, you need to defeat the Terra Forest's Guardian of the Deadwood, Naus, to traverse the time reverse.");
		cm.dispose();
		return;
	}
	var chat = "Due to #bGuardian Naus#k's weakened power, the Time Portal has been opened.";
	var len = Math.min(limit, map.length);
	for (var i = 0; i < len; i++)
		chat += "\r\n#L" + i + "##m" + map[i] + "##l";
	cm.sendSimple(chat);
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.getPlayer().changeMap(cm.getMap(map[selection]), cm.getMap(map[selection]).getPortal(1));
	cm.dispose();
}
