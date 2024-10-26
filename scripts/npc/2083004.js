/*
	Name: Expedition Identifier
	Map: Dark Dragon King Cave Entrance
	Description: 240050400
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
			em = cm.getEventManager("HorntailBattle");
			eventname = em.getProperty("state") == 0 ? "Horntail" : "ChaosHt";

			var squadAvailability = cm.getSquadAvailability(eventname);
			var chat = "#e<Expedition: Dark Dragon King>#n\r\n\r\nThe Dark Dragon King is a giant monster with advanced ice, fire, and lightning magic. Its enormous size can cause earthquakes, tsunamis, and super hurricanes. It leads the dark dragon race to unstoppable power.\r\n";
			if (cm.getMap(240060000).getCharacters().size() == 0 && cm.getMap(240060100).getCharacters().size() == 0 && cm.getMap(240060200).getCharacters().size() == 0 && cm.getMap(240060001).getCharacters().size() == 0 && cm.getMap(240060101).getCharacters().size() == 0 && cm.getMap(240060201).getCharacters().size() == 0) {
				if (squadAvailability == -1) {
					chat += "\r\nNumber of players: 1~30";
					chat += "\r\nLevel range: 50~200";
					chat += "\r\nTime limit: 60 minutes\r\n";
					chat += "#L0##v3994115#";
					chat += "#L8##v3994117#";
				}
				if (squadAvailability == 1) {
					var type = cm.isSquadLeader(eventname);
					if (type == -1) {
						cm.sendOk("The expedition has ended. Please register again.");
						cm.dispose();
						return;
					}
					if (type == 0) {
						var memberType = cm.isSquadMember(eventname);
						if (memberType == 2) {
							cm.sendOk("Sorry, you are on the restriction list and cannot join this expedition.");
							cm.dispose();
							return;
						}
						if (memberType == 0) {
							chat += "\r\nSomeone has already formed an expedition team. If you want to continue the challenge, try joining them.";
							chat += "\r\n#L1#View team information";
							chat += "\r\n" + (cm.getChannelServer().getMapleSquad(eventname).getMembers().contains(cm.getPlayer().getName()) ? "#L3#Leave the expedition" : "#L2#Register for the expedition") + "";
						}
					}
					if (type == 1) {
						chat += "\r\n#L4#Adjust team list";
						chat += "\r\n#L5#Restricted list";
						chat += "\r\n#L6#Enter expedition map";
					}
				}
			}
			if (squadAvailability == 2 || !(cm.getMap(240060000).getCharacters().size() == 0 && cm.getMap(240060100).getCharacters().size() == 0 && cm.getMap(240060200).getCharacters().size() == 0 && cm.getMap(240060001).getCharacters().size() == 0 && cm.getMap(240060101).getCharacters().size() == 0 && cm.getMap(240060201).getCharacters().size() == 0)) {
				chat += "\r\nThe expedition has already started against the Dark Dragon King. May the gods bless you.";
				chat += "\r\n#L1#View expedition information";
			}
			chat += "\r\n#L7#Wait a moment";
			cm.sendSimple(chat);
			break;
		case 1:
			if (selection == 0 || selection == 8) {
				if (cm.registerSquad(selection == 0 ? "Horntail" : "ChaosHt", 5, "You have become the leader of the <Dark Dragon King> expedition. If you want to participate, please reapply for the expedition within 5 minutes, or your qualification will be automatically canceled.")) {
					cm.sendOk("You have become the leader of the <Dark Dragon King> expedition. Please gather your team within 5 minutes or your qualification will be automatically canceled.");
					em.setProperty("state", selection == 0 ? 0 : 1);
					cm.dispose();
					return;
				}
				cm.sendOk("Operation failed due to an unknown error.");
			}
			if (selection == 1) {
				if (!cm.getSquadList(eventname, 0)) {
					cm.sendOk("Operation failed due to an unknown error.");
				}
			}
			if (selection == 2) {
				var ba = cm.addMember(eventname, true);
				cm.sendOk(ba == 1 ? "Successfully applied to join the expedition. Please prepare for the expedition." : ba == 2 ? "The expedition team has reached 30 members. Please try again later." : "You have already joined the expedition. Please prepare.");
			}
			if (selection == 3) {
				var baa = cm.addMember(eventname, false);
				cm.sendOk(baa == 1 ? "Successfully left the expedition." : "You have already left the expedition.");
			}
			if (selection == 4) {
				if (!cm.getSquadList(eventname, 1)) {
					cm.sendOk("Operation failed due to an unknown error.");
					cm.dispose();
				}
			}
			if (selection == 5) {
				if (selection != -1) {
					cm.acceptMember(eventname, selection);
				}
			}
			if (selection == 6) {
				if (cm.getSquad(eventname) == null) {
					cm.sendOk("Operation failed due to an unknown error.");
					cm.dispose();
					return;
				}
				dd = cm.getEventManager(em.getProperty("state") == 0 ? "HorntailBattle" : "ChaosHorntail");
				dd.startInstance(cm.getSquad(eventname), cm.getPlayer().getMap());
				cm.dispose();
			}
			if (selection == 7) {
				cm.dispose();
			}
			select = selection;
			break;
		case 2:
			if (select == 4) {
				cm.banMember(eventname, selection);
				cm.dispose();
			}
			if (select == 5) {
				if (selection != -1) {
					cm.acceptMember(eventname, selection);
				}
			}
			cm.dispose();
	}
}
