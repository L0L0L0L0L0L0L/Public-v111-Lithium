/*
	名字:	把我弄出去
	地圖:	一般牢房
	描述:	610040500
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 2) {
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
		qm.sendSimple("Welcome to your new home, Mapling! This is the cell we made for people who mess with our stuff! Once you go in, you don't come out, except for on galactic holidays! \r\n#L0##bYou'll never keep me in here!#l\r\n#L1#That's cool, I'll just hang out here until Blerp Day.#l\r\n#L2#I'm s-sorry! I'll never do that again! (Return to town)#l");
		break;
	case 1:
		if (selection == 0) {
			qm.sendNext("Our state-of-the-art jail cells are far beyond your primitive understanding! You'll never open it! Not even with your huge head!");
			}
		if (selection == 1) {
			qm.sendOk("I knew you'd give up. You just sit there like the engorged-headed monkey you are. It'll make my job so much easier!");
			qm.dispose();
			return;
			}
		if (selection == 2) {
			qm.sendSimple("Hmm, I guess it would cut down on my paperwork. You PROMISE never to do that again, and I'll send you back to #b#m600000000##k. \r\n#L1##bYes, I'm sorry. I won't get in your way anymore.#l\r\n#L2#Are you kidding?! I'm going to break even more stuff if you let me out of here! You alien guys are jerks!#l");
			}
			select = selection;
			break;
	case 2:
		if (select == 0) {
			qm.sendNext("Let's say, for the sake of ironic twists, that you DID open it. You'd never escape without using our super-secret Roborider, which happens to be parked three feet from your cell. Its weapons are the ONLY things on this planet strong enough to take out our advanced security robots! See? You're trapped! There's no way this speech will blow up in my face! Mwahahah!");
			}
		if (selection == 1) {
			qm.getPlayer().changeMap(qm.getMap(600000000), qm.getMap(600000000).getPortal(8));
			qm.dispose();
			return;
			}
		if (selection == 2) {
			qm.sendOk("What?! Why, you little... you can just rot in there forever!");
			qm.dispose();
			return;
			}
			break;
	case 3:
		qm.sendNextPrevS("Woah, that's so coo! Who made it? I bet you made it. My caveman brain is in awe right now.", 3);
		break;
	case 4:
		qm.sendNextPrev("Perhaps some of you aren't the groveling dirt-monkeys we took you for! Of course it was me, sort of! I alone was genius enough to build the Roborider! Don't let anyone else tell you that it took a team of hundreds thirty years to create it. It's simply not true!");
		break;
	case 5:
		qm.sendNextPrevS("Hey, that's cool. I tell you what, I'm done trying to escape. Will you sit down here with me and tell me about how great you are?", 3);
		break;
	case 6:
		qm.sendNextPrevS("Would you mind explaining the control mechanisms? What kind of targeting system did you put on it?", 3);
		break;
	case 7:
		qm.sendNextPrev("O-oh, well I COULD do that, because I made it, but... well, you know. Protocol and all that. Look, you wouldn't understand...");
		break;
	case 8:
		qm.sendNextPrevS("Aww, but you made it! Don't you just want to tell me a little bit? How do I operate the main cannon? How about the door? Certainly YOU can open a simple DOOR.", 3);
		break;
	case 9:
		qm.sendNextPrev("Of course I can! I am the master of door technology! Not just anybody can get these things open!");
		break;
	case 10:
		qm.sendNextPrevS("C-could you show me? I just want to experience greatness one more time before I spend the rest of my life here.", 3);
		break;
	case 11:
		qm.sendNextPrev("That seems reasonable. I AM pretty great.");
		break;
	case 12:
		qm.sendNextPrev("*Ka-chick*");
		break;
	case 13:
		qm.sendNextPrev("ARE YOU NOT AMAZED, MAPLE MONKEY?!");
		break;
	case 14:
		qm.sendNextPrevS("(How is he this stupid?!)", 3);
		break;
	case 15:
		qm.sendNextPrevS("Dude! You are so neat and amazing! I feel fulfilled. What are you doing standing around guarding me? You should be getting showered in the finest space ladies and taken to the great, uh, space mountains of Space Angeles!", 3);
		break;
	case 16:
		qm.sendNextPrev("I've always wanted to go to Space Angeles. The scenery is supposed to literally melt your eyeballs, but the people there are so shallow! But alas! I missed my supervisor's kid's Ceremony of Great Largening and now I'm stuck here!");
		break;
	case 17:
		qm.sendNextPrevS("Hey, I'm sure you can get him to forgive you! Just barge in there right now and tell him that you are either going to be recognized for your greatness or he should vaporize you on the spot! You're not just some loser! You made all this stuff!", 3);
		break;
	case 18:
		qm.sendNextPrev("You're right! I mean, I may have been exaggerating a little bit about the being a genius inventor, but I deserve more than this!");
		break;
	case 19:
		qm.sendNextPrevS("Yeah! You totally do, man! You go do it right now! Don't forget the vaporizing part to show him you're serious!", 3);
		break;
	case 20:
		qm.sendNextPrev("Yeah! I'm gonna do it! Thank you, you horrible-looking little Mapling. I won't forget you when my eyeballs melt. I know you'll get used to your new life as an unfed slave laborer very soon!");
		break;
	case 21:
		Packages.server.quest.MapleQuest.getInstance(28750).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getPlayer().changeMap(qm.getMap(610040501), qm.getMap(610040501).getPortal(0));
		qm.dispose();
}
}