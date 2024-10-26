/*
	名字:	莫斯提馬
	地圖:	時間神殿迴廊1
	描述:	927000000
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
		cm.sendNextS("Commander! Where were you? I thought maybe Arkarium had actually made a move against you...", 1);
		break;
	case 1:
		cm.sendNextPrevS("Things are strange these days. Arkarium has it for you, since you were the one who managed to catch the Goddess of the Temple of Time. He only managed to blind her, but he still thinks he deserves all the credit...Fool.", 1);
		break;
	case 2:
		cm.sendNextPrevS("...Are you okay? You seem different... Yeah, you are. You used to scold me when I asked you such things, but now... Hey, you don't look so good. Did something happen? Are you hurt?", 1);
		break;
	case 3:
		cm.sendNextPrevS("...Tell me, #p2151009#. Who do you serve? Is it me, or the Black Mage?", 3);
		break;
	case 4:
		cm.sendNextPrevS("W-what? Why would you ask me such a?", 1);
		break;
	case 5:
		cm.sendNextPrevS("Answer me!", 3);
		break;
	case 6:
		cm.sendNextPrevS("Well... Um... I am loyal to the Black Mage, of course... But the day you saved my life, I pledged myself to you. I go where you go. Does, um, does that answer your question?", 1);
		break;
	case 7:
		cm.sendNextPrevS("Yes. I have a favor to ask of you, then.", 3);
		break;
	case 8:
		cm.sendNextPrevS("Give this letter to the #rHeroes#k.", 3);
		break;
	case 9:
		cm.sendNextPrevS("Do what?! Why... What are you thinking? After everything that's happened, you want to make things worse? If anyone finds out you're trying to contact the Heroes, you're finished as a Commander!", 1);
		break;
	case 10:
		cm.sendNextPrevS("I am already finished as a Commander.", 3);
		break;
	case 11:
		cm.sendNextPrevS("Wait... Are you betraying the Black Mage? But, you're the most loyal of his Commanders! You practically GAVE him the Temple of Time! We have everything... Why are you doing this?", 1);
		break;
	case 12:
		cm.sendNextPrevS("There's no time to explain! If you are truly loyal to me, you will do as I ask. If not...", 3);
		break;
	case 13:
		cm.sendNextPrevS("No! No... I'll do it. I'm just...worried about you.", 1);
		break;
	case 14:
		cm.sendNextPrevS("......", 3);
		break;
	case 15:
		cm.sendNextPrevS("I mean, what about your family? Won't they be in dan?", 1);
		break;
	case 16:
		cm.sendNextPrevS("SILENCE! Do not say another word about my family...", 3);
		break;
	case 17:
		cm.sendNextPrevS("...What? Did... Did something happen to them already...?", 1);
		break;
	case 18:
		cm.sendNextPrevS("......", 3);
		break;
	case 19:
		cm.sendNextPrevS("I see... You've always been the quiet type, but silence sometimes speaks for itself.", 1);
		break;
	case 20:
		cm.sendNextPrevS("Very well. I swear to you, on my very life, that I will deliver this letter to the Heroes.", 1);
		break;
	case 21:
		cm.sendNextPrevS("Thank you. I am sorry to ask such a thing of you, #p2151009#...", 3);
		break;
	case 22:
		cm.sendNextPrevS("Don't be sorry. I owe you my life, after all. In fact, I...I really appreciate your trust.", 1);
		break;
	case 23:
		cm.sendNextPrevS("Okay...I'm going. Whatever it is you're doing...good luck.", 1);
		break;
	case 24:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.setNPCSpecialAction(2159307, "teleportation"));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1200));
		break;
	case 25:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.removeNPCController(2159307));
		cm.sendNextS("(Your loyalty means so much to me, #p2151009#. Thank you.)", 3);
		break;
	case 26:
		cm.dispose();
		cm.getPlayer().changeMap(cm.getMap(927000080), cm.getMap(927000080).getPortal(0));
}
}