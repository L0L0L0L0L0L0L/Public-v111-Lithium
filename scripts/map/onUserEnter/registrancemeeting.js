/*
	名字:	埃德爾斯坦
	地圖:	秘密廣場
	描述:	931000660
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case - 1:
		ms.dispose();
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
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 1:
		ms.sendNextS("We are here because the Resistance has been invited to Ereve. It seems the Empress wants us to join forces to prepare for the Black Mage's return. They're holding some kind of continental conference on the matter.", 5, 2151003);
		break;
	case 2:
		ms.sendNextPrevS("Cygnus... It's been a long time since l heard that name. She's no friend of Edelstein.", 5, 2151000);
		break;
	case 3:
		ms.sendNextPrevS("They don't expect us to show up, do they? They already betrayed us once. l say we blow them off!", 5, 2151001);
		break;
	case 4:
		ms.sendNextPrevS("I feel the same way, but. Do you remember what happened to Vita?", 5, 2151003);
		break;
	case 5:
		ms.sendNextPrevS("After that mission, #h0# reported something very interesting. Something about the founder of the Black Wings.", 5, 2151003);
		break;
	case 6:
		ms.sendNextPrevS("l thought we decided that this so-called 'founder doesn't exist.", 5, 2151000);
		break;
	case 7:
		ms.sendNextPrevS("She does exist, and her name is Orchid. Does that name sound familiar? It should. She is one of the Commanders of the Black Mage!", 5, 2151003);
		break;
	case 8:
		ms.sendNextPrevS("She is the one who formed the Black Wings and took over our town. Apparently, all the human experiments are to help her create some sort of super-powerful monster.", 5, 2151003);
		break;
	case 9:
		ms.sendNextPrevS("What? What kind of monster?", 5, 2151001);
		break;
	case 10:
		ms.sendNextPrevS("We don't know any more than that But whatever it is. it can't be good.", 5, 2151003);
		break;
	case 11:
		ms.sendNextPrevS("All this is to help revive the Black Mage. What drives a person to such evil? What is it about the Black Mage that inspires such loyalty?", 5, 2151003);
		break;
	case 12:
		ms.sendNextPrevS("Wait a minute...I get the feeling that you think we SHOULD join this alliance!", 5, 2151001);
		break;
	case 13:
		ms.sendNextPrevS("I know it's tough to swallow, but we have no choice, If the Black Mage is involved, we'll need all the help we can get.", 5, 2151003);
		break;
	case 14:
		ms.sendNextPrevS("But can we really trust Cygnus?", 5, 2151000);
		break;
	case 15:
		ms.sendNextPrevS("Are we really so weak that we have to run to our enemies for help?", 5, 2151001);
		break;
	case 16:
		ms.sendNextPrevS("I'm not sure. We aren't ready to fight the Black Mage on our own, though! Of course we can't trust them, but...we have no choice.", 5, 2151003);
		break;
	case 17:
		ms.sendNextPrevS("...And I don't want to see another Vita..", 5, 2151003);
		break;
	case 18:
		ms.sendNextPrevS("......", 5, 2151002);
		break;
	case 19:
		ms.sendNextPrevS("Let's take a step back and think about this, eh? What do we hate more? The Cygnus Knights or the Black Wings? Do we hate the Knights so much that we can't join them, even if it's our only hope of beating the Black Wings?", 5, 2151002);
		break;
	case 20:
		ms.sendNextPrevS("What a simple-minded way of looking at things...", 5, 2151000);
		break;
	case 21:
		ms.sendNextPrevS("I just want to get to the bottom of this! Honestly, I'd rather join forces and beat the Black Wings. What about you. Elex?", 5, 2151002);
		break;
	case 22:
		ms.sendNextPrevS("Hmph. I don't like the Cygnus Knights, sure, but we gotta beat the Black Wings!", 5, 2151000);
		break;
	case 23:
		ms.sendNextPrevS("And you. Checky?", 5, 2151002);
		break;
	case 24:
		ms.sendNextPrevS("It wouldn't hurt to just try it out. would it? We can always break the alliance if they turn on us.", 5, 2151004);
		break;
	case 25:
		ms.sendNextPrevS("Brighton?", 5, 2151002);
		break;
	case 26:
		ms.sendNextPrevS("The Black Wings must be destroyed. Thats all that matters.", 5, 2151001);
		break;
	case 27:
		ms.sendNextPrevS("l think we have our answer!", 5, 2151002);
		break;
	case 28:
		ms.sendNextPrevS("All right I see. Remember, we're just going to the conference for now. There's no need to rush into any alliance before we know more.", 5, 2151003);
		break;
	case 29:
		ms.sendNextPrevS("#h0#, here's our answer Go to Ereve and take it straight to Cygnus. I think you're the right person for this job.", 5, 2151003);
		break;
	case 30:
		ms.dispose();
		ms.gainItem(4033096, ms.getPlayer().itemQuantity(4033096) ? 0 : 1);
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(0));
		ms.getPlayer().changeMap(ms.getMap(310010000), ms.getMap(310010000).getPortal(0));
}
}