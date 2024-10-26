/*
	名字:	隱藏地圖
	地圖:	艾德斯塔公園噴水台附近4
	描述:	931050211
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
		ms.spawnNPCRequestController(2153006, 630, -40, 0);
		ms.sendNextS("Okay...l'm going to drink it...", 5, 2153006);
		break;
	case 1:
		ms.getNPCDirectionEffect(2153006, "Effect/Direction6.img/effect/story/balloonMsg0/0", 2000, 0, -100);
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 2:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.removeNPCController(2153006));
		ms.spawnNPCRequestController(2159333, 630, -70, 0);
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.setNPCSpecialAction(2159333, "summon"));
		ms.getNPCDirectionEffect(2159333, "Effect/Summon.img/6", 800, 0, 0);
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 800));
		break;
	case 2:
		ms.sendNextS("l-it worked! My legs...my arms...everything worked, right?", 5, 2159333);
		break;
	case 3:
		ms.sendNextPrevS("#bWell... Mastema...You turned into me from when l was a Commander...", 17);
		break;
	case 4:
		ms.sendNextPrevS("WHAT? l turned into you, #h0#? Why did...Why would...?", 5, 2159333);
		break;
	case 5:
		ms.getNPCDirectionEffect(2159333, "Effect/Direction6.img/effect/story/balloonMsg2/0", 2000, 0, -100);
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 6:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.removeNPCController(2159333));
		ms.spawnNPCRequestController(2153006, 630, -40, 0);
		ms.getNPCDirectionEffect(2153006, "Effect/Summon.img/6", 800, 0, 0);
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 800));
		break;
	case 7:
		ms.sendNextS("#bGood thing that wore off so soon. Um...l guess that whole thing about turning into what you desire was wrong, huh? Ha... Ha...", 17);
		break;
	case 8:
		ms.sendNextPrevS("(l hope we can forget about this nonsense now.)\r\nWe should get back soon.", 5, 2153006);
		break;
	case 9:
		ms.dispose();
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(0));
		ms.getPlayer().changeMap(ms.getMap(310010000), ms.getMap(310010000).getPortal(0));
}
}