/*
	名字:	斐勒
	地圖:	可疑的實驗室
	描述:	931000013
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
		status--;
		break;
	case 1:
		status++;
		break;
		}
	if (cm.getPlayer().getMap().getId() == 931000011 || cm.getPlayer().getMap().getId() == 931000030) {
		cm.dispose();
		return;
		}
	if (cm.getInfoQuest(23007).indexOf("vel01=3") != -1) {
		cm.sendOk("It's been...a really long time since I've been outside the laboratory.");
		cm.dispose();
		}
	if (cm.getInfoQuest(23007).indexOf("vel01=2") == -1) {
	switch (status) {
	case 0:
		cm.sendNext("Whoa. Wh-what happened? The glass is broken... Did that vibration earlier break it?");
		break;
	case 1:
		cm.sendNextPrevS("Now, there's nothing stopping you right? Let's get out of here!", 2);
		break;
	case 2:
		cm.sendNextPrev("But...");
		break;
	case 3:
		cm.sendNextPrevS("Do you WANT to stay here or something?", 2);
		break;
	case 4:
		cm.sendNextPrev("Of course not!");
		break;
	case 5:
		cm.sendNextPrevS("Then hurry up! Let's go!", 2);
		break;
	case 6:
		cm.getPlayer().changeMap(cm.getMap(931000020), cm.getMap(931000020).getPortal(1));
		cm.getPlayer().updateInfoQuest(23007, cm.getPlayer().getInfoQuest(23007) + ";vel01=2");
		cm.dispose();
		return;
		}
		}
	if (cm.getInfoQuest(23007).indexOf("vel01=2") != -1) {
	switch (status) {
	case 0:
		cm.sendNext("It's been...a really long time since I've been outside the laboratory. Where are we?");
		break;
	case 1:
		cm.sendNextPrevS("This is the road that leads to Edelstein, where I live! Let's get out of here before the Black Wings follow us.", 2);
		break;
	case 2:
		cm.getPlayer().updateInfoQuest(23007, cm.getPlayer().getInfoQuest(23007) + ";vel01=3");
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.AranTutInstructionalBalloon("Effect/OnUserEff.img/guideEffect/aranTutorial/tutorialArrow1"));
		cm.dispose();
}
}
}