/*
	名字:	決心
	地圖:	詛咒的餘波
	描述:	詛咒的餘波
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
		qm.sendNextS("He's a crass tree, but maybe he has a point... Perhaps it's time I settle down.", 16);
		break;
	case 1:
		qm.sendNextPrevS("My battle with the Black Mage is ancient history. Nobody cares about what I did in the past.", 16);
		break;
	case 2:
		qm.sendNextPrevS("I lost all the power that I raised to protect Maple World... I can't even fight against #o210100#s. I am so weak like this...", 16);
		break;
	case 3:
		qm.sendNextPrevS("And I don't have my old friends to rely on anymore. I'm on my own here. What can I do on my own?", 16);
		break;
	case 4:
		qm.sendNextPrevS("But... But... I cannot give up like this!", 16);
		break;
	case 5:
		qm.sendNextPrevS("I'm the sovereign of the Elves! My people are still suffering the Black Mage's curse!", 16);
		break;
	case 6:
		qm.sendNextPrevS("#b...I will NEVER give up!", 16);
		break;
	case 7:
		qm.sendNextPrevS("If I can't give up, then there is only thing I can do. I may be weak, but I will get stronger. I may not have allies, but I will make them. Who cares if nobody remembers who I am? My only duty is to save my people! Once I get my original strength back, then I should be able to vanish the Curse of the Black Mage!", 16);
		break;
	case 8:
		qm.sendNextPrevS("If I keep training, step by step, I'll get my original strength back. It'll take a long time, but if I just do what I can now, eventually I WILL win. \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 2000 exp", 16);
		break;
	case 9:
		Packages.server.quest.MapleQuest.getInstance(24051).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(24051));
		qm.gainExp(2000);
		qm.dispose();
}
}