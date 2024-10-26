/*
	名字:	隐藏地图
	地圖:	艾德斯塔公園噴水台附近5
	描述:	931050212
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case - 1:
		ms.dispose();
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
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(1));
		ms.spawnNPCRequestController(2153006, 630, -25, 0);
		ms.sendNextS("l will now open the Hourglass, sprinkle the sand, and chant the spell.", 5, 2153006);
		break;
	case 1:
		ms.getNPCDirectionEffect(2153006, "Effect/Direction6.img/effect/story/balloonMsg0/2", 2000, 0, -100);
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 2:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.removeNPCController(2153006));
		ms.spawnNPCRequestController(2159334, 630, -25, 0);
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.setNPCSpecialAction(2159334, "summon"));
		ms.getNPCDirectionEffect(2159334, "Effect/Summon.img/6", 800, 0, 0);
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 800));
		break;
	case 3:
		ms.sendNextS("I... turned into myself this time, right?", 5, 2159334);
		break;
	case 4:
		ms.sendNextPrevS("#bCongratulations. l think it worked.", 17);
		break;
	case 5:
		ms.sendNextPrevS("F-finally...FINALLY! I'm me again! Ha HA!", 5, 2159334);
		break;
	case 6:
		ms.sendNextPrevS("#bThis reminds me of the old days.", 17);
		break;
	case 7:
		ms.sendNextPrevS("#h0#...l've wanted to tell you this for a long time...", 5, 2159334);
		break;
	case 8:
		ms.sendNextPrevS("To be honest, #h0#... I've wanted to tell you this since that day you saved me...", 5, 2159334);
		break;
	case 9:
		ms.sendNextPrevS("?", 17);
		break;
	case 9:
		ms.sendNextPrevS("#h0#...I love...", 5, 2159334);
		break;
	case 10:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.removeNPCController(2159334));
		ms.spawnNPCRequestController(2153006, 630, -25, 0);
		ms.getNPCDirectionEffect(2153006, "Effect/Summon.img/6", 800, 0, 0);
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 800));
		break;
	case 9:
		ms.sendNextS("?", 17);
		break;
	case 12:
		ms.sendNextPrevS("#bHuh. You changed back. Oh, sorry. Please continue.", 17);
		break;
	case 13:
		ms.getNPCDirectionEffect(2153006, "Effect/Direction6.img/effect/tuto/balloonMsg0/10", 2000, 0, -100);
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 14:
		ms.sendNextS("W-what? Oh.Um... l was saying...that l love...fighting withthe good guys! Yeah, that. No more evil for me.", 5, 2153006);
		break;
	case 15:
		ms.sendNextPrevS("#bAgreed. Fighting against the Black Mage has given me a new appreciation for this world. I think we're doing the right thing.", 17);
		break;
	case 16:
		ms.sendNextPrevS("Yep... I guess we should get back... Today's experiment was a success. It just didn't last long enough...", 5, 2153006);
		break;
	case 17:
		ms.dispose();
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(0));
		ms.getPlayer().changeMap(ms.getMap(310010000), ms.getMap(310010000).getPortal(0));
}
}