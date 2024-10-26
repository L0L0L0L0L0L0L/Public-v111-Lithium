/*
	名字:	船長
	地圖:	維多利亞島
	描述:	3000000
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
		cm.spawnNPCRequestController(1096000, 2209, -107, 0);
		cm.spawnNPCRequestController(1096001, 2046, -62, 0);
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 2));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 3000));
		break;
	case 1:
		cm.sendNextS("So, why do you want to go to Maple Island, anyway? Not many people head that way these days. Judging by your clothes, you're not a tourist, either.", 1);
		break;
	case 2:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction4.img/cannonshooter/face03"));
		cm.sendNextPrevS("I'm going to Maple Island for training. After that, I'm headed to Victoria Island to become a great adventurer! ...That's how it works, right?", 3);
		break;
	case 3:
		cm.sendNextPrevS("It sure does! Maple Island is a great place to train, since there are no dangerous monsters there. Plus, you'll meet plenty of newbies like yourself to make friends with. Once you're comfortable with the basics, Victoria Island is where you learn to shine. And then, when you're ready, there's a big, wide world out there for you to explore! Ahh, how I envy you!", 1);
		break;
	case 4:
		cm.sendNextPrevS("Heh, I can't wait! I'm gonna train really hard, and learn to take down all of the most powerful monsters. I've been studying to be a great Explorer. I'm completely prepared!", 3);
		break;
	case 5:
		cm.sendNextPrevS("What a great attitude you have! That's the kind of thing that will help you succeed. Of course, you can't ever be sure of what will happen in the future. Just remember, #beverything happens for a reason#k.", 1);
		break;
	case 6:
		cm.sendNextPrevS("Hey...did you hear something? Huh, I just had the weirdest feeling. I know there are no monsters out here on the ocean, but you might want to be careful anyway.", 1);
		break;
	case 7:
		cm.spawnNPCRequestController(1096011, 2000, -20, 0);
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 2));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("cannonshooter/summon", 4));
		cm.getNPCDirectionEffect(1096011, "Effect/Summon.img/15", 2000, 0, -100);
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1500));
		break;
	case 8:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.removeNPCController(1096000));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.removeNPCController(1096001));
		cm.spawnNPCRequestController(1096002, 2108, -82, 0);
		cm.spawnNPCRequestController(1096008, 2000, -20, 1);
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 0));
		cm.getNPCDirectionEffect(1096008, "Effect/Direction4.img/effect/cannonshooter/balog/0", 2000, 0, -200);
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 500));
		break;
	case 9:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.setNPCSpecialAction(1096008, "attack2"));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 10:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.setNPCSpecialAction(1096008, "attack1"));
		cm.getNPCDirectionEffect(1096002, "Effect/Direction4.img/effect/cannonshooter/npc/0", 2000, 0, -160);
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 11:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("Party1/Failed", 4));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction4.img/effect/cannonshooter/User/0", 2000, 0, -100, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 12:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 150));
		break;
	case 13:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 0));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 14:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction4.img/cannonshooter/face02"));
		cm.getNPCDirectionEffect(1096002, "Effect/Direction4.img/effect/cannonshooter/npc/1", 2000, 0, -160);
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 500));
		break;
	case 15:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction4.img/cannonshooter/face02"));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction4.img/effect/cannonshooter/User/1", 2000, 0, -100, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 16:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction4.img/cannonshooter/face05"));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 0));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 100));
		break;
	case 17:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction4.img/cannonshooter/face05"));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.setNPCSpecialAction(1096008, "attack2"));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("cannonshooter/Attack1", 4));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 100));
		break;
	case 18:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction4.img/cannonshooter/face05"));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 19:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction4.img/cannonshooter/face05"));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.setNPCSpecialAction(1096008, "attack1"));
		cm.getNPCDirectionEffect(1096008, "Effect/Direction4.img/effect/cannonshooter/balog/0", 2000, 0, -200);
		cm.getNPCDirectionEffect(1096008, "Mob/8150000.img/attack2/info/effect", 1000, 0, 0);
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("cannonshooter/Attack1", 4));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 20:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction4.img/effect/cannonshooter/User/2", 2000, 0, -100, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Mob/8150000.img/attack2/info/hit", 0, 0, 0, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 6));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 500));
		break;
	case 21:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction4.img/cannonshooter/face02"));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 0));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 500));
		break;
	case 22:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction4.img/cannonshooter/face02"));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.setNPCSpecialAction(1096008, "attack2"));
		cm.getNPCDirectionEffect(1096008, "Mob/8130100.img/attack1/info/effect", 1000, 0, 0);
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 500));
		break;
	case 23:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction4.img/cannonshooter/face02"));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Mob/8130100.img/attack1/info/hit", 0, 0, 0, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("cannonshooter/Attack1", 4));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 6));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 500));
		break;
	case 24:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction4.img/cannonshooter/face01"));
		cm.getNPCDirectionEffect(1096008, "Mob/8130100.img/attack1/info/effect", 1000, 0, 0);
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 2));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 300));
		break;
	case 25:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 300));
		break;
	case 26:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 2));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 300));
		break;
	case 27:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 300));
		break;
	case 28:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 2));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 300));
		break;
	case 29:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 300));
		break;
	case 30:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 2));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 150));
		break;
	case 31:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 0));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 500));
		break;
	case 32:
		cm.getNPCDirectionEffect(1096008, "Effect/Direction4.img/effect/cannonshooter/balog/1", 2000, 0, -200);
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 300));
		break;
	case 33:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.setNPCSpecialAction(1096008, "attack"));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("cannonshooter/Attack2", 4));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo("Effect/Direction4.img/effect/cannonshooter/User/3", 2000, 0, -100, 1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(3, 2));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 2000));
		break;
	case 34:
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction4.img/cannonshooter/face02"));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.getDirectionInfo(1, 1000));
		break;
	case 35:
		cm.dispose();
		cm.getPlayer().changeMap(cm.getMap(912060100), cm.getMap(912060100).getPortal(0));
}
}