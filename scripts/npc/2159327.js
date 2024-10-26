/*
	名字:	普蘭西斯的日記本
	地圖:	普蘭西斯的房間
	描述:	931050220
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
		if (status == 1) {
		cm.dispose();
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
		if (cm.getPlayer().itemQuantity(4350003)) {
			cm.dispose();
			return;
			}
			cm.sendNext("It's a tidy notebook. #rThe Master Puppeteer Francis's Diary. DO NOT READ! That means YOU!#k is written on the cover.");
			break;
	case 1:
		cm.sendYesNo("This is the diary of a Black Wing commander. Would you like to read it?");
		break;
	case 2:
		cm.sendNextS("Forgive me, Black Wing commander. I know it is wrong to read a private diary, but in my defense, you are incredibly evil, and need to be stopped.", 2);
		break;
	case 3:
		cm.sendNextPrev("I ran into the rabbits in the hallway today. How dare they bump into me? With my powers, I can turn them to dust instantly, but I must resist If I do not control, my power could destroy the world...so I must resist...");
		break;
	case 4:
		cm.sendNextPrevS("(I felt such an overpower magic... My hands are shaking. All from reading this diary? These Black Wings are extraordinary.)", 2);
		break;
	case 5:
		cm.sendNextPrevS("(I should relax and read the next page.)", 2);
		break;
	case 6:
		cm.sendNextPrev("Seeing my beautiful love fills my day with joy. I could pluck the stars from the sky, if only my love said the word...\r\n\r\n#b(Something fell out of the diary.)");
		break;
	case 7:
		cm.sendNextPrevS("(What is this? Looks like a picture.)", 2);
		break;
	case 8:
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Please check and see if you have an empty slot available at your etc. inventory."));
			cm.dispose();
			return;
			}
			cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.NPCPacket.getEvanTutorial("UI/UIWindow2.img/Picture/3/0"));
			cm.gainItem(4350003, 1);
			cm.dispose();
}
}