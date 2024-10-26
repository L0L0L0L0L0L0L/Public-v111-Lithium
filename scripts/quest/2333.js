/*
	名字:	陰謀的黑手
	地圖:	結婚禮堂
	描述:	106021600
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
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
		qm.sendNextS("Ah, you're the brave hero that has come to save me, #h0#! I knew you'd come. *Sniff sniff*", 9);
		break;
	case 1:
		qm.sendNextPrevS("Are you alright, Princess?", 3);
		break;
	case 2:
		qm.sendNextPrevS("Yes, I'm fine. But my father...how is my father? Is he alright?", 9);
		break;
	case 3:
		qm.sendNextPrevS("Yes, #bMushking#k is in a safe place outside the castle with his ministers.", 3);
		break;
	case 4:
		qm.sendNextPrevS("How dare you step foot in here! You're terribly mistaken if you think this is how it ends!", 5, 1300001);
		break;
	case 5:
		qm.sendNextPrevS("Watch out! It's dangerous. He's trying to summon the one who's behind all of this!", 9);
		break;
	case 6:
		qm.sendNextPrevS("The one who's behind all of this? Are you saying there is someone else that's responsible for this?", 3);
		break;
	case 7:
		qm.sendNextPrevS("Silence! He'll be here soon!", 5, 1300001);
		break;
	case 8:
		qm.sendNextPrevS("#bThe Prime Minister!#k Please defeat the Prime Minister!!", 9);
		break;
	case 9:
		Packages.server.quest.MapleQuest.getInstance(2333).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(3300008), new java.awt.Point(292, 133));
		qm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.getTopMsg("New Mission: Defeat the Prime Minister!"));
		qm.dispose();
}
}

function end(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
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
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			qm.sendOk("Please have at least 1 slot empty in your Etc window.");
			qm.dispose();
			return;
			}
			qm.sendNextS("You did it, #b#h0##k! I don't know how to thank you.", 9);
			break;
	case 1:
		qm.sendNextPrevS("No way! Even the Prime Minister?!", 5, 1300001);
		break;
	case 2:
		qm.sendNextPrevS("#bKing Pepe!#k This is where your foolhardy dreams end! I will spare you your life, but you must head back to where you came from. Go back to #bIce Land#k at once!", 3);
		break;
	case 3:
		qm.sendNextPrevS("Wait! Before you go, I must get something that can serve as evidence that I defeated you in a battle.", 3);
		break;
	case 4:
		qm.sendNextPrevS("Grrrr...", 5, 1300001);
		break;
	case 5:
		qm.sendNextPrevS("Give me your crown! Princess, please take the crown.", 3);
		break;
	case 6:
		qm.sendNextPrevS("Dang... I'll never forget this humiliation. \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 10000 exp \r\n\r\n#fUI/UIWindow2.img/QuestIcon/11/0# Ambition 50", 5, 1300001);
		break;
	case 7:
		Packages.server.quest.MapleQuest.getInstance(2333).forceComplete(qm.getPlayer(), qm.getNpc());
		qm.getPlayer().changeMap(qm.getMap(106021700), qm.getMap(106021700).getPortal(0));
		qm.addPartyTrait("charisma", 50);//領導力
		qm.gainItem(4032386, 1);
		qm.gainExp(10000);
		qm.dispose();
}
}