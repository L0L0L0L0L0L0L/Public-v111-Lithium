/*
	名字:	龍魔導士是？
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
		if (status == 14) {
		qm.sendNext("Uh, you're kidding me, right? Tell me your finger slipped! Go ahead and accept the quest.");
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
		qm.sendNext("I knew it! I knew we were connected, master! When you get stronger, I get stronger, too. And when I get stronger, you can use my strength! That's our pact. I knew I picked a good master!");
		break;
	case 1:
		qm.sendNextPrevS("#bI see. How did we end up in this pact anyway?", 2);
		break;
	case 2:
		qm.sendNextPrev("I don't know. I was just an egg. I can't really remember...though I faintly recall you, master, walking toward me in a foggy forest. I remember your surprise upon seeing me. And I was calling out to you in return.");
		break;
	case 3:
		qm.sendNextPrevS("#b(Wait! That sounds just like that one dream you had... Did the two of you meet in a dream? Is it possible that the giant Dragon you saw in that dream was...#p1013000#?)", 2);
		break;
	case 4:
		qm.sendNextPrev("Master, you and I are one in spirit. I knew it the moment I saw you. That's why I wanted to make the pact with you. No one else. You had to pay the price I set, of course.");
		break;
	case 5:
		qm.sendNextPrevS("#bI paid a price?", 2);
		break;
	case 6:
		qm.sendNextPrev("Don't you remember? When you recognized me and touched me? That was the one condition I set. The moment you touched my egg, you and I became one in spirit.");
		break;
	case 7:
		qm.sendNextPrevS("#bOne in...spirit?", 2);
		break;
	case 8:
		qm.sendNextPrev("Yes! The Spirit Pact! You and I have seperate bodies, but we share one spirit. That's why you get stronger when I get stronger, and vice versa! Awesome, right? At least, I think so.");
		break;
	case 9:
		qm.sendNextPrevS("#bI have no idea what you're talking about, but it sounds like a pretty big deal.", 2);
		break;
	case 10:
		qm.sendNextPrev("Of course it's a big deal, silly master! You never have to worry about monsters again. You have me to protect you now! Go ahead and test me. In fact, let's go right now!");
		break;
	case 11:
		qm.sendNextPrevS("#bBut it's peaceful here. There are no dangerous monsters around.", 2);
		break;
	case 12:
		qm.sendNextPrev("WHAT?! That's no fun! Don't you like adventuring, master? Fighting monsters on behalf of your people, defeating evil, rescuing the innocent, and all that? You're not into that kind of thing?");
		break;
	case 13:
		qm.sendNextPrevS("#bIt's not part of my five year plan. I'm just kidding, but seriously, I'm a farmer's son...", 2);
		break;
	case 14:
		qm.sendAcceptDecline("Bah, well let me tell you this. It's impossible for a Dragon Master to live a peaceful life. I'll have plenty of chances to prove my skills. Trust me, our life will be one big adventure. Promise me that you'll stick with me, okay? \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 810 exp");
		break;
	case 15:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(22507)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(22507).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(22507));
			qm.gainExp(810);
			}
			qm.sendNextS("Hehehe, alrighty then, master. Let's get to it!", 1);
			break;
	case 16:
		qm.sendNextPrevS("#b(You're a bit confused, but you are now traveling with Mir the Dragon. Perhaps you'll go on an adventure together, like he said.)", 3);
		break;
	case 17:
		qm.sendNextPrevS("#b(You still have an errand to run. Your dad needs to talk to you, so go and see him now.)", 2);
		break;
	case 18:
		qm.dispose();
}
}