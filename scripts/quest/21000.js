/*
	名字:	請救出小孩1
	地圖:	避難準備中
	描述:	914000100
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.sendNext("No, Aran... We can't leave a kid behind. I know it's a lot to ask, but please reconsider. Please!");
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
		qm.sendAcceptDecline("Oh, no! I think there's still a child in the forest! Aran, I'm very sorry, but could you rescue the child? I know you're injured, but I don't have anyone else to ask!");
		break;
	case 1:
		Packages.server.quest.MapleQuest.getInstance(21000).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendNext("#bThe child is probably lost deep inside the forest!#k We have to escape before the Black Mage finds us. You must rush into the forest and bring the child back with you!");
		break;
	case 2:
		qm.sendNextPrev("Don't panic, Aran. If you wish to check the status of the \r\nquest, press #bQ#k and view the Quest window.");
		break;
	case 3:
		qm.sendNextPrev("Please, Aran! I'm begging you. I can't bear to lose another person to the Black Mage!");
		break;
	case 4:
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.AranTutInstructionalBalloon("Effect/OnUserEff.img/guideEffect/aranTutorial/tutorialArrow1"));
		qm.dispose();
}
}