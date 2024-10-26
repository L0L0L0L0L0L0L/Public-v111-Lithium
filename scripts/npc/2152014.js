/*
	名字:	神秘
	地圖:	埃德爾斯坦
	描述:	310000000
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case - 1:
		cm.dispose();
		return;
	case 0:
		if (status == 1) {
		cm.sendNext("You know nothing about the art of negotiation. Hmph.");
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
		if (cm.getPlayer().itemQuantity(4032750)) {
			cm.sendNext("I see that you already have a Recyclable Rue Battery...");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(23914)).getStatus() != 1) {
			cm.sendOk("I'm so hot, I'm probably blinding you. l also like balloons. And now, I won't share my balloons with you, so don't even ask.");
			cm.dispose();
			return;
			}
			cm.sendNext("I'm so hot. I'm probably blinding you. I also like balloons. And now, l won't share my balloons with you, so don't even ask. What? You don't want any balloons? So what do you need then?");
			break;
	case 1:
		cm.sendYesNo("You need Recyclable Batteries? Hmm, I do have one. l can give it to you, but of course you have to give me something in return. I'll give you my battery if you bring me one Cork Stopper.");
		break;
	case 2:
		if (!cm.getPlayer().itemQuantity(4000597)) {
			cm.sendNext("I will give you a battery if you bring me a Cork Stopper. And don't be a moron. Make sure to have at least one free Etc slot in your inventory.");
			cm.dispose();
			return;
			}
			cm.gainItem(4000597, -1);
			cm.gainItem(4032750, 1);
			cm.sendNext("Ah, I can see you understand, yes, TRULY understand, the art of recycling. Just like l do...");
			break;
	case 3:
		cm.dispose();
}
}