/*
	名字:	莫斯卡丹的善意
	地圖:	發電廠保安隊
	描述:	310050100
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status > 5) {
		qm.sendNext("#p2154007# was never for a moment afraid, even as he lost more and more functionality. I think it was because he had faith in you.");
		qm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		qm.sendNext("I received the transmission sent by #p2154007# before his functions were disrupted. Thank you for helping my siblings. I believe you are the definition of what humans mean when they use the word 'kind'.");
		break;
	case 1:
		qm.sendNextPrevS("Did you know this would happen?", 2);
		break;
	case 2:
		qm.sendNextPrev("I knew that a day would come when Doctor #p2154009# would abandon #p2154012#. Of us all, #p2154012# was the one designed specifically for combat. However, that means he consumes massive amounts of energy, so I knew that #p2154012# would be the first to be abandoned.");
		break;
	case 3:
		qm.sendNextPrevS("Then why did you make Zechtok-2000 Heart instead of #p2154012#'s heart?", 2);
		break;
	case 4:
		qm.sendNextPrev("I am not capable of recreating a #p2154009#-type heart perfectly. Had I made #p2154012#'s heart, the energy output would have been insufficient during combat. Since #p2154007# is not designed for combat, the heart I made should be sufficient.");
		break;
	case 5:
		qm.sendNextPrevS("(#p2154003# appears to have really put a lot of thought into this.)", 2);
		break;
	case 6:
		qm.sendAcceptDecline("However, the heart I made for #p2154007# does not possess high energy efficiency. Therefore, the energy needs to be charged in advance. Please charge the heart while you're delivering it to #p2154007#. Thank you.");
		break;
	case 7:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			qm.sendNext("Please empty one Etc slot.");
			qm.dispose();
			return;
			}
			qm.gainItem(4220179, qm.getPlayer().itemQuantity(4220179) ? 0 : 1);
			Packages.server.quest.MapleQuest.getInstance(23968).forceStart(qm.getPlayer(), qm.getNpc(), null);
			Packages.server.quest.MapleQuest.getInstance(23981).forceStart(qm.getPlayer(), qm.getNpc(), 0);
			qm.sendOk("You can charge the heart by hunting monsters, just like you did with the Energy Cartridge. Please charge the heart to 100% energy and deliver it to #p2154007#. Thank you.");
			break;
	case 8:
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
		qm.sendNext("#b(You see the inoperable #p2154007#. Place the new heart where the old heart used to be and press the button to turn #p2154007# back on.)#k \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 150000 exp \r\n\r\n#fUI/UIWindow2.img/QuestIcon/11/0# Empathy 60");
		break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23968)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(23968).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.gainItem(4220179, -1);
			qm.addPartyTrait("will", 60); //意志
			qm.gainExp(150000);
			}
			qm.sendPrev("It is wonderful to see you again, #h0#. Without you, our plans would never have been successful. Although #p2154012# won't express it I know that deep inside she also appreciates all that you've done.");
			break;
	case 2:
		qm.dispose();
}
}