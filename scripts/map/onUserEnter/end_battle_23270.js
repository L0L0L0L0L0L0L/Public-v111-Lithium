/*
	名字:	隱藏地圖
	地圖:	卡帕萊特協會1
	描述:	926150010
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
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
		ms.spawnNPCRequestController(2159320, 430, -10, 0);
		ms.spawnNPCRequestController(2159324, -180, -10, 1);
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 1:
		ms.sendNextS("Ugh...Strong...", 5, 2159324);
		break;
	case 2:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.NPCSpecialAction(2159324, -1, 50, 100));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 3:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.removeNPCController(2159324));
		ms.sendNextS("#b(He got away, but he's hurt. He couldn't have gotten far, so l should get the book first.)", 17);
		break;
	case 4:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 2));
		ms.sendNextPrevS("Book of Alchemy... I'll give you...Book of Alchemy...", 5, 2159320);
		break;
	case 5:
		ms.sendNextPrevS("#bWake up, baldy!", 17);
		break;
	case 6:
		ms.sendNextPrevS("Baldy? Heh...it's funny...cause it's true...", 5, 2159320);
		break;
	case 7:
		ms.sendNextPrevS("Hey, don't make fun of my baldness!", 5, 2159320);
		break;
	case 8:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg0/10", 2000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 9:
		ms.sendNextS("#bWake up, baldy! What happened to the Forbidden Book of Alchemy??", 17);
		break;
	case 10:
		ms.spawnNPCRequestController(2159319, -270, -10, 1);
		ms.sendNextPrevS("#p2159321#! Wake up!", 5, 2159319);
		break;
	case 11:
		ms.dispose();
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(0));
		ms.getPlayer().changeMap(ms.getMap(926150020), ms.getMap(926150020).getPortal(0));
		Packages.server.quest.MapleQuest.getInstance(23276).forceStart(ms.getPlayer(), 0, 1);
}
}