/*
	名字:	殺人鯨
	地圖:	回憶中的休息處3
	描述:	927000200
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
		cm.spawnNPCRequestController(2159323, 191, 176, 0);
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 2));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1500));
		break;
	case 1:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 0));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 500));
		break;
	case 2:
		cm.sendNextS("#h0#？是#h0#嗎？你為什麼會來這裡？", 1);
		break;
	case 3:
		cm.sendNextPrevS("這句話應該是我問你才對！！#p2159323#，你還是和從前一樣！", 3);
		break;
	case 4:
		cm.sendNextPrevS("是嗎？不過你好像變了，之前我們同屬於黑魔法師的軍團長，而現在，他們都把你當作叛徒，但是在我眼裡，你依然還是你！", 1);
		break;
	case 5:
		cm.sendNextPrevS("有想過在回來嗎？黑魔法師大人還是很偏愛你的，如果你能明白他的想法，或許你會理解的！", 1);
		break;
	case 6:
		cm.sendNextPrevS("我只知道，他毀了我的一切，如果我在繼續為他效忠的話，我是永遠做不到的，永遠都是！！！", 3);
		break;
	case 7:
		cm.sendNextPrevS("那我們都會是敵人嗎？", 1);
		break;
	case 8:
		cm.sendNextPrevS("是的！只要你還在為黑魔法師效力，也永遠都會是我的敵人。", 3);
		break;
	case 9:
		cm.sendNextPrevS("你還是這樣的固執，其實情感才是你最大的敵人，讓你變得失去理智，完全喪失自我。", 1);
		break;
	case 10:
		cm.sendPrevS("現在的你！和你說再多也沒用，當你想明白的時候，請再次回到黑魔法師身邊，我相信你一定會回來的。", 1);
		break;
	case 11:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.setNPCSpecialAction(2159323, "teleportation"));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 12:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.removeNPCController(2159323));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(0));
		var tick = 0;
		schedule = Packages.server.Timer.EtcTimer.getInstance().register(function () {
		if (tick == 1) {
			cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23273)).setCustomData(1);
			cm.getPlayer().updateQuest(cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23273)), true);
			schedule.cancel(true);
			cm.dispose();
			return;
			}
			tick++;
		}, 3000);
}
}