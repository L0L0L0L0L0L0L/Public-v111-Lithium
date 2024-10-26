/*
    Name:    Killer Whale
    Map:     Rest Area in Memories 3
    Description: 927000200
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
			cm.spawnNPCRequestController(2159323, 191, 176, 0);
			cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(1));
			cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 2));
			cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1500));
			break;
		case 1:
			cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 0));
			cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 500));
			break;
		case 2:
			cm.sendNextS("#h0#? Is that you, #h0#? Why are you here?", 1);
			break;
		case 3:
			cm.sendNextPrevS("That’s what I should be asking you!! #p2159323#, you’re still the same as before!", 3);
			break;
		case 4:
			cm.sendNextPrevS("Is that so? But you seem to have changed. We were both once commanders under the Black Mage, and now, they see you as a traitor. But to me, you are still you!", 1);
			break;
		case 5:
			cm.sendNextPrevS("Have you ever thought of coming back? The Black Mage still favors you. If you understand his intentions, you might understand!", 1);
			break;
		case 6:
			cm.sendNextPrevS("All I know is that he ruined everything I had. If I continued to serve him, I could never achieve anything. Never!!!", 3);
			break;
		case 7:
			cm.sendNextPrevS("Does that mean we will be enemies?", 1);
			break;
		case 8:
			cm.sendNextPrevS("Yes! As long as you continue to serve the Black Mage, you will always be my enemy.", 3);
			break;
		case 9:
			cm.sendNextPrevS("You are still so stubborn. In fact, emotions are your greatest enemy, making you irrational and completely losing yourself.", 1);
			break;
		case 10:
			cm.sendPrevS("You’re beyond reason now! No matter what I say, it’s useless. When you understand, please return to the Black Mage. I believe you will come back.", 1);
			break;
		case 11:
			cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.setNPCSpecialAction(2159323, "teleportation"));
			cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
			break;
		case 12:
			cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.removeNPCController(2159323));
			cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(0));
			var tick = 0;
			schedule = Packages.server.Timer.EtcTimer.getInstance().register(function () {
				if (tick == 1) {
					cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23273)).setCustomData(1);
					cm.getPlayer().updateQuest(cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23273)), true);
					schedule.cancel(true);
					cm.dispose();
					return;
				}
				tick++;
			}, 3000);
			break;
	}
}
