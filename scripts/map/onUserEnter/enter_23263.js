/*
	名字:	隱藏地圖
	地圖:	艾德斯塔公園噴水台附近3
	描述:	931050210
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
		ms.spawnNPCRequestController(2153006, 638, -24, 0);
		ms.sendNextS("This seems to be a laser gun with increased power... Hmm... I'm not sure either.", 5, 2153006);
		break;
	case 1:
		ms.sendNextPrevS("It seems to have been completed, so I'll launch and take a look.", 5, 2153006);
		break;
	case 2:
		ms.getNPCDirectionEffect(2153006, "Effect/Summon.img/6", 800, 0, 0);
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 800));
		break;
	case 3:
		ms.sendNextS("#b(No matter what I think, I don't think that's a good idea...)", 17);
		break;
	case 4:
		ms.sendNextPrevS("Aa...", 5, 2153006);
		break;
	case 5:
		ms.sendNextPrevS("!! (fainting)... Cheer up!!", 17);
		break;
	case 6:
		ms.sendNextPrevS("Wuwu... Did me succeed?", 5, 2153006);
		break;
	case 7:
		ms.sendNextPrevS("Don't say it was successful, you lost consciousness after being hit by light.", 17);
		break;
	case 8:
		ms.sendNextPrevS("Ah... did you fail... but I won't give up on it!", 5, 2153006);
		break;
	case 9:
		ms.dispose();
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(0));
		ms.getPlayer().changeMap(ms.getMap(310010000), ms.getMap(310010000).getPortal(0));
}
}