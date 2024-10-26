/*
	名字:	傑利麥勒
	地圖:	傑利麥勒實驗室入口
	描述:	931000650
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
			cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 1));
			cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 2000));
			break;
		case 1:
			cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 0));
			cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
			break;
		case 2:
			cm.sendNextS("Where to begin? Here or there? Huh, I hear someone's voice... Who's there?", 3);
			break;
		case 3:
			cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 2));
			cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 4000));
			break;
		case 4:
			cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 0));
			cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 100));
			break;
		case 5:
			cm.sendNextS("(Isn't that Gelimer? But who's that next to him? It's hard to see anything from here. Just listen for now.)", 3);
			break;
		case 6:
			cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 2));
			cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1200));
			break;
		case 7:
			cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 0));
			cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 100));
			break;
		case 8:
			cm.sendNextS("Really, there's no need for you to check up on us in person! I assure you, my research will be completed any day now...", 1);
			break;
		case 9:
			cm.sendNextPrevS("That's what you told me last week! Arkarium's plans are well underway. We can't let him beat Lotus and me. You said you were only waiting for Vita to finish her mission!", 5, 1033230);
			break;
		case 10:
			cm.sendNextPrevS("(Vita...!)", 3);
			break;
		case 11:
			cm.sendNextPrevS("Lady Orchid, there were some... complications. It's not easy creating a creature as powerful as what you're asking for. But don't worry. I'll have it for you any day now!", 1);
			break;
		case 12:
			cm.sendNextPrevS("For your sake, I hope you're right. This is the reason I even formed the Black Wings in the first place. So you'd better get it done!", 5, 1033230);
			break;
		case 13:
			cm.sendNextPrevS("(She formed the Black Wings?!)", 3);
			break;
		case 14:
			cm.sendNextPrevS("R-really? This is why you formed the Black Wings?", 1);
			break;
		case 15:
			cm.sendNextPrevS("Do you know how many years I've wasted putting all the pieces of this stupid puzzle together? You're nothing but a blind old codger.", 5, 1033230);
			break;
		case 16:
			cm.sendNextPrevS("If you've spent so many years, then a few more days won't make a difference! Once I'm done, you'll have all the power you could want. It will be more powerful than you and Lotus combined!", 1);
			break;
		case 17:
			cm.sendNextPrevS("(What kind of creature are they trying to create? Maybe some kind of mutant mega-pig...?)", 3);
			break;
		case 18:
			cm.sendNextPrevS("Did you hear something?", 5, 1033230);
			break;
		case 19:
			cm.sendNextPrevS("Hear what? I don't know what you're talking about. I didn't hear a thing.", 1);
			break;
		case 20:
			cm.sendNextPrevS("Look alive, old man! If you can't deal with trespassers in your labs, I'll have to cage you up and ship you off to El Nath like I did to your cat.", 5, 1033230);
			break;
		case 21:
			cm.sendNextPrevS("(Time to bail!)", 3);
			break;
		case 22:
			cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(0));
			cm.getPlayer().changeMap(cm.getMap(310040210), cm.getMap(310040210).getPortal(2));
			var tick = 0;
			schedule = Packages.server.Timer.EtcTimer.getInstance().register(function () {
				if (tick == 1) {
					Packages.server.quest.MapleQuest.getInstance(23150).forceStart(cm.getPlayer(), 0, 1);
					schedule.cancel(true);
					cm.dispose();
					return;
				}
				tick++;
			}, 3000);
			break;
	}
}
