/*
	名字:	裴爾
	地圖:	秘密廣場1
	描述:	931050010
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
		cm.sendNextS("Y-you really have wings.", 1);
		break;
	case 1:
		cm.sendNextPrevS("Who are you? Did the Black Wings send you as a spy? Actually, that wouldn't make sense...", 5, 2159312);
		break;
	case 2:
		cm.sendNextPrevS("Keep your guard up. We still don't know what's going on.", 5, 2159313);
		break;
	case 3:
		cm.sendNextPrevS("Who are you? What's your relationship with the Black Wings?", 5, 2159315);
		break;
	case 4:
		cm.sendNextPrevS("I have no idea who these Black Wings are. I've never heard of them. What do you want to know about me? I'm...not even sure where to begin...", 3);
		break;
	case 5:
		cm.sendNextPrevS("Well, let's start with your name, your organization, your background... And, if you don't mind, I'd like to know about those wings on your back.", 5, 2159315);
		break;
	case 6:
		cm.sendNextPrevS("My name is #h0#. I am not currently part of any organization...though I was once one of the Black Mage's Commanders. I rebelled against him, and we fought, but he defeated me. When I awoke, I saw what the man in the hat described. Oh, and I was born with these wings. My father was a demon.", 3);
		break;
	case 7:
		cm.sendNextPrevS("Wait, wait, wait. You were a Commander under the Black Mage? How? He's been sealed for hundreds of years?", 5, 2159315);
		break;
	case 8:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg1/3", 2000, 0, -100, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 600));
		break;
	case 9:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg0/10", 1500, -90, -200, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg0/10", 1500, 210, -200, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg0/10", 1500, 100, -200, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg0/10", 1500, -180, -150, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg0/10", 1500, -260, -100, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg0/10", 1500, 270, -100, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1500));
		break;
	case 10:
		cm.sendNextS("Sounds like someone has a screw loose to me. The experiments do that sometimes. One subject thought she was a violin.", 1);
		break;
	case 11:
		cm.sendNextPrevS("(Hundreds of years ago? What are they talking about? But...this place is so strange. How long have I been asleep? And...could the Heroes have sealed the Black Mage?)", 3);
		break;
	case 12:
		cm.sendNextPrevS("This makes no sense. What do you think, #p2159345#?", 1);
		break;
	case 13:
		cm.sendNextPrevS("It's no lie. That doesn't mean our guest isn't just crazy, though.", 5, 2159345);
		break;
	case 14:
		cm.sendNextPrevS("I'm with Black Jack on this one. Either our guest is crazy...or it's all true.", 5, 2159316);
		break;
	case 15:
		cm.sendNextPrevS("If that's true, then our guest is from hundreds of years ago, back before the Black Mage was sealed. Wait, if you were a Commander, why did you rebel?", 5, 2159315);
		break;
	case 16:
		cm.sendNextPrevS("That is a personal matter. Now, since I answered your questions, you answer mine. Who are you people? And who are the Black Wings?", 3);
		break;
	case 17:
		cm.sendNextPrevS("Like I said before, we're the Resistance. We're a group formed in secret to protect our home, the city of Edelstein, from the Black Wings. ", 5, 2159344);
		break;
	case 18:
		cm.sendNextPrevS("Those nasty folks that were using you like a battery were the Black Wings. They invaded Edelstein a while back, and have been draining energy from the city. We don't know why, but we do know that they're working for the Black Mage.", 5, 2159344);
		break;
	case 19:
		cm.sendNextPrevS("They follow the Black Mage? I thought you said he was sealed.", 3);
		break;
	case 20:
		cm.sendNextPrevS("He is. We think they're trying to find a way to release him again. And, to be fair, there have been a lot of recent events that hint that it could happen.", 5, 2159344);
		break;
	case 21:
		cm.sendNextPrevS("The Black Mage is returning? That's excellent news...", 3);
		break;
	case 22:
		cm.sendNextPrevS("That means I can still have my revenge!", 3);
		break;
	case 23:
		cm.sendNextPrevS("Okay...you're kinda crazy, but I can see we're on the same side.", 5, 2159313);
		break;
	case 24:
		cm.spawnNPCRequestController(2159311, 361, 58, 0);
		Packages.server.quest.MapleQuest.getInstance(23279).forceStart(cm.getPlayer(), 0, null);//顯示隱藏的佩樂迪
		cm.sendNextS("If you want revenge on the Black Mage, why don't you join us?", 5, 2159311);
		break;
	case 25:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg1/4", 1500, -90, -200, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg1/4", 1500, 210, -200, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg1/4", 1500, 100, -200, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg1/4", 1500, -180, -150, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg1/4", 1500, -260, -100, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg1/4", 1500, 270, -100, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 26:
		cm.sendNextS("Headmaster, what are you saying...?", 5, 2159315);
		break;
	case 27:
		cm.sendNextPrevS("Are you crazy? This is obviously a trap! And even if it isn't, we'd be fools to trust a Commander of the Black Mage!", 5, 2159313);
		break;
	case 28:
		cm.sendNextPrevS("Well... I'm happy to see everyone together on this! Ha!", 5, 2159311);
		break;
	case 29:
		cm.sendNextPrevS("I trust #p2159345#'s judgment, and besides, we can use all the help we can get. Even if our new friend #bused to be#k a Commander, this is clearly no longer the case.", 5, 2159311);
		break;
	case 30:
		cm.sendNextPrevS("Besides, better to have the Commander here with us than with the Black Wings.", 5, 2159312);
		break;
	case 31:
		cm.sendNextPrevS("We can always use more members. As long as our goals are the same, we can work together.", 5, 2159311);
		break;
	case 32:
		cm.sendNextPrevS("W-wait, what's going on? I'm still trying to catch up to the story here!", 3);
		break;
	case 33:
		cm.sendNextPrevS("There's no need to catch up. The decision has been made. If you want to fight the Black Mage, you'll have to go through the Black Wings, and you'll run into them the moment you leave this place. We have common enemies. Let's work together to bring them down!", 1);
		break;
	case 34:
		cm.sendNextPrevS("Caution is good. I don't expect you to fully trust us yet. We can work on that as we take the Black Wings apart, piece by piece.", 5, 2159316);
		break;
	case 35:
		cm.sendNextPrevS("True... Very well. I will join you, for now.", 3);
		break;
	case 36:
		cm.sendNextPrevS("I realize this is overdue, but...allow me to thank you for saving me.", 3);
		break;
	case 37:
		cm.sendNextPrevS("You're quite welcome. Hearing that is a relief...I've never been betrayed by someone who thanked me.", 5, 2159344);
		break;
	case 38:
		cm.sendNextPrevS("I am loyal to those who are loyal to me.", 3);
		break;
	case 39:
		cm.sendNextPrevS("Works for me. All right, make yourself at home. Our secret base is your secret base, and all that.", 5, 2159311);
		break;
	case 40:
		cm.dispose();
		cm.gainItem(1142341, 1);
		cm.getPlayer().changeJob(3100);
		Packages.server.quest.MapleQuest.getInstance(23209).forceStart(cm.getPlayer(), 0, 1);
		Packages.server.quest.MapleQuest.getInstance(23977).forceStart(cm.getPlayer(), 0, 1);
		Packages.server.quest.MapleQuest.getInstance(23279).forceComplete(cm.getPlayer(), 0);
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(0));
		cm.getPlayer().changeMap(cm.getMap(310010000), cm.getMap(310010000).getPortal(0));
}
}