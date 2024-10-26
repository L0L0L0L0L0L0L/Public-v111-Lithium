/*
    Name:    The Forgotten Temple Guardian
    Map:     Twilight of the Forgotten
    Description: 270050000
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
			em = cm.getEventManager("PinkBeanBattle");

			var squadAvailability = cm.getSquadAvailability("PinkBean");
			var chat = "#e<Exploration Team: Pink Bean>#n\r\n\r\nChillestan invaded the Past Road, initially intending to use the Goddess Mirror to summon the Black Mage, but instead summoned Pink Bean. Pink Bean is an unknown demon with unfathomable magical powers, not belonging to this world...\r\n";
			if (squadAvailability == -1) {
				chat += "\r\nNumber of players: 1~30";
				chat += "\r\nLevel range: 120 +";
				chat += "\r\nTime limit: 60 minutes";
				chat += "\r\n#L0#Start Challenge";
			}
			if (squadAvailability == 1) {
				var type = cm.isSquadLeader("PinkBean");
				if (type == -1) {
					cm.sendOk("This exploration has ended. Please register again.");
					cm.dispose();
					return;
				}
				if (type == 0) {
					var memberType = cm.isSquadMember("PinkBean");
					if (memberType == 2) {
						cm.sendOk("Sorry, you are on the restriction list and cannot participate in this exploration.");
						cm.dispose();
						return;
					}
					if (memberType == 0) {
						chat += "\r\nSomeone has already formed an exploration team. If you want to continue challenging, try joining them.";
						chat += "\r\n#L1#View Team Members";
						chat += "\r\n" + (cm.getChannelServer().getMapleSquad("PinkBean").getMembers().contains(cm.getPlayer().getName()) ? "#L3#Leave Team" : "#L2#Register for Team") + "";
					}
				}
				if (type == 1) {
					chat += "\r\n#L4#Adjust Team List";
					chat += "\r\n#L5#Restriction List";
					chat += "\r\n#L6#Enter Exploration Map";
				}
			}
			if (squadAvailability == 2) {
				chat += "\r\nThe exploration team has started the battle against Pink Bean. May the gods bless you.";
				chat += "\r\n#L1#View Exploration Team Information";
			}
			chat += "\r\n#L7#Wait a Moment";
			cm.sendSimple(chat);
			break;
		case 1:
			if (selection == 0 || selection == 8) {
				if (cm.registerSquad("PinkBean", 5, "You have become the leader of the <Pink Bean> exploration team. If you want to attempt this exploration, please reapply by talking to me. Otherwise, you will not be able to participate in this exploration.")) {
					cm.sendOk("You are now the leader of the <Pink Bean> exploration team. Please gather the team members within 5 minutes, or your exploration qualification will be automatically canceled.");
					em.setProperty("state", selection == 0 ? 0 : 1);
					cm.dispose();
					return;
				}
				cm.sendOk("Due to an unknown error, the operation failed.");
			}
			if (selection == 1) {
				if (!cm.getSquadList("PinkBean", 0)) {
					cm.sendOk("Due to an unknown error, the operation failed.");
				}
			}
			if (selection == 2) {
				var ba = cm.addMember("PinkBean", true);
				cm.sendOk(ba == 1 ? "Successfully applied to join the exploration team. Please be ready for the challenge." : ba == 2 ? "The number of team members has reached 30. Please try again later." : "You have already joined the exploration team. Please be ready for the challenge.");
			}
			if (selection == 3) {
				var baa = cm.addMember("PinkBean", false);
				cm.sendOk(baa == 1 ? "Successfully left the exploration team." : "You have already left the exploration team.");
			}
			if (selection == 4) {
				if (!cm.getSquadList("PinkBean", 1)) {
					cm.sendOk("Due to an unknown error, the operation failed.");
					cm.dispose();
				}
			}
			if (selection == 5) {
				if (!cm.getSquadList("PinkBean", 2)) {
					cm.sendOk("Due to an unknown error, the operation failed.");
					cm.dispose();
				}
			}
			if (selection == 6) {
				if (cm.getSquad("PinkBean") == null) {
					cm.sendOk("Due to an unknown error, the operation failed.");
					cm.dispose();
					return;
				}
				dd = cm.getEventManager("PinkBeanBattle");
				dd.startInstance(cm.getSquad("PinkBean"), cm.getPlayer().getMap());
				cm.dispose();
			}
			if (selection == 7) {
				cm.dispose();
			}
			select = selection;
			break;
		case 2:
			if (select == 4) {
				cm.banMember("PinkBean", selection);
				cm.dispose();
			}
			if (select == 5) {
				if (selection != -1) {
					cm.acceptMember("PinkBean", selection);
				}
			}
			cm.dispose();
	}
}
