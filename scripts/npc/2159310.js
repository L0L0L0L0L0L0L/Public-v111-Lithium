/*
	名字:	凡雷恩
	地圖:	時間神殿迴廊2
	描述:	927000010
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
		cm.sendNextS("Are all the Commanders here, aside from those away on missions? Good. Let's begin the meeting.", 1);
		break;
	case 1:
		cm.sendNextPrevS("Until the mighty Black Mage finishes his plan, we must not relax for even a moment! We are still vulnerable to attack, and must remain on guard while the Black Mage is distracted. Now, #h0#, I heard you uncovered some interesting information.", 5, 2159308);
		break;
	case 2:
		cm.sendNextPrevS("Yes...I have discovered a resistance group has formed in secret, and is building a force to move against us.", 3);
		break;
	case 3:
		cm.sendNextPrevS("Resistance? Ha! There's no one left in this world that can resist us. I've even heard some of the rabble calling them #rHeroes#k. Isn't that precious?", 5, 2159308);
		break;
	case 4:
		cm.sendNextPrevS("Of course, I'm a little excited to see them scramble around in their last-ditch panic. Might make for some entertaining fights. They certainly didn't put up much resistance when we took Ereve. Or when I eliminated the Castellan.", 5, 2159339);
		break;
	case 5:
		cm.sendNextPrevS("The battle at Ereve was easy because of the Black Mage's involvement, not because of your power, #p2159339#. Watch your tongue.", 5, 2159308);
		break;
	case 6:
		cm.sendNextPrevS("Well... Since the Black Mage took care of everything, I didn't have to use my full power. So, there.", 5, 2159339);
		break;
	case 7:
		cm.sendNextPrevS("Lotus seems very busy... What are you doing here, Orchid? Are you not working with Lotus?", 3);
		break;
	case 8:
		cm.sendNextPrevS("Lotus is the one who's too busy for me! I was GOING to go back my twin up...you don't have to bug me about it. You guys are too uptight, anyway.", 5, 2159339);
		break;
	case 9:
		cm.sendNextPrevS("...This meeting is not going anywhere...", 1);
		break;
	case 10:
		cm.sendNextPrevS("Have you ever noticed that when #p2159339# opens her mouth, our meetings grind to a halt? Funny, that. As for the Heroes, I'm sure #h0# has a plan to deal with them.", 5, 2159308);
		break;
	case 11:
		cm.sendNextPrevS("Since you brought down the Goddess of Time, I'm sure these pathetic 'Heroes' will be no match for you.", 5, 2159308);
		break;
	case 12:
		cm.sendNextPrevS("...They will not be so easy to eliminate. Unlike most foes, the Heroes fight for others, not themselves. They are special, because they have chosen to protect the world, rather than struggle desperately. That makes them dangerous. And I'll remind you, I only stunned the Goddess. The Black Mage was the one to defeat her, of course.", 3);
		break;
	case 13:
		cm.sendNextPrevS("Goodness, how modest of you! That must be why you're the Black Mage's favorite. You really just put the rest of us to shame, don't you? My, my, my...", 5, 2159308);
		break;
	case 14:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg0/10", 2000, 0, -100, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1500));
		break;
	case 15:
		cm.sendNextS("Enough! Both of you.", 1);
		break;
	case 16:
		cm.sendNextPrevS("Why? I find Arkarium blabbering quite amusing.", 5, 2159339);
		break;
	case 17:
		cm.sendNextPrevS("And I am only complimenting the true HERO of our forces, the MIGHTY #h0#! Ha ha ha...", 5, 2159308);
		break;
	case 18:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg0/10", 2000, 0, -100, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1500));
		break;
	case 19:
		cm.sendNextS("#p2159309#, I've heard enough from you. #h0# stunned the Goddess of Time, allowing for our victory. THAT was the turning point in the battle. Accept it.", 1);
		break;
	case 20:
		cm.sendNextPrevS("Besides, you were credited for blinding the Goddess. What more do you want, #p2159309#?", 1);
		break;
	case 21:
		cm.sendNextPrevS("Oh, I don't want anything. I'm just...making observations. Shouldn't we move on with the meeting? The Heroes will be taken care of, but what of the remaining resistance group?", 5, 2159308);
		break;
	case 22:
		cm.sendNextPrevS("As commanded, they have been completely eliminated.", 1);
		break;
	case 23:
		cm.sendNextPrevS("Oh, I see!", 5, 2159308);
		break;
	case 24:
		cm.sendNextPrevS("I have a question, actually. Why has the Black Mage changed our orders? I mean, if we destroy everything, who will be left to rule over...?", 5, 2159339);
		break;
	case 25:
		cm.sendNextPrevS("Destroy everything? Did the Black Mage order such a thing? I received no such order.", 3);
		break;
	case 26:
		cm.sendNextPrevS("Oh, yes! I forgot. You seemed so tired from your epic battle against the Goddess, I didn't even mention the new orders to you.", 5, 2159308);
		break;
	case 27:
		cm.sendNextPrevS("You see, our great leader, the Black Mage, ordered all of us, except you, to eliminate everything. And I mean, EVERYTHING!", 5, 2159308);
		break;
	case 28:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg1/18", 2000, 0, -100, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1500));
		break;
	case 29:
		cm.sendNextS("Indeed. For example, I saw Leafre burned to cinders. Nothing remained...", 1);
		break;
	case 30:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg1/3", 2000, 0, -100, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1500));
		break;
	case 31:
		cm.sendNextS("(Leafre! That's in the Southern Region, near my family's home..!)", 3);
		break;
	case 32:
		cm.sendNextPrevS("The Black Mage told us to show the world the price of resistance, so we began eliminating areas suspected of treachery. I think we did rather well.", 5, 2159308);
		break;
	case 33:
		cm.sendNextPrevS("Yes... There are only a few remaining dragon servants left.", 1);
		break;
	case 34:
		cm.sendNextPrevS("Wait, wait. Did the Black Mage not promise that he would not attack the Southern Region? Which parts were destroyed?", 3);
		break;
	case 35:
		cm.sendNextPrevS("Which parts? Ha! All of them, of course! We took our orders quite seriously. Why...is something bothering you?", 5, 2159308);
		break;
	case 36:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg0/11", 2000, 0, -100, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1500));
		break;
	case 37:
		cm.sendNextS("...Please excuse me. There is a matter I must attend to.", 3);
		break;
	case 38:
		cm.sendNextPrevS("Hold it right there! No matter how favored you are by the Black Mage, you follow orders. No one has dismissed you yet. Sit down. THAT is an order.", 5, 2159308);
		break;
	case 39:
		cm.sendNextPrevS("(Damian... Mother... Please be safe..)", 3);
		break;
	case 40:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 2));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 41:
		cm.dispose();
		cm.getPlayer().changeMap(cm.getMap(924020010), cm.getMap(924020010).getPortal(0));
}
}