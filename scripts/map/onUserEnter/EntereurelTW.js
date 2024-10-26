/*
	名字:	精靈之林
	地圖:	櫻花處
	描述:	101050000
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
		if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(24008)).getStatus() != 1 || ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(24009)).getStatus() == 1) {
			ms.dispose();
			return;
			}
			ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(1));
			ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 1));
			ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
			break;
	case 1:
		ms.sendNextS("Elders?", 17);
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 0));
		break;
	case 2:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 2));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 3:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 0));
		ms.sendNextS("Children...", 17);
		break;
	case 4:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 500));
		break;
	case 5:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 0));
		ms.sendNextS("Everyone is still trapped in the ice...", 17);
		break;
	case 6:
		ms.dispose();
		Packages.server.quest.MapleQuest.getInstance(24009).forceStart(ms.getPlayer(), 0, 1);
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(0));
}
}