/*
	名字:	只有修煉才能生存下去！3
	地圖:	瑞恩修練場入口
	描述:	140010100
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 5) {
		qm.sendNext("I know it takes an incredible amount of strength and will to outdo your instructor, but you weren't meant to let yourself wither away. You must move on to bigger and better things! You must do everything you can to embrace your heroic nature!");
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
		qm.sendNext("Your abilities are really beginning to take shape. I am surprised that an old man like me was able to help you. I'm tearing up just thinking about how happy it makes me to have been of assistance to you. *Sniff sniff*");
		break;
	case 1:
		qm.sendNextPrevS("#b(You didn't even train that long with him... Why is he crying?)#k", 2);
		break;
	case 2:
		qm.sendNextPrev("Alright, here's the third and the final stage of training. Your last opponent is... #r#o9300343#s#k! Do you know anything about #o1210100#s?");
		break;
	case 3:
		qm.sendNextPrevS("Well, a little bit...", 2);
		break;
	case 4:
		qm.sendNextPrev("They are natural warriors! They're born with a voracious appetite for food. They devour any food that's visible the moment they sweep by. Terrifying, isn't it?");
		break;
	case 5:
		qm.sendNextPrevS("#b(Is that really true?)#k", 2);
		break;
	case 6:
		qm.sendAcceptDecline("Okay, now... #bEnter the Training Center again#k, defeat #r30#k #o9300343#s, and show me what you're made of! You'll have to exert all your energy to defeat them! Go, go, go! Rise above me!");
		break;
	case 7:
		Packages.server.quest.MapleQuest.getInstance(21703).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendOk("Now go and take on those monstrous #o9300343#s!");
		break;
	case 8:
		qm.dispose();
}
}

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 3) {
		qm.sendNext("Are you reluctant to leave your instructor? *Sniff sniff* I'm so moved, but you can't stop here. You are destined for bigger and better things!");
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
		qm.sendNext("Ah, you've come back after defeating all 30 #o9300343#s. I knew you had it in you... Even though you have no memories and few abilities, I could see that you were different! How? Because you're carrying around a Polearm, obviously!");
		break;
	case 1:
		qm.sendNextPrevS("#b(Is he pulling your leg?)#k", 2);
		break;
	case 2:
		qm.sendYesNo("I have nothing more to teach you, as you've surpassed my level of skill. Go now! Don't look back! This old man is happy to have served as your instructor.");
		break;
	case 3:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(21703)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(21703).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainExp(2000);
			}
			qm.sendNextS("I can see you've gained some EXP. I was worried that getting trained by someone so senile wouldn't help, but it seems to have been very effective.", 2);
			break;
	case 4:
		qm.sendPrev("Now report back to #p1201000#. I know she'll be ecstatic when she sees the progress you've made!");
		break;
	case 5:
		qm.dispose();
}
}