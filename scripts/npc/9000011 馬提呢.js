/*
    Name: Martin
    Map: Sky City
    Description: 200000000
*/

function start() {
	var chat = "Hey, traveler! I'm #p" + cm.getNpc() + "#. We are hosting new competition events. Are you interested in checking them out? #b";
	chat += "\r\n#L0#Save Jaja";
	chat += "\r\n#L1#Boss Battle Series";
	cm.sendSimple(chat);
}

function action(mode, type, selection) {
	switch (selection) {
		case 0:
			cm.getPlayer().saveLocation("EVENT");
			cm.getPlayer().changeMap(cm.getMap(922240200), cm.getMap(922240200).getPortal(0));
			break;
		case 1:
			cm.getPlayer().saveLocation("BOSSPQ");
			cm.getPlayer().changeMap(cm.getMap(970030000), cm.getMap(970030000).getPortal(0));
			break;
	}
	cm.dispose();
}
