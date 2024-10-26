/*
	名字:	詛咒的餘波
	地圖:	精靈遊俠
	描述:	精靈遊俠
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
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
		qm.sendNextS("Calm down, Mercedes! I just have to think. Okay, let's run down what's going on...", 17);
		break;
	case 1:
		qm.sendNextS("1. The rest of the Elves are still frozen, so the Black Mage's curse is still in place.", 17);
		break;
	case 2:
		qm.sendNextPrevS("2. I'm the only one who's woken up. I don't know why, but I get this feeling... Could the Black Mage's seal be weakening?", 17);
		break;
	case 3:
		qm.sendNextPrevS("3. I want to go outside and check on Maple World, but I'm only level 10. No, I still can't believe it... I can't be level 10!", 17);
		break;
	case 4:
		qm.sendNextPrevS("Brr! I don't know how long I've been asleep, but I'm freezing to death! Just how powerful was that curse?", 17);
		break;
	case 5:
		qm.sendNextPrevS("Okay, so I was injured when I was cursed, and I may have been in the ice for decades. I guess it makes sense that I'd be weaker. But...it's not fair! I'm the ruler of the Elves! I can't be level 10!!", 17);
		break;
	case 6:
		qm.sendNextPrevS("Right, hold it together, hold it together... I need to make sure there's not anything wrong with me.", 17);
		break;
	case 7:
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(1));
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(0, 5));
		Packages.server.quest.MapleQuest.getInstance(24041).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.sendNextPrevS("Left arm works...", 17);
		break;
	case 8:
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(0, 9));
		qm.sendNextPrevS("No problem with my right arm.", 17);
		break;
	case 9:
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(0, 15));
		qm.sendNextPrevS("Legs are fine, too.", 17);
		break;
	case 10:
		qm.sendNextPrevS("And my wounds are all healed. I guess my level was the only thing affected...", 17);
		break;
	case 11:
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(0));
		qm.dispose();
}
}