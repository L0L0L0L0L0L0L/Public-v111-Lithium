/*
	名字:	首領
	地圖:	沙漠的角落1
	描述:	926030000
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
		cm.spawnNPCRequestController(2159324, 500, 260, 1);
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 2));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 700));
		break;
	case 1:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg1/3", 2000, 0, -100, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1500));
		break;
	case 2:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 0));
		cm.sendNextS("There were...complications, but I got the half of the book.", 5, 2159324);
		break;
	case 3:
		cm.sendNextPrevS("#b(I can't really hear what he's saying.)", 3);
		break;
	case 4:
		cm.sendNextPrevS("Good job. Except for the fact that you were followed!", 1);
		break;
	case 5:
		cm.sendNextPrevS("#b(Did they see me?)", 3);
		break;
	case 6:
		cm.sendNextPrevS("Show yourself!", 1);
		break;
	case 7:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.NPCSpecialAction(2159324, -1, 2, 100));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 2));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1400));
		break;
	case 8:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 0));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 100));
		break;
	case 9:
		cm.sendNextS("He's the complication...and he's strong. Watch out!", 5, 2159324);
		break;
	case 10:
		cm.sendNextPrevS("#bl guess you were going to escape through that portal. Change of plans, then. Give me the book, before I get angry.", 3);
		break;
	case 11:
		cm.sendNextPrevS("No way! You have no idea how important this is!", 1);
		break;
	case 12:
		cm.sendNextPrevS("#bWrong answer. You're starting to upset me...", 3);
		break;
	case 13:
		cm.sendNextPrevS("No, please! If we fail to deliver this to Arkarium, we 're toasted! Being a henchman is really tough some days!", 5, 2159325);
		break;
	case 14:
		cm.sendNextPrevS("#bArkarium? Are you working for the Black Mage? What does Arkarium want with the Forbidden Book of Alchemy?", 3);
		break;
	case 15:
		cm.sendNextPrevS("Why would l tell you that?", 5, 2159324);
		break;
	case 16:
		cm.sendNextPrevS("#bHmm...Arkarium always used cowardly tatics to get what he wanted. He's a coward, and so are you!", 3);
		break;
	case 17:
		cm.sendNextPrevS("Don't insult Arkariuml He's not indecisive, like von Leon! Besides, this originally belonged to the great master!", 1);
		break;
	case 18:
		cm.sendNextPrevS("Yeah! And with this, we can destroy all of the Seal Stones and revive our master!", 5, 2159324);
		break;
	case 19:
		cm.sendNextPrevS("Keep you mouth shut, you fool! Well...you've heard too much now. We'll have to do away with you!", 1);
		break;
	case 20:
		cm.dispose();
		cm.getMap(926030010).resetFully();
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(0));
		cm.getPlayer().changeMap(cm.getMap(926030010), cm.getMap(926030010).getPortal(0));
}
}