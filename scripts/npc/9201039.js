/*
    Name:    Claudia
    Map:     Wedding Town
    Description:    680000000
*/

var status;
var hair;

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
			if (status < 2) {
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
			if (cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(8860)).getStatus() > 1 && !cm.getPlayer().itemQuantity(4031528)) {
				cm.sendNext("I've already done your hair once as a trade-for-services, sport. You'll have to snag an EXP Hair coupon from the Cash Shop if you want to change it again!");
				cm.dispose();
				return;
			}
			var chat = "Welcome to Wedding Town, I am Claudia. Just hold our membership card and you can enjoy our professional services. #b";
			chat += "\r\n#L0##v4031528##t4031528#";
			cm.sendSimple(chat);
			break;
		case 1:
			if (cm.getPlayer().getGender() < 1) {
				// Female hairstyles
				hair = [30270, 30240, 30020, 30000, 30132, 30192, 30032, 30112, 30162];
			} else {
				// Male hairstyles
				hair = [31150, 31250, 31310, 31050, 31050, 31030, 31070, 31091, 31001];
			}

			for (var i = 0; i < hair.length; i++) {
				hair[i] = hair[i] + parseInt(cm.getPlayer().getHair() % 10); // Adjust based on current hair color
			}
			cm.sendStyle("Use our specialized machine to preview your new hairstyle. Choose one you like.", hair);
			break;
		case 2:
			if (cm.getPlayer().itemQuantity(4031528)) {
				cm.gainItem(4031528, -1);
				cm.setHair(hair[selection]);
				cm.sendOk("Your new hairstyle is ready. Do you like it?");
				cm.dispose();
				return;
			}
			cm.sendOk("Sorry, without our membership card, I cannot serve you.");
			cm.dispose();
	}
}
