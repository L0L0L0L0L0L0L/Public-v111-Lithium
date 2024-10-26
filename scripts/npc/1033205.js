/*
	名字:	櫻花處入口
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
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 1:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction5.img/effect/mercedesQuest/merBalloon/0", 2000, 0, -100, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 2500));
		break;
	case 2:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction5.img/effect/mercedesQuest/merBalloon/1", 2000, 0, -100, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 2500));
		break;
	case 3:
		cm.sendNextS("Wait... Something doesn't feel right...about...my level?", 17);
		break;
	case 4:
		cm.sendNextPrevS("Level... 10?", 17);
		break;
	case 5:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(0));
		var tick = 0;
		schedule = Packages.server.Timer.EtcTimer.getInstance().register(function () {
		if (tick == 1) {
			Packages.server.quest.MapleQuest.getInstance(24093).forceStart(cm.getPlayer(), 0, 1);
			schedule.cancel(true);
			cm.dispose();
			return;
			}
			tick++;
		}, 3000);
}
}