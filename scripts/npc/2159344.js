/*
	名字:	J
	地圖:	治療室
	描述:	931050030
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
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(1));
		cm.sendNextS("Hmm...", 3);
		break;
	case 1:
		cm.sendNextPrevS("(Where am I? I don't recognize this place... It's not the cave I was in before... Ugh, everything hurts.)", 3);
		break;
	case 2:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 600));
		break;
	case 3:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 0));
		cm.sendNextS("(This looks like a Treatment Room... Where am I? What happened to me?)", 3);
		break;
	case 4:
		cm.sendNextS("(I must remember what happened...)", 3);
		break;
	case 5:
		cm.sendNextPrevS("(The Black Mage broke his promise and destroyed the southern part of Ossyria, where my mother and Damien were. He destroyed my home...)", 3);
		break;
	case 6:
		cm.sendNextPrevS("(My locket! Where is my locket?)", 3);
		break;
	case 7:
		cm.sendNextPrevS("(Did I lose it during the fight? That was all I have left from my family... No...)", 3);
		break;
	case 8:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 2));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 600));
		break;
	case 9:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 0));
		cm.sendNextS("(I went to the Temple of Time to take revenge on the Black Mage... On the way, I let #p2151009# go, to get away from the Commanders. #p2159309# tried to stop me, but I was determined... Say, I wonder how the Heroes did?)", 3);
		break;
	case 10:
		cm.sendNextPrevS("(The Black Mage was too powerful for me. I knew he would be, but I thought I could do at least a little damage. All I managed was breaking his barrier and tearing his robe... How pathetic.)", 3);
		break;
	case 11:
		cm.sendNextPrevS("(But... How did I survive? The Black Mage would never have spared me. Did someone else get involved? The Heroes...?)", 3);
		break;
	case 12:
		cm.sendNextPrevS("(Ugh, now I have a headache. I don't even know where I am now. This place is so strange. And yet...does this mean Maple World wasn't destroyed?)", 3);
		break;
	case 13:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 600));
		break;
	case 14:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 0));
		cm.sendNextS("(I should check on myself. I'm going to need my Demon Fury no matter what... But how much is left?)", 3);
		break;
	case 15:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg0/13", 1000, 0, -100, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1500));
		break;
	case 16:
		cm.sendNextS("(No! My Demon Aegis is so weak...I've never seen it this bad. Almost all of my power and abilities are gone. How could this happen?)", 3);
		break;
	case 17:
		cm.sendNextPrevS("(I can't hardly fight like this. That man with the hat... He doesn't look dangerous, but I can't trust anyone.)", 3);
		break;
	case 18:
		cm.sendNextPrevS("(It's going to take time to build my power back up, and sitting here won't accomplish anything. I need to go.)", 3);
		break;
	case 19:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 3000));
		break;
	case 20:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg1/3", 2000, 0, -100, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 0));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 21:
		cm.sendNextS("(I hear something...)", 3);
		break;
	case 22:
		cm.sendNextPrevS("...I was going to come back after I discovered the Energy Conducting Device. It was like the one at the Power Plant, but this one was connected to an egg. While I was examining it, that person broke out of the egg, and defeated all the Black Wings. It was crazy.", 1);
		break;
	case 23:
		cm.sendNextPrevS("You know, J... If it were anyone else telling me this, I would laugh in their face. But this... What were the Black Wings doing? And who is this person?", 5, 2159315);
		break;
	case 24:
		cm.sendNextPrevS("(Are they talking about me?)", 3);
		break;
	case 25:
		cm.sendNextPrevS("And those skills... I've never seen skills like that. So powerful... I think our guest is out of juice, but we should be careful.", 1);
		break;
	case 26:
		cm.sendNextPrevS("Maybe this is one of their experiments? Think about Vita... And nobody really knows what the Black Wings are doing deep in the mines, right?", 5, 2159312);
		break;
	case 27:
		cm.sendNextPrevS("That blasted madman Gelimer... We have to stop him!", 5, 2159314);
		break;
	case 28:
		cm.sendNextPrevS("...Hold on. I'll see if our new friend is awake yet.", 1);
		break;
	case 29:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 2));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 30:
		cm.spawnNPCRequestController(2159344, -600, -20, 0);
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 1));	
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 30));
		break;
	case 31:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 0));
		cm.getNPCDirectionEffect(2159344, "Effect/Direction6.img/effect/tuto/balloonMsg1/3", 1500, 0, -100);
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 32:
		cm.sendNextS("Ah, you're awake. How do you feel? Still tired?", 1);
		break;
	case 33:
		cm.sendNextPrevS("Did...you save me?", 3);
		break;
	case 34:
		cm.sendNextPrevS("Yeah. You were badly wounded... I couldn't just leave you with the Black Wings. Considering the circumstances, I think we're on the same side. We have plenty to talk about, so how about you take a walk with me?", 1);
		break;
	case 35:
		cm.sendNextPrevS("(Interrogation...? Not sure yet... They're friendlier than those Black Wings, anyway.) Very well.", 3);
		break;
	case 36:
		cm.dispose();
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.removeNPCController(2159344));
		cm.getPlayer().changeMap(cm.getMap(931050010), cm.getMap(931050010).getPortal(0));
}
}