/*
    Name:    Otherworldly Altar Statue
    Map:     Akarium's Altar Front
    Description: 272020110
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
			em = cm.getEventManager("ArkariumBattle");

			var squadAvailability = cm.getSquadAvailability("Arkarium");
			var chat = "#e<Adventure Team: Akarium>#n\r\n\r\nAkarium was once one of the priests serving the goddess of time, Uina, in the Temple of Time. He was one of the most powerful priests among them. However, in pursuit of greater power, Akarium left Uina and joined the Black Mage’s faction, eventually turning against Uina.\r\n";
			if (squadAvailability == -1) {
				chat += "\r\nNumber of players: 1~30";
				chat += "\r\nLevel range: 120 +";
				chat += "\r\nTime limit: 60 minutes";
				chat += "\r\n#L0#Start Challenge";
			}
			if (squadAvailability == 1) {
				var type = cm.isSquadLeader("Arkarium");
				if (type == -1) {
					cm.sendOk("This adventure has ended. Please register again.");
					cm.dispose();
					return;
				}
				if (type == 0) {
					var memberType = cm.isSquadMember("Arkarium");
					if (memberType == 2) {
						cm.sendOk("Sorry, you are on the restricted list and cannot participate in this adventure.");
						cm.dispose();
						return;
					}
					if (memberType == 0) {
						chat += "\r\nA squad has already been formed. If you wish to continue the challenge, please try to join them.";
						chat += "\r\n#L1#View Squad Information";
						chat += "\r\n" + (cm.getChannelServer().getMapleSquad("Arkarium").getMembers().contains(cm.getPlayer().getName()) ? "#L3#Leave Squad" : "#L2#Register for Squad") + "";
					}
				}
				if (type == 1) {
					chat += "\r\n#L4#Adjust Member List";
					chat += "\r\n#L5#Restricted Member List";
					chat += "\r\n#L6#Enter Adventure Map";
				}
			}
			if (squadAvailability == 2) {
				chat += "\r\nThe adventure team has already started fighting Akarium. May the true lord bless you.";
				chat += "\r\n#L1#View Adventure Team Information";
			}
			chat += "\r\n#L7#Wait a moment";
			cm.sendSimple(chat);
			break;
		case 1:
			if (selection == 0 || selection == 8) {
				if (cm.registerSquad("Arkarium", 5, "You have become the leader of the <Akarium> adventure team. If you want to attempt this adventure, please reapply with me. Otherwise, you will be unable to participate in this adventure.")) {
					cm.sendOk("You are now the leader of the <Akarium> adventure team. Please gather your team within 5 minutes, or the registration will be automatically canceled.");
					em.setProperty("state", selection == 0 ? 0 : 1);
					cm.dispose();
					return;
				}
				cm.sendOk("Operation failed due to an unknown error.");
			}
			if (selection == 1) {
				if (!cm.getSquadList("Arkarium", 0)) {
					cm.sendOk("Operation failed due to an unknown error.");
				}
			}
			if (selection == 2) {
				var ba = cm.addMember("Arkarium", true);
				cm.sendOk(ba == 1 ? "Successfully applied to join the squad. Please prepare for the adventure." : ba == 2 ? "The squad has reached 30 members. Please try again later." : "You have already joined the squad. Please prepare for the adventure.");
			}
			if (selection == 3) {
				var baa = cm.addMember("Arkarium", false);
				cm.sendOk(baa == 1 ? "Successfully left the squad." : "You have already left the squad.");
			}
			if (selection == 4) {
				if (!cm.getSquadList("Arkarium", 1)) {
					cm.sendOk("Operation failed due to an unknown error.");
					cm.dispose();
				}
			}
			if (selection == 5) {
				if (selection != -1) {
					cm.acceptMember("Arkarium", selection);
				}
				cm.dispose();
			}
			if (selection == 6) {
				if (cm.getSquad("Arkarium") == null) {
					cm.sendOk("Operation failed due to an unknown error.");
					cm.dispose();
					return;
				}
				dd = cm.getEventManager("ArkariumBattle");
				dd.startInstance(cm.getSquad("Arkarium"), cm.getPlayer().getMap());
				cm.dispose();
			}
			if (selection == 7) {
				cm.dispose();
			}
			select = selection;
			break;
		case 2:
			if (select == 4) {
				cm.banMember("Arkarium", selection);
				cm.dispose();
			}
			if (select == 5) {
				if (selection != -1) {
					cm.acceptMember("Arkarium", selection);
				}
			}
			cm.dispose();
	}
}
