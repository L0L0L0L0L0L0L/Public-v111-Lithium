/*
	名字:	影武者－達克魯的日記本
	地圖:	雪姬的房間
	描述:	103050101
*/

var status = -1;

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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2369)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(2369).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 2 && qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2369)).getStatus() < 2) {
			qm.sendOk("Please free at least one Equip slot before advancing to Blade Acolyte.");
			qm.dispose();
			return;
			}
			qm.sendNext("Finally... I have my father's Diary. Thank you. I am starting to trust you even more. Your current position doesn't seem to suit your great abilities. I think you have the qualifications to advance to a #bBlade Acolyte#k. I will advance you to a Blade Acolyte now.");
			break;
	case 1:
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2369)).getStatus() < 2) {
			Packages.server.quest.MapleQuest.getInstance(2369).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.getPlayer().changeJob(431);
			qm.gainItem(4032617, -1);
			qm.gainItem(1052244, 1);
			qm.gainItem(1142108, 1);
			qm.gainItem(5620000, 1);
			qm.gainItem(5620001, 1);
			qm.gainItem(5620002, 1);
			qm.gainItem(5620003, 1);
			qm.gainItem(5620004, 1);
			qm.gainItem(5620005, 1);
			}
			qm.sendNextPrevS("My father's diary... Father would often write in a code that only he and I could understand. Wait, in the last chapter... This!", 1);
			break;
	case 2:
		qm.sendNextPrevS("This can't be! It's a lie! Jin! How dare you lay a finger on my father's diary! \r\n\r\n#b(Lady Syl drops the diary and it falls to the ground.)", 1);
		break;
	case 3:
		qm.sendNextPrevS("#b(You pick up the book and start reading it.) \r\n\r\n - Date: XX-XX-XXXX -  \r\nTeacher has passed away... Three days ago, teacher left for the Cursed Sanctuary at the request of Tristan. Syl seemed worried so I decided to go look for him. When I arrived at the entrance of the Sanctuary, I heard a shriek that made me shiver...", 3);
		break;
	case 4:
		qm.sendNextPrevS("#bWhen I jumped into the darkness of the sanctuary, I came face to face with a red-eyed monster spewing evil energy. Teacher was nowhere to be seen. The monster started attacking. After a fierce battle, I finally succeeded in killing it. However, the fallen monster soon turned into...teacher.", 3);
		break;
	case 5:
		qm.sendNextPrevS("#bI attempted to help teacher, but he passed in my arms. Before he passed, he whispered. My soul was trapped within the Balrog. You freed me... Now, take care of Kerning City and Syl... and... please don't tell a soul about this. I can't forgive myself for allowing the demon to steal my soul.", 3);
		break;
	case 6:
		qm.sendPrevS("#bAs he wished, I will never reveal what happened. His secrets--along with this diary- \r\n-will forever be sealed. - Jin -", 3);
		break;
	case 7:
		qm.dispose();
}
}