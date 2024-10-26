/*
	名字:	斐勒
	地圖:	可疑的實驗室
	描述:	931000010
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
		if (type < 3) {
		cm.sendNext("#b(You tried to hit the vat with all your might, but your hand slipped.)");
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
	if (cm.getPlayer().getMap().getId() == 931000011) {
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getInfoQuest(23007).indexOf("vel00=1") == -1) {
	switch (status) {
	case 0:
		cm.sendNext("Stay back!");
		break;
	case 1:
		cm.sendNextPrev("How did you get here? This place is prohibited!");
		break;
	case 2:
		cm.sendNextPrevS("Who's talking? Where are you?!", 2);
		break;
	case 3:
		cm.sendNextPrev("Look up.");
		break;
	case 4:
		cm.getPlayer().updateInfoQuest(23007, cm.getPlayer().getInfoQuest(23007) + ";vel00=1");
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction4.img/Resistance/ClickVel"));
		cm.dispose();
		return;
		}
		}
	if (cm.getPlayer().getInfoQuest(23007).indexOf("vel01=1") == -1) {
	switch (status) {
	case 0:
		cm.sendNext("My name is #bVita#k. I'm one of #rDoctor Gelimer's#k test subjects. But that's not important right now. You have to get out of here before someone sees you!");
		break;
	case 1:
		cm.sendNextPrevS("Wait, what are you talking about? Someone's doing experiments on you?! And who's Gelimer?", 2);
		break;
	case 2:
		cm.sendNextPrev("You've never heard of Doctor Gelimer, the Black Wings' mad scientist? This is his lab, where he conducts experiments...on people.");
		break;
	case 3:
		cm.sendNextPrevS("Experiments...on people? Are you serious?", 2);
		break;
	case 4:
		cm.sendNextPrev("Yes! And if he catches you here, he won't be merciful. Get out of here! Quickly!");
		break;
	case 5:
		cm.sendNextPrevS("What? But what about you?!", 2);
		break;
	case 6:
		cm.sendNextPrev("Shhh! Did you hear that? Someone's coming! It's got to be Doctor Gelimer! Oh no!");
		break;
	case 7:
		cm.dispose();
		cm.getPlayer().updateInfoQuest(23007, cm.getPlayer().getInfoQuest(23007) + ";vel01=1");
		cm.getPlayer().changeMap(cm.getMap(931000011), cm.getMap(931000011).getPortal(0));
		return;
		}
		}
	if (cm.getPlayer().getInfoQuest(23007).indexOf("vel01=1") != -1) {
	switch (status) {
	case 0:
		cm.sendNext("Whew, something must have distracted them. Now's your chance. GO!");
		break;
	case 1:
		cm.sendNextPrevS("But if I flee, you'll be left here alone...", 2);
		break;
	case 2:
		cm.sendNextPrev("Forget about me. You can't help me. Doctor Gelimer would realize right away if I'm missing, and then he'd summon the Black Wings to look for us. No, forget me and save yourself. Please!");
		break;
	case 3:
		cm.sendNextPrevS("I can't just leave you here! And you shouldn't give up hope so easily!", 2);
		break;
	case 4:
		cm.sendNextPrev("But it IS hopeless. I'm stuck in here. But thank you for caring. It's been a long time since anyone's been kind to me. Now, hurry! You must go!");
		break;
	case 5:
		cm.sendYesNo("#b(Vita closes her eyes like she's given up. What should you do? How about trying to break open the vat?)#k");
		break;
	case 6:
		cm.dispose();
		cm.gainExp(60);
		cm.getPlayer().changeMap(cm.getMap(931000013), cm.getMap(931000013).getPortal(0));
}
}
}