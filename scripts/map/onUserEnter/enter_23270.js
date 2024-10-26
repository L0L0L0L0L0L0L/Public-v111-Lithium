/*
	名字:	隱藏地圖
	地圖:	卡帕萊特協會1
	描述:	926150000
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
		ms.spawnNPCRequestController(2159324, 340, -10, 1);
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.setNPCSpecialAction(2159324, "spell"));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 1:
		ms.sendNextS("Now, give me the Forbidden Book of Alchemy. Slowly...", 5, 2159324);
		break;
	case 2:
		ms.sendNextPrevS("Give me the Forbidden Book of Alchemy...Give me the Forbidden Book of Alchemy...", 5, 2159320);
		break;
	case 3:
		ms.sendNextPrevS("#bWho are you?", 17);
		break;
	case 4:
		ms.getNPCDirectionEffect(2159324, "Effect/Direction6.img/effect/tuto/balloonMsg1/3", 1000, 0, -100);
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 5:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.NPCSpecialAction(2159324, -1, 50, 100));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 6:
		ms.sendNextS("Well, aren't you an unlucky soul? l would have spared you, if you had kept quiet!", 5, 2159324);
		break;
	case 7:
		ms.sendNextPrevS("#bWe'll see who's unlucky here.", 17);
		break;
	case 8:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.removeNPCController(2159324));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(0));
		ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300457), new java.awt.Point(260, 6));
		ms.dispose();
}
}