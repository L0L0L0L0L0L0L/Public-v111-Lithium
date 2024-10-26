/*
    Name:    Informant
    Map:     Knight's Area 2
    Description: 271030200
*/

function start() {
	var chat = "A new Elven Land has been discovered nearby. It is said that you can obtain the Cygnus Garden Key there. #b";
	chat += "\r\n#L0#Light #m271030201#";
	chat += "\r\n#L1#Fire #m271030202#";
	chat += "\r\n#L2#Wind #m271030203#";
	chat += "\r\n#L3#Dark #m271030204#";
	chat += "\r\n#L4#Lightning #m271030205#";
	cm.sendSimple(chat);
}

function action(mode, type, selection) {
	if (mode > 0) {
		cm.getPlayer().changeMap(cm.getMap(271030201 + selection), cm.getMap(271030201 + selection).getPortal(1));
	}
	cm.dispose();
}
