/*
    Name:    Phile
    Map:     Mine Entrance
    Description: 931000620
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
			if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
				cm.sendOk("......");
				cm.dispose();
				return;
			}
			cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(1));
			cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
			break;
		case 1:
			cm.sendNextS("Vita! Vita, wake up! Can you hear me?!", 3);
			break;
		case 2:
			cm.sendNextPrevS("(No matter how hard you shake her, she doesn't wake up.)", 1);
			break;
		case 3:
			cm.getPlayer().getMap().spawnNpc(2159349, new java.awt.Point(2160, 27));
			cm.sendNextPrevS("I told her to come as fast as she can, but what's with all the soldiers? What's going on?", 5, 2159349);
			break;
		case 4:
			cm.sendNextPrevS("My test subject made a friend? Fascinating!", 5, 2159349);
			break;
		case 5:
			cm.sendNextPrevS("...Gelimer! What did you do to Vita?!", 3);
			break;
		case 6:
			cm.sendNextPrevS("The creature has simply completed its mission, that's all. It's waiting for its next order.", 5, 2159349);
			break;
		case 7:
			cm.sendNextPrevS("Mission? Order? Don't talk about Vita like she's some kind of robot!", 3);
			break;
		case 8:
			cm.sendNextPrevS("Robot? No, she's not a robot. She's my test subject! My perfect, brainwashed slave!", 5, 2159349);
			break;
		case 9:
			cm.sendNextPrevS("(Vita's... brainwashed?)", 3);
			break;
		case 10:
			cm.sendNextPrevS("It was about time I gave her a check-up, so I ordered her to come home. I didn't realize she'd bring you with her... what a grand opportunity! I'd love to run all sorts of tests on you, but Hiver wouldn't have any of that, I know! Let's see just how good a friend little Vita has made!", 5, 2159349);
			break;
		case 11:
			cm.sendNextPrevS("What are you talking about?", 3);
			break;
		case 12:
			cm.sendNextPrevS("A simple task. If my test subject is so important to you, then you can have her... after this last experiment. Take the road behind the Mine to my lab, and you can keep Vita.", 5, 2159349);
			break;
		case 13:
			cm.sendNextPrevS("No! Let her go now!", 3);
			break;
		case 14:
			cm.sendNextPrevS("All in due time! Meet me at my laboratory. Oh, and do watch out for the Guard Robots on the way. They can be quite inhospitable... I suggest you bring some friends to help you out!", 5, 2159349);
			break;
		case 15:
			cm.sendNextPrevS("I'll be on my way. See you later!", 5, 2159349);
			break;
		case 16:
			cm.removeNpc(cm.getPlayer().getMap().getId(), cm.getNpc());
			cm.removeNpc(cm.getPlayer().getMap().getId(), 2159349);
			cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(0));
			var tick = 0;
			schedule = Packages.server.Timer.EtcTimer.getInstance().register(function () {
				if (tick == 1) {
					Packages.server.quest.MapleQuest.getInstance(23149).forceStart(cm.getPlayer(), 0, 1);
					schedule.cancel(true);
					cm.dispose();
					return;
				}
				tick++;
			}, 3000);
			break;
	}
}
