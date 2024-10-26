/*
	名字:	火藥士
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
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28757)).getStatus() > 0 || cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28748)).getStatus() < 1) {
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getPosition().x < 1200 || cm.getPlayer().getPosition().x > 1400 || cm.getPlayer().getPosition().y > -1000) {
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("The distance is too far... we need to get closer."));
			cm.dispose();
			return;
			}
			cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(1));
			cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
			break;
	case 1:
		cm.sendNextS("(l should light up that Gunpowder Mound while they aren't looking.)", 3);
		break;
	case 2:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 500));
		break;
	case 3:
		cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("Sabotage (Gunpowder Mound) complete"));
		Packages.server.quest.MapleQuest.getInstance(28757).forceStart(cm.getPlayer(), 0, null);
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 4:
		cm.sendNextS("Ha ha! This is going to be awesome!", 3);
		break;
	case 5:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg1/3", 0, 0, -100, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 6:
		cm.sendNextS("(Uh oh, the aliens are coming... I'd better hide!)", 3);
		break;
	case 7:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 3500));
		break;
	case 8:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 2));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 30));
		break;
	case 9:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 4));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 10:
		cm.spawnNPCRequestController(9201174, 1139, -1007, 1);
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 11:
		cm.getNPCDirectionEffect(9201174, "Effect/Direction6.img/effect/tuto/balloonMsg1/3", 1000, 0, -100);
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 12:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.removeNPCController(9201174));
		cm.spawnNPCRequestController(9201174, 1130, -1007, 0);
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 200));
		break;
	case 13:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.removeNPCController(9201174));
		cm.spawnNPCRequestController(9201174, 1139, -1007, 1);
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 200));
		break;
	case 14:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.removeNPCController(9201174));
		cm.spawnNPCRequestController(9201174, 1130, -1007, 0);
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 200));
		break;
	case 15:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.removeNPCController(9201174));
		cm.spawnNPCRequestController(9201174, 1139, -1007, 1);
		cm.getNPCDirectionEffect(9201174, "Effect/Direction6.img/effect/tuto/balloonMsg0/10", 1000, 0, -100);
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 200));
		break;
	case 16:
		cm.sendNextS("(W-what should l do?!)", 5, 9201174);
		break;
	case 17:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.removeNPCController(9201174));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 18:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 0));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 19:
		cm.sendNextS("Ha! In your weird, bulby faces, aliens!", 3);
		break;
	case 20:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(0));
		cm.dispose();
}
}