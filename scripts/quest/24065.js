/*
	名字:	三大長老和國王
	地圖:	櫻花處
	描述:	101050000
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		qm.sendNext("Your Majesty, if I might suggest... With all three elders awakened, we might attempt the #bRite of Snow#k...");
		break;
	case 1:
		qm.sendNextPrevS("The Rite of Snow? Are you strong enough yet?", 2);
		break;
	case 2:
		qm.sendNextPrev("We will be fine. I believe that this purification spell may be our best chance of freeing the Elves from the curse.");
		break;
	case 3:
		qm.sendNextPrevS("I'm worried about you. The aftermath of the curse left you too weak to try such powerful magic...", 2);
		break;
	case 4:
		qm.sendNextPrev("The Rite of Snow doesn't rely on its casters' power. It isn't easy, but it won't use up any of our strength. All we need do is call upon the hearts and spirits of the Elven people. We can do it right now, in fact.");
		break;
	case 5:
		qm.sendNextPrevS("Very well. If you believe it could lift the curse, please, try the Rite of Snow.", 2);
		break;
	case 6:
		Packages.server.quest.MapleQuest.getInstance(24065).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("mercedes/frame", 3));
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("mercedes/elfElder", 3));
		qm.dispose();
}
}