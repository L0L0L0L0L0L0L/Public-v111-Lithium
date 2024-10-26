/*
	名字:	傑利麥勒
	地圖:	可疑的實驗室
	描述:	931000011
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
	switch (status) {
	case 0:
		cm.sendNextS("The experiment is going well, quite well. The endless supply of Rue is certainly speeding things along. Joining the Black Wings was a wise decision, a wise decision indeed. Muahaha!", 1);
		break;
	case 1:
		cm.sendNextPrevS("I say, you have great foresight about these things.", 5, 2159008);
		break;
	case 2:
		cm.sendNextPrevS("The android the Black Wings wanted will be completed soon. Oh yes, very soon. Then, the next stage will begin! I will conduct an experiment wilder than their wildest dreams!", 1);
		break;
	case 3:
		cm.sendNextPrevS("Pardon? The next stage?", 5, 2159008);
		break;
	case 4:
		cm.sendNextPrevS("Teeheehee, do you still not comprehend what I'm trying to create? Look around! Here's a clue: it's worlds more interesting than a simple android. Eons more interesting.", 1);
		break;
	case 5:
		cm.sendNextPrevS("What?? All these test subjects... I say, sir, just what are you planning to do?", 5, 2159008);
		break;
	case 6:
		cm.sendNextPrevS("Now, now, you may not understand the grandness of my experiments. I don't expect you to. No, I don't expect you to. Just focus on your job and make sure none of the test subjects run away.", 1);
		break;
	case 7:
		cm.sendNextPrevS("Hey... Did you hear that?", 1);
		break;
	case 8:
		cm.sendNextPrevS("Huh? Well... Now that you mention it, I do hear something. Yes, I do hear something...", 5, 2159008);
		break;
	case 9:
		cm.dispose();
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroLock(1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.trembleEffect(0, 500));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction4.img/Resistance/TalkInLab"));
}
}