/*
	Name: Payson
	Map: White Wave Harbor
	Description: 120020400
*/

function start() {
	if (cm.getPlayer().getMap().getId() == 120020400)
		cm.sendSimple("I've worked around here for a long time, and the scenery around this harbor is really beautiful. Do you want me to take you on a tour of the nearby waters?\r\n#L0##bDolphin Cape (800 mesos)#l\r\n#L1#Night Dolphin Island (900 mesos)#l");
	else
		cm.sendSimple("#m" + cm.getPlayer().getMap().getId() + "#, how is it? Pretty interesting, right?\r\n#L0##bReturn: White Wave Harbor#l\r\n#L1#Tour: " + (cm.getPlayer().getMap().getId() == 912050000 ? "Night Dolphin Island" : "Dolphin Cape") + " (500 mesos)#l\r\n#L2#Continue the tour#l");
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (selection < 2) {
			if (cm.getPlayer().getMeso() < (cm.getPlayer().getMap().getId() == 120020400 ? selection < 1 ? 800 : 900 : selection < 1 ? 0 : 500)) {
				cm.sendOk("Hmm... the service isn't free. To help maintain the local ecosystem, we hope you can make a small contribution.");
				cm.dispose();
				return;
			}
			cm.gainMeso(-(cm.getPlayer().getMap().getId() == 120020400 ? selection < 1 ? 800 : 900 : selection < 1 ? 0 : 500));
			map = selection < 1 ? cm.getPlayer().getMap().getId() == 120020400 ? 912050000 : 120020400 : cm.getPlayer().getMap().getId() == 912050001 ? 912050000 : 912050001;
			cm.getPlayer().changeMap(cm.getMap(map), cm.getMap(map).getPortal(0));
			cm.dispose();
			return;
		}
		cm.sendOk("The seaside view is very nice, perfect for relaxing. If you want to return, talk to me.");
	}
	cm.dispose();
}
