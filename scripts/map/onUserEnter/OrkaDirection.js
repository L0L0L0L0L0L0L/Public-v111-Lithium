/*
	名字:	隱藏地圖
	地圖:	殺人鯨的房間
	描述:	931040011
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
		if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(24091)).getStatus() == 2) {
			ms.dispose();
			return;
			}
		if (ms.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(24091)).getStatus() == 1) {
			ms.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300435), new java.awt.Point(716, 5));
			ms.dispose();
			return;
			}
			ms.getPlayer().getMap().spawnNpc(1033230, new java.awt.Point(716, 5));
			ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(1));
			ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
			break;
	case 1:
		ms.sendNextS("There's a room here? What's that? Where's the child, Moonie?", 17);
		break;
	case 2:
		ms.sendNextPrevS("So easy to trick, as usual. Once your mind is set on something. you can't notice anything else...", 5, 1033230);
		break;
	case 3:
		ms.sendNextPrevS("Who are you?!", 17);
		break;
	case 4:
		ms.sendNextPrevS("You've forgotten me already?", 5, 1033230);
		break;
	case 5:
		ms.sendNextPrevS("You are...", 17);
		break;
	case 6:
		ms.sendNextPrevS("It's been a while, Mercedes.", 5, 1033230);
		break;
	case 7:
		ms.sendNextPrevS("The Black Master...Orchid?!", 17);
		break;
	case 8:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction5.img/mersedesQuest/Scene0"));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 3500));
		break;
	case 9:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(0));
		ms.dispose();
}
}