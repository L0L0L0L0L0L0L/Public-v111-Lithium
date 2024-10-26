

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 1) {
		qm.dispose();
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
		qm.sendNext("This must be the crack. The puzzle must be solved if we're going to save Maple World. Arkarium, the Mystic Gates, the Crack in Time...");
		break;
	case 1:
		qm.sendNextPrev("They say you have to enter the lion's den if you want to catch a lion. Maybe you should warp through the crack in time...");
		break;
	case 2:
		qm.sendYesNo("Crow and Starling are preparing for this new mission. Are you ready?");
		break;
	case 3:
		Packages.server.quest.MapleQuest.getInstance(31165).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendOk("Enter the crack. If you find Arkarium inside...just be safe. Take the portal to the right and take care of yourself.");
		break;
	case 4:
		qm.dispose();
}
}