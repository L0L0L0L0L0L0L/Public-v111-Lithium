/*
	名字:	凡雷恩
	地圖:	見面室
	描述:	921110210
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
		cm.spawnNPCRequestController(2159336, 20, -300, 0);
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 3500));
		break;
	case 1:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 0));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 500));
		break;
	case 2:
		cm.sendNextS("Are you #h0#?", 1);
		break;
	case 3:
		cm.sendNextPrevS("#bLong time no see, Von Leon.", 3);
		break;
	case 4:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 5:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 0));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 500));
		break;
	case 6:
		cm.sendNextS("And what does the betrayer want with me?", 1);
		break;
	case 7:
		cm.sendNextPrevS("#bBetrayer? How quaint that you believe that The Black Mage betrayed me. My family is gone because of him...", 3);
		break;
	case 8:
		cm.sendNextPrevS("Indeed? if the Black Mage did such a thing, l am certain it was part of his grand plan. You were simply too blinded by anger to see.", 1);
		break;
	case 9:
		cm.sendNextPrevS("#bRidicuious!", 3);
		break;
	case 10:
		cm.sendNextPrevS("#bI'm surprised someone who offered their soul to the Black Mage after losing their own family would say that.", 3);
		break;
	case 11:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.NPCSpecialAction(2159336, 1, 3, 100));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 12:
		cm.sendNextS("Silence!", 1);
		break;
	case 13:
		cm.sendNextPrevS("#bYes, we've all be wronged. The difference is, the Black Mage already betrayed me. For you, the betrayal is yet to come, Von Leon.", 3);
		break;
	case 14:
		cm.sendNextPrevS("You have no idea what you speak of. Betrayal? 'What is left for me to lose? I LOST EVERYTHING!!", 1);
		break;
	case 15:
		cm.sendNextPrevS("I have nothing more to say to you. I've no interest in disloyalaty.", 1);
		break;
	case 16:
		cm.sendNextPrevS("#bFine. But let me ask you one last question. What happened to the other Commanders?", 3);
		break;
	case 17:
		cm.sendNextPrevS("... Temple of Time. Answer your own question there.", 1);
		break;
	case 18:
		cm.sendNextPrevS("Now, begonel lf l see you again, I WLL destroy you.", 1);
		break;
	case 19:
		cm.dispose();
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(0));
		cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23272)).setCustomData(1);
		cm.getPlayer().updateQuest(cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23272)), true);
		cm.getPlayer().changeMap(cm.getMap(211060000), cm.getMap(211060000).getPortal(4));
}
}