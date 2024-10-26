/*
	名字:	人質
	地圖:	克蘭卡叢林盆地
	描述:	600010200
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
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28763)).getStatus() > 0 || cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28749)).getStatus() < 1) {
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getPosition().x > 300 || cm.getPlayer().getPosition().y > -1091) {
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("The distance is too far... we need to get closer."));
			cm.dispose();
			return;
			}
			cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(1));
			cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
			break;
	case 1:
		cm.sendNextS("Help! I yelled at some aliens about digging without a permit and they nabbed me! I don't deserve this!", 1);
		break;
	case 2:
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("(Press the Ctrl key rapidly to break the lock)"));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/guide1/0", 5000, 0, -200, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 3:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("cannonshooter/fire", 4));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(0, 352));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 4:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("cannonshooter/fire", 4));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(0, 352));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 5:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("cannonshooter/fire", 4));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(0, 352));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 6:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("cannonshooter/fire", 4));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(0, 352));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 7:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 8:
		cm.sendNextS("(The lock popped off with a couple of good whacks.)", 3);
		break;
	case 9:
		cm.sendNextPrevS("Take this Return Scroll and get back to NLC!", 3);
		break;
	case 10:
		cm.sendNextPrevS("You saved me! I'll never yell at an alien about digging a hole again!", 1);
		break;
	case 11:
		nun = 4 - (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28762)).getStatus() + cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28763)).getStatus() + cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28764)).getStatus() + cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28765)).getStatus() + cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28766)).getStatus());
		cm.sendNextPrevS(nun != 0 ? "Onlly " + nun + " more to go." : "The townspeople are safe. Time to go talk to the mayor.", 3);
		break;
	case 12:
		if (nun != 0) {
			Packages.server.quest.MapleQuest.getInstance(28763).forceStart(cm.getPlayer(), 0, null);
			cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(0));
			cm.dispose();
			return;
			}
			cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg1/3", 1000, 0, -100, 1));
			cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 2));
			cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 10));
			break;
	case 13:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 0));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction.img/effect/NLC/alien2/0", 600000, 200, 0, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction.img/effect/NLC/alien2/0", 600000, 230, 0, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction.img/effect/NLC/alien2/0", 600000, 260, 0, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction.img/effect/NLC/alien2/0", 600000, 290, 0, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction.img/effect/NLC/alien2/0", 600000, 330, 0, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction.img/effect/NLC/alien2/0", 600000, 360, 0, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction.img/effect/NLC/alien2/0", 600000, 390, 0, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction.img/effect/NLC/alien2/0", 600000, 420, 0, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg0/10", 2000, 200, -100, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 14:
		cm.sendNextS("You! You're the one messing with our mining operation!", 5, 9201174);
		break;
	case 15:
		cm.sendNextPrevS("Get out of here, you space jerks--is what l would say if there weren't a whole bunch of you...Hello, aliens, how's it goin?", 3);
		break;
	case 16:
		cm.sendNextPrevS("The aliens have us surrounded!", 1);
		break;
	case 17:
		cm.sendNextPrevS("There's no choice! Use the Return Scroll l gave you and get back to town!", 3);
		break;
	case 18:
		cm.sendNextPrevS("B-but what about you?!", 1);
		break;
	case 19:
		cm.sendNextPrevS("l can totally beat up a bunch of wimpy aliens!", 3);
		break;
	case 20:
		cm.sendNextPrevS("The Mapling is ours now! Lock it up until we can use the brainwasher on it!", 5, 9201174);
		break;
	case 21:
		cm.sendNextPrevS("Yes, sir! I love the brainwasher!", 5, 9201174);
		break;
	case 22:
		cm.sendNextPrevS("No! My brain doesn't need washing! It's totally clean, I promise!", 3);
		break;
	case 23:
		cm.sendNextPrevS("It's never clean enough! Knock this stinky beast out!", 5, 9201174);
		break;
	case 24:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("demonSlayer/whiteOut", 3));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/BasicEff.img/CannonJump", 0, 0, -50, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 300));
		break;
	case 25:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction4.img/cannonshooter/face00"));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 4));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 26:
		cm.dispose();
		Packages.server.quest.MapleQuest.getInstance(28763).forceStart(cm.getPlayer(), 0, null);
		Packages.server.quest.MapleQuest.getInstance(28749).forceComplete(cm.getPlayer(), 0);
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(0));
		cm.getPlayer().changeMap(cm.getMap(610040500), cm.getMap(610040500).getPortal(0));
}
}