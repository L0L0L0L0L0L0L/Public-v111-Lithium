/*
	名字:	戲劇性逃逸
	地圖:	外星人基地走廊
	描述:	610040010
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status < 1) {
		qm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		qm.sendAcceptDecline("(Beep) Hello, flesh-beast. Mount complete. Moving systems initialized.");
		break;
	case 1:
		qm.useItem(2210065);
		qm.getPlayer().getMap().hideNpc(9201176);
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(1));
		qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28753)).setStatus(1);
		qm.getPlayer().updateQuest(qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(28753)), true);
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 2:
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 2));
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 3:
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 0));
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 20));
		break;
	case 4:
		qm.sendNextS("Stop right there!", 5, 9201174);
		break;
	case 5:
		qm.sendNextPrevS("Huh? What was that?", 3);
		break;
	case 6:
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 7:
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 1));
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 30));
		break;
	case 8:
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 0));
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction.img/effect/NLC/alien2/0", 600000, -200, 0, 1));
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction.img/effect/NLC/alien2/0", 600000, -250, 0, 1));
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction.img/effect/NLC/alien2/0", 600000, -300, 0, 1));
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction.img/effect/NLC/alien2/0", 600000, -350, 0, 1));
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction.img/effect/NLC/alien2/0", 600000, -400, 0, 1));
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction.img/effect/NLC/alien2/0", 600000, -450, 0, 1));
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction.img/effect/NLC/alien2/0", 600000, -500, 0, 1));
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction.img/effect/NLC/alien2/0", 600000, -550, 0, 1));
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg1/3", 2000, 0, -100, 1));
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 3000));
		break;
	case 9:
		qm.sendNextS("Aliens are all over the place! I've got to get away!!", 3);
		break;
	case 10:
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 11:
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 2));
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 3000));
		break;
	case 12:
		qm.dispose();
		qm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(0));
		qm.getPlayer().changeMap(qm.getMap(610040600), qm.getMap(610040600).getPortal(0));
}
}