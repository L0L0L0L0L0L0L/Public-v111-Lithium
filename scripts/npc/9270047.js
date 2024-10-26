/*
    Name:    Eldoru
    Map:     Dream Park Entrance
    Description: 551030100
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
			em = cm.getEventManager("ScarTarBattle");

			var squadAvailability = cm.getSquadAvailability("ScarTar");
			var chat = "#e<Expedition: Vanishing Paradise>#n\r\n\r\nWelcome to Malaysia's Dream Park. A series of exciting activities are held in the park, and we hope you enjoy them. Participate in this challenge to receive unexpected gifts.\r\n";
			if (squadAvailability == -1) {
				chat += "\r\nNumber of players: 1~30";
				chat += "\r\nLevel range: 120+";
				chat += "\r\nTime limit: 60 minutes";
				chat += "\r\n#L0#Start Challenge";
			}
			if (squadAvailability == 1) {
				var type = cm.isSquadLeader("ScarTar");
				if (type == -1) {
					cm.sendOk("The expedition has ended. Please register again.");
					cm.dispose();
					return;
				}
				if (type == 0) {
					var memberType = cm.isSquadMember("ScarTar");
					if (memberType == 2) {
						cm.sendOk("Sorry, you are on the restricted list and cannot participate in this expedition.");
						cm.dispose();
						return;
					}
					if (memberType == 0) {
						chat += "\r\nSomeone has already formed an expedition team. If you want to continue the challenge, please try to join them.";
						chat += "\r\n#L1#View Team Information";
						chat += "\r\n" + (cm.getChannelServer().getMapleSquad("ScarTar").getMembers().contains(cm.getPlayer().getName()) ? "#L3#Leave Expedition Team" : "#L2#Register for Expedition") + "";
					}
				}
				if (type == 1) {
					chat += "\r\n#L4#Adjust Team List";
					chat += "\r\n#L5#Restrict Team List";
					chat += "\r\n#L6#Enter Expedition Map";
				}
			}
			if (squadAvailability == 2) {
				chat += "\r\nThe expedition team has already started fighting against the Vanishing Paradise. May the Lord bless you.";
				chat += "\r\n#L1#View Expedition Team Information";
			}
			chat += "\r\n#L7#Wait a Moment";
			cm.sendSimple(chat);
			break;
		case 1:
			if (selection == 0 || selection == 8) {
				if (cm.registerSquad("ScarTar", 5, "You have become the leader of the <Vanishing Paradise> expedition team. If you want to try this expedition, please reapply with me. Otherwise, you will not be able to participate in this expedition.")) {
					cm.sendOk("You have become the leader of the <Vanishing Paradise> expedition team. Please gather the team within 5 minutes, or the expedition qualification will be automatically canceled.");
					em.setProperty("state", selection == 0 ? 0 : 1);
					cm.dispose();
					return;
				}
				cm.sendOk("Operation failed due to an unknown error.");
			}
			if (selection == 1) {
				if (!cm.getSquadList("ScarTar", 0)) {
					cm.sendOk("Operation failed due to an unknown error.");
				}
			}
			if (selection == 2) {
				var ba = cm.addMember("ScarTar", true);
				cm.sendOk(ba == 1 ? "Successfully applied to join the expedition team. Please get ready for the expedition." : ba == 2 ? "The expedition team has reached 30 members. Please try again later." : "You have already joined the expedition team. Please get ready for the expedition.");
			}
			if (selection == 3) {
				var baa = cm.addMember("ScarTar", false);
				cm.sendOk(baa == 1 ? "Successfully left the expedition team." : "You have already left the expedition team.");
			}
			if (selection == 4) {
				if (!cm.getSquadList("ScarTar", 1)) {
					cm.sendOk("Operation failed due to an unknown error.");
					cm.dispose();
				}
			}
			if (selection == 5) {
				if (!cm.getSquadList("ScarTar", 2)) {
					cm.sendOk("Operation failed due to an unknown error.");
					cm.dispose();
				}
			}
			if (selection == 6) {
				if (cm.getSquad("ScarTar") == null) {
					cm.sendOk("Operation failed due to an unknown error.");
					cm.dispose();
					return;
				}
				dd = cm.getEventManager("ScarTarBattle");
				dd.startInstance(cm.getSquad("ScarTar"), cm.getPlayer().getMap());
				cm.dispose();
			}
			if (selection == 7) {
				cm.dispose();
			}
			select = selection;
			break;
		case 2:
			if (select == 4) {
				cm.banMember("ScarTar", selection);
				cm.dispose();
			}
			if (select == 5) {
				if (selection != -1) {
					cm.acceptMember("ScarTar", selection);
				}
			}
			cm.dispose();
	}
}
