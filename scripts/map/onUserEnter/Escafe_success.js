/*
	名字:	外星基地
	地圖:	逃生路線
	描述:	610040700
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
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 2500));
		break;
	case 1:
		ms.spawnNPCRequestController(9201174, 700, -611, 0);
		ms.spawnNPCRequestController(9201054, -600, -611, 0);
		ms.spawnNPCRequestController(9201094, -700, -611, 0);
		ms.getNPCDirectionEffect(9201174, "Effect/Direction6.img/effect/tuto/balloonMsg1/3", 2000, 0, -100);
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 0));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 2:
		ms.sendNextS("Catch the Mapling!", 5, 9201174);
		break;
	case 3:
		ms.sendNextPrevS("I think it took my space-wallet!", 5, 9201174);
		break;
	case 4:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction.img/effect/NLC/alien/0", 1500, 200, 0, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction.img/effect/NLC/alien/0", 1500, 250, 0, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction.img/effect/NLC/alien/0", 1500, 300, 0, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction.img/effect/NLC/alien/0", 1500, 350, 0, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction.img/effect/NLC/alien/0", 1500, 400, 0, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction.img/effect/NLC/alien/0", 1500, 450, 0, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction.img/effect/NLC/alien/0", 1500, 500, 0, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction.img/effect/NLC/alien/0", 1500, 550, 0, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg0/10", 1000, 200, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 5:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("cannonshooter/Attack3", 4));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Skill/211.img/skill/2111002/effect", 0, 200, 0, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Skill/211.img/skill/2111002/effect", 0, 250, 0, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Skill/211.img/skill/2111002/effect", 0, 300, 0, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Skill/211.img/skill/2111002/effect", 0, 350, 0, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Skill/211.img/skill/2111002/effect", 0, 400, 0, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Skill/211.img/skill/2111002/effect", 0, 450, 0, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Skill/211.img/skill/2111002/effect", 0, 500, 0, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Skill/211.img/skill/2111002/effect", 0, 550, 0, 1));
		ms.getNPCDirectionEffect(9201174, "Skill/211.img/skill/2111002/effect", 0, 0, -100);
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg0/10", 100, 200, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 700));
		break;
	case 6:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.removeNPCController(9201174));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 0));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 500));
		break;
	case 7:
		ms.sendNextS("Are you alright? Sorry we're late, but we came to help!", 5, 9201054);
		break;
	case 8:
		ms.sendNextPrevS("We'll help too! Hurry and come over here!", 5, 9201094);
		break;
	case 9:
		ms.sendNextPrevS("Where have you been?! Aliens are trying eat my brain!", 17);
		break;
	case 10:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 3000));
		break;
	case 11:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 0));
		ms.sendNextS("Thanks for the help. Sorry for yelling back there..", 17);
		break;
	case 12:
		ms.sendNextPrevS("Don't worry about the yelling. Everybody's entitled to a good terror-yell now and again. Besides, after all you've done for us, we owe you.", 5, 9201094);
		break;
	case 13:
		ms.sendNextPrevS("Well, thanks anyway. l didn't get hurt, just a lite scared and annoyed.", 17);
		break;
	case 14:
		ms.sendNextPrevS("At least they didn't mess with your brain to make you think you had escaped. when you were actually still trapped in their lab!", 5, 9201094);
		break;
	case 15:
		ms.sendNextPrevS("Ha! I'm just teasing you. Why don't you go see the mayor? He loves a good science fiction story. We'll be going now!", 5, 9201054);
		break;
	case 16:
		ms.sendNextPrevS("Wait! is this reality? Am l dreaming?!", 17);
		break;
	case 17:
		ms.sendNextPrevS("Hahaha, you're so crazy. We'll see you later, crazy guy!", 5, 9201094);
		break;
	case 18:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg0/10", 2000, 0, -100, 1));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 3000));
		break;
	case 19:
		ms.dispose();
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(0));
		ms.getPlayer().changeMap(ms.getMap(600000000), ms.getMap(600000000).getPortal(0));
		var tick = 0;
		schedule = Packages.server.Timer.EtcTimer.getInstance().register(function () {
		if (tick == 1) {
			Packages.server.quest.MapleQuest.getInstance(28753).forceComplete(ms.getPlayer(), 0);
			ms.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getShowQuestCompletion(28753));
			schedule.cancel(true);
			ms.dispose();
			return;
			}
			tick++;
		}, 3000);
}
}