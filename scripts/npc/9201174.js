/*
	名字:	人質
	地圖:	叢林山谷
	描述:	600010300
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
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 1:
		cm.sendNextS("Help!", 5, 9201172);
		break;
	case 2:
		cm.sendNextPrevS("Help you do what? I'm not moving any couches!", 3);
		break;
	case 3:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 500));
		break;
	case 4:
		cm.spawnNPCRequestController(9201174, 43, -611, 0);
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 2));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 5000));
		break;
	case 5:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 2));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg1/3", 0, 0, -100, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 6:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 0));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 7:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 4));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 8:
		cm.sendNextS("Mwahaha! You found our base, little Mapling, now you are going to be our slave ...FOR LIFE!", 1);
		break;
	case 9:
		cm.sendNextPrevS("Can anybody hear me? Please help!", 5, 9201172);
		break;
	case 10:
		cm.sendNextPrevS("Foolish, large-headed creature! You will never escape!", 1);
		break;
	case 11:
		cm.sendNextPrevS("On, jeez. The aliens are trying to keep themselves secret by kidnapping people! Either that, or they're HUNGRY!", 3);
		break;
	case 12:
		cm.sendNextPrevS("(l have to go tell #b#p9201050##k before all the people of his town get turned into slaves, or stew, or slave stew!)", 3);
		break;
	case 13:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.removeNPCController(9201174));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 14:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(0));
		cm.getPlayer().changeMap(cm.getMap(600000000), cm.getMap(600000000).getPortal(8));
		cm.dispose();
}
}