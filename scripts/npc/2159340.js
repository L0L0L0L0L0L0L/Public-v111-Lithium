/*
	名字:	黑色翅膀警衛1
	地圖:	能量抽取處2
	描述:	931050020
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
		Packages.server.quest.MapleQuest.getInstance(23207).forceComplete(cm.getPlayer(), 0);
		cm.spawnNPCRequestController(2159340, 175, 0, 0);
		cm.spawnNPCRequestController(2159341, 300, 0, 0);
		cm.spawnNPCRequestController(2159342, 600, 0, 0);
		cm.spawnNPCRequestController(2159343, -158, 18, 0);
		cm.getNPCDirectionEffect(2159340, "Effect/Direction6.img/effect/tuto/balloonMsg1/3", 1500, 0, -100);
		cm.getNPCDirectionEffect(2159341, "Effect/Direction6.img/effect/tuto/balloonMsg1/3", 1500, 0, -100);
		cm.getNPCDirectionEffect(2159342, "Effect/Direction6.img/effect/tuto/balloonMsg1/3", 1500, 0, -100);
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.setNPCSpecialAction(2159340, "panic"));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.setNPCSpecialAction(2159341, "panic"));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg2/0", 1500, 0, -100, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1500));
		break;
	case 1:
		cm.sendNextS("W-what is that?", 1);
		break;
	case 2:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg2/1", 2000, 0, -100, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 900));
		break;
	case 3:
		cm.sendNextS("(What's going on? My Fury is...nearly gone! And what is this thing? Did it take my power...?)", 3);
		break;
	case 4:
		cm.sendNextPrevS("T-this can't be happening...!", 1);
		break;
	case 5:
		cm.sendNextPrevS("What did you do to me? This energy...is it the Black Mage's energy?", 3);
		break;
	case 6:
		cm.sendNextPrevS("Need to capture that person to avoid interrogation...", 1);
		break;
	case 7:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg1/16", 2000, 0, -100, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1500));
		break;
	case 8:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(0, 373));//角色攻擊
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("demonSlayer/31121006", 4));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Skill/3112.img/skill/31121006/effect", 2000, 100, 0, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 900));
		break;
	case 9:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction6.img/DemonTutorial/Scene3"));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg1/17", 2000, 0, -100, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 900));
		break;
	case 10:
		Packages.server.quest.MapleQuest.getInstance(23207).forceStart(cm.getPlayer(), 0, null);
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.setNPCSpecialAction(2159340, "die"));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.setNPCSpecialAction(2159341, "die"));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("demonSlayer/31121006h", 4));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 11:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.removeNPCController(2159340));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.removeNPCController(2159341));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg0/13", 2000, 0, -100, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 12:
		cm.sendNextS("(Who is that? I've never seen such a powerful skill...)", 5, 2159342);
		break;
	case 13:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1500));
		break;
	case 14:
		cm.sendNextS("(Ugh... I wasted too much power fighting them. Where am I? If nothing else, I know I need to get out of here.)", 3);
		break;
	case 15:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 2));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 16:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 0));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg1/12", 2000, 0, -100, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 17:
		cm.getNPCDirectionEffect(2159342, "Effect/Direction6.img/effect/tuto/balloonMsg1/4", 2000, 0, -100);
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1200));
		break;
	case 18:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.NPCSpecialAction(2159342, -1, 150, 100));
		cm.sendNextS("(No... I'm...losing consciousness. If they find me now...!)", 3);
		break;
	case 19:
		cm.sendNextS("Wait, calm down. I'm not your enemy. Who are you? And how did you end up in a place like this?", 5, 2159342);
		break;
	case 20:
		cm.sendNextPrevS("(He doesn't feel evil...)\r\nStay back!", 3);
		break;
	case 21:
		cm.sendNextPrevS("C'mon... Look at you. You need help, and you need it now. Do you realized what they were doing? That machine next to you is an Energy Conducting Device... The Black Wings were draining your power.", 5, 2159342);
		break;
	case 22:
		cm.sendNextPrevS("(An Energy Conducting Device? This machine? And who are the Black Wings? None of this makes any sense...)", 3);
		break;
	case 23:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction6.img/effect/tuto/balloonMsg0/13", 2000, 0, -100, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1500));
		break;
	case 24:
		cm.sendNextS("Who are you? And...*cough* How do you know about these things?", 3);
		break;
	case 25:
		cm.sendNextPrevS("I'm J, an agent in the Resistance. We're working against the Black Wings. I don't know who you are, but I wouldn't take advantage of you in your state. Let me help you.", 5, 2159342);
		break;
	case 26:
		cm.sendNextPrevS("No... I have...no energy...", 3);
		break;
	case 27:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(0, 372));//角色隱身
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(cm.getPlayer().getGender() == 0 ? "Effect/Direction6.img/effect/tuto/fallMale" : "Effect/Direction6.img/effect/tuto/fallFemale", 3000, 0, 0, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 600));
		break;
	case 28:
		cm.getNPCDirectionEffect(2159342, "Effect/Direction6.img/effect/tuto/balloonMsg1/13", 2000, 0, -100);
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1500));
		break;
	case 29:
		cm.dispose();
		cm.removeNpc(cm.getPlayer().getMap().getId(), 2159342);
		cm.removeNpc(cm.getPlayer().getMap().getId(), 2159343);
		cm.getPlayer().changeMap(cm.getMap(931050030), cm.getMap(931050030).getPortal(0));
}
}