/*
    Name: Lion King Guardian Statue
    Map: Meeting Room Corridor
    Description: 211070000
*/

var status;
var select;

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
			if (cm.getPlayer().getMap().getId() == 211070100) {
				cm.getPlayer().changeMap(cm.getMap(211061001), cm.getMap(211061001).getPortal(0));
				cm.dispose();
				return;
			}
			em = cm.getEventManager("VonLeonBattle");
			var squadAvailability = cm.getSquadAvailability("VonLeon");
			var chat = "#e<Expedition: Lion King>#n\r\n\r\nFrenzy maintained neutrality by refusing to let his kingdom be involved in the battle between the Black Mage and the Anti-Black Mage Alliance. However, this led the Anti-Black Mage Alliance to believe that he was aligned with the Black Mage, resulting in the kingdom's destruction and the death of his wife, Ephia. In immense grief and regret, Frenzy accepted Sheira's persuasion and truly became the commander of the Black Mage's army.\r\n";
			if (squadAvailability == -1) {
				chat += "\r\nNumber of players: 1~30";
				chat += "\r\nLevel range: 120+";
				chat += "\r\nTime limit: 60 minutes";
				chat += "\r\n#L0#Start Challenge";
			}
			if (squadAvailability == 1) {
				var type = cm.isSquadLeader("VonLeon");
				if (type == -1) {
					cm.sendOk("The expedition has ended, please register again.");
					cm.dispose();
					return;
				}
				if (type == 0) {
					var memberType = cm.isSquadMember("VonLeon");
					if (memberType == 2) {
						cm.sendOk("Sorry, you are on the restriction list and cannot participate in this expedition.");
						cm.dispose();
						return;
					}
					if (memberType == 0) {
						chat += "\r\nA team has already been formed. If you want to continue challenging, please try joining them.";
						chat += "\r\n#L1#View Team Information";
						chat += "\r\n" + (cm.getChannelServer().getMapleSquad("VonLeon").getMembers().contains(cm.getPlayer().getName()) ? "#L3#Leave Team" : "#L2#Register for Team") + "";
					}
				}
				if (type == 1) {
					chat += "\r\n#L4#Adjust Team List";
					chat += "\r\n#L5#Restricted List";
					chat += "\r\n#L6#Enter Expedition Map";
				}
			}
			if (squadAvailability == 2) {
				chat += "\r\nThe expedition has started to fight the Lion King. May the gods bless you.";
				chat += "\r\n#L1#View Expedition Information";
			}
			chat += "\r\n#L7#Wait a moment";
			cm.sendSimple(chat);
			break;
		case 1:
			if (selection == 0 || selection == 8) {
				if (cm.registerSquad("VonLeon", 5, "You have become the leader of the <Lion King> expedition. If you want to try this expedition, please re-register with me, otherwise, you will not be able to participate in this expedition.")) {
					cm.sendOk("You have become the leader of the <Lion King> expedition. Please gather your team within 5 minutes, otherwise, the expedition will be automatically canceled.");
					em.setProperty("state", selection == 0 ? 0 : 1);
					cm.dispose();
					return;
				}
				cm.sendOk("An unknown error occurred, operation failed.");
			}
			if (selection == 1) {
				if (!cm.getSquadList("VonLeon", 0)) {
					cm.sendOk("An unknown error occurred, operation failed.");
				}
			}
			if (selection == 2) {
				var ba = cm.addMember("VonLeon", true);
				cm.sendOk(ba == 1 ? "Successfully applied to join the expedition. Please be prepared for the expedition." : ba == 2 ? "The team has reached 30 members, please try again later." : "You have already joined the expedition. Please be prepared.");
			}
			if (selection == 3) {
				var baa = cm.addMember("VonLeon", false);
				cm.sendOk(baa == 1 ? "Successfully left the expedition." : "You have already left the expedition.");
			}
			if (selection == 4) {
				if (!cm.getSquadList("VonLeon", 1)) {
					cm.sendOk("An unknown error occurred, operation failed.");
					cm.dispose();
				}
			}
			if (selection == 5) {
				if (!cm.getSquadList("VonLeon", 2)) {
					cm.sendOk("An unknown error occurred, operation failed.");
					cm.dispose();
				}
			}
			if (selection == 6) {
				if (cm.getSquad("VonLeon") == null) {
					cm.sendOk("An unknown error occurred, operation failed.");
					cm.dispose();
					return;
				}
				dd = cm.getEventManager("VonLeonBattle");
				dd.startInstance(cm.getSquad("VonLeon"), cm.getPlayer().getMap());
				cm.dispose();
			}
			if (selection == 7) {
				cm.dispose();
			}
			select = selection;
			break;
		case 2:
			if (select == 4) {
				cm.banMember("VonLeon", selection);
				cm.dispose();
			}
			if (select == 5) {
				if (selection != -1) {
					cm.acceptMember("VonLeon", selection);
				}
			}
			cm.dispose();
	}
}
