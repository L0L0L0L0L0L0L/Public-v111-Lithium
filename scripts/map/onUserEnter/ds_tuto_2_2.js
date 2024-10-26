/*
	名字:	隱藏地圖
	地圖:	黑色魔法師的房前迴廊2
	描述:	927000070
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
		ms.spawnNPCRequestController(2159309, 500, 50, 0);
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 2));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 30));
		break;
	case 1:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 0));
		ms.sendNextS("You are rather powerful, aren't you? I think it's time we settled which of us is stronger. I've always wanted to test my magic against your Demon Fury. Of course, I know who will be victorious!", 5, 2159309);
		break;
	case 2:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg1/9", 2000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Skill/3112.img/skill/31121000/effect", 2000, 321, 83, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("demonSlayer/31121000", 4));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(0, 374));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 3:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("demonSlayer/31121000h", 4));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.setNPCSpecialAction(2159309, "teleportation"));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 570));
		break;
	case 4:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.removeNPCController(2159309));
		ms.spawnNPCRequestController(2159309, 620, 50, 0);
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.setNPCSpecialAction(2159309, "summon"));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 5:
		ms.sendNextS("You're stronger than I expected! How amusing!", 5, 2159309);
		break;
	case 6:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.setNPCSpecialAction(2159309, "resolve"));
		ms.getNPCDirectionEffect(2159309, "Effect/Direction6.img/effect/tuto/balloonMsg1/10", 2000, 0, -160);
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1500));
		break;
	case 7:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg1/11", 2000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1500));
		break;
	case 8:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Skill/3112.img/skill/31121005/effect", 2000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Skill/3112.img/skill/31121005/effect0", 2000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("demonSlayer/31121005", 4));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(0, 364));//角色效果
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 9:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/gateOpen/0", 2100, 918, -195, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/gateLight/0", 2100, 926, -390, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/gateStair/0", 2100, 879, 30, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("demonSlayer/openGate", 4));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 10:
		Packages.server.quest.MapleQuest.getInstance(23203).forceStart(ms.getPlayer(), 0, null);//打開門的效果
		ms.getNPCDirectionEffect(2159309, "Effect/Direction6.img/effect/tuto/balloonMsg0/0", 2000, 0, -150);
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1200));
		break;
	case 11:
		ms.sendNextS("Ah! It seems the Black Mage wishes to see you after all. It's a shame we cannot finish our little contest, but as always, I defer to my master. I believe I'll pay those so-called 'Heroes' a visit...", 5, 2159309);
		break;
	case 12:
		ms.sendNextPrevS("As for you, #h0# I don't expect I'll see you again. Enjoy the oblivion granted to you from the Black Mage himself! Ha ha ha!", 5, 2159309);
		break;
	case 13:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.setNPCSpecialAction(2159309, "teleportation"));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 570));
		break;
	case 14:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.removeNPCController(2159309));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg2/2", 2000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 2));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 15:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("demonSlayer/whiteOut", 3));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 16:
		ms.dispose();
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(0));
		ms.getPlayer().changeMap(ms.getMap(931050300), ms.getMap(931050300).getPortal(0));
}
}