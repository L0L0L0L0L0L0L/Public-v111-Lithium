/*
	名字:	幼龍醒來
	地圖:	寶貝龍
	描述:	寶貝龍
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 12) {
		qm.sendNext("You don't believe me? Grrrrr, you're getting me mad!");
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
		qm.sendNext("I'm finally here! *inhales* Ah, this must be air I'm breathing. And that, that must be the sun! And that, a tree! And that, a plant! And that, a flower! Woohahahaha! This is incredible! This is much better than I imagined the world to be while I was trapped inside the egg. And you... Are you my master? Hm, I pictured you differently.");
		break;
	case 1:
		qm.sendNextPrevS("#bWhoooooa, it talks!", 2);
		break;
	case 2:
		qm.sendNextPrev("My master is strange. I guess I can't do anything about it now, since the pact has been made. *sigh* Well, good to meet you. We'll be seeing a lot of each other.");
		break;
	case 3:
		qm.sendNextPrevS("#bEh? What do you mean? We'll be seeing a lot of each other? What pact?", 2);
		break;
	case 4:
		qm.sendNextPrev("What do you mean what do I mean?! You woke me from the Egg. You're my master! So of course it's your responsibility to take care of me and train me and help me become a strong Dragon. Obviously!");
		break;
	case 5:
		qm.sendNextPrevS("#bWhaaat? A Dragon? You're a Dragon?! I don't get it... Why am I your master? What are you talking about?", 2);
		break;
	case 6:
		qm.sendNextPrev("What are YOU talking about? Your spirit made a pact with my spirit! We're pretty much the same person now. Do I really have to explain? As a result, you've become my master. We're bound by the pact. You can't change your mind... The pact cannot be broken.");
		break;
	case 7:
		qm.sendNextPrevS("#bWait, wait, wait. Let me get this straight. You're saying I have no choice but to help you?", 2);
		break;
	case 8:
		qm.sendNextPrev("Yuuup! Heeeey...! What's with the face? You...don't want to be my master?");
		break;
	case 9:
		qm.sendNextPrevS("#bNo... It's not that... I just don't know if I'm ready for a pet.", 2);
		break;
	case 10:
		qm.sendNextPrev("A p-p-pet?! Did you just call me a pet?! How dare... Why, I'm a dragon! The strongest being in the world!");
		break;
	case 11:
		qm.sendNextPrevS("#b...(You stare at him skeptically. He looks like a lizard. A puny little one, at that.)", 2);
		break;
	case 12:
		qm.sendYesNo("Why are you looking at me like that?! Just watch! See what I can do with my power. Ready?");
		break;
	case 13:
		Packages.server.quest.MapleQuest.getInstance(22500).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendNextS("Command me to slay the #r#o1210100##ks! Do it now! I'll show you how fast a Dragon can defeat the #o1210100#s! Goooo, charge!", 1);
		break;
	case 14:
		qm.sendNextPrevS("Wait a minute! Did you distribute your AP? I'm heavily affected by my master's #bINT and LUK#k! If you really want to see what I can do, distribute your AP and #bequip your Magician equipment#k before you use the skill!", 1);
		break;
	case 15:
		qm.resetStats(4, 4, 20, 4);
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.getEvanTutorial("UI/tutorial/evan/11/0"));
		qm.dispose();
}
}