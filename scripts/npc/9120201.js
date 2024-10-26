/*
	名字:	鈴木
	地圖:	武器庫
	描述:	801040004
*/

var item = 4000138;

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
			em = cm.getEventManager("ShowaBattle");

			var squadAvailability = cm.getSquadAvailability("Showa");
			var chat = "#e<Expedition: Black Road Elder>#n\r\n\r\nThe Black Road Elder. At first glance, he seems like a sinister old man, but he is actually a very old raccoon demon. He particularly enjoys lying and deceiving others, and after establishing the Fire Raccoon Financial, he started exploiting the villagers of Showa...\r\n";
			if (squadAvailability == -1) {
				chat += "\r\nNumber of players: 1~30";
				chat += "\r\nLevel range: 120+";
				chat += "\r\nTime limit: 40 minutes";
				chat += "\r\n#L0#Start Challenge";
			}
			if (squadAvailability == 1) {
				var type = cm.isSquadLeader("Showa");
				if (type == -1) {
					cm.sendOk("The expedition has ended. Please register again.");
					cm.dispose();
					return;
				}
				if (type == 0) {
					var memberType = cm.isSquadMember("Showa");
					if (memberType == 2) {
						cm.sendOk("Sorry, you are on the restricted list and cannot participate in this expedition.");
						cm.dispose();
						return;
					}
					if (memberType == 0) {
						chat += "\r\nAn expedition team has already been formed. If you want to continue challenging, please try joining them.";
						chat += "\r\n#L1#View Team Information";
						chat += "\r\n" + (cm.getChannelServer().getMapleSquad("Showa").getMembers().contains(cm.getPlayer().getName()) ? "#L3#Leave Expedition Team" : "#L2#Register for Expedition") + "";
					}
				}
				if (type == 1) {
					chat += "\r\n#L4#Adjust Team List";
					chat += "\r\n#L5#Restricted Member List";
					chat += "\r\n#L6#Enter Expedition Map";
				}
			}
			if (squadAvailability == 2) {
				chat += "\r\nThe expedition team has already started fighting the Black Road Elder. May the Lord bless you.";
				chat += "\r\n#L1#View Expedition Team Information";
			}
			chat += "\r\n#L7#Wait a moment";
			cm.sendSimple(chat);
			break;
		case 1:
			if (selection == 0) {
				if (!cm.getPlayer().itemQuantity(item)) {
					cm.sendOk("You must obtain a #b#v" + item + "##k from the female boss to be eligible to challenge the Black Road Elder.");
					cm.dispose();
					return;
				}
				if (cm.registerSquad("Showa", 5, "You have become the <Black Road Elder> expedition team leader. If you want to attempt this expedition, please reapply for registration, otherwise, you will not be able to participate."))
				{
					cm.sendOk("You are now the <Black Road Elder> expedition team leader. Please gather the expedition team within 5 minutes, otherwise, the qualification for this expedition will be automatically canceled.");
					em.setProperty("state", selection == 0 ? 0 : 1);
					cm.dispose();
					return;
				}
				cm.sendOk("Operation failed due to an unknown error.");
			}
			if (selection == 1) {
				if (!cm.getSquadList("Showa", 0)) {
					cm.sendOk("Operation failed due to an unknown error.");
				}
			}
			if (selection == 2) {
				var ba = cm.addMember("Showa", true);
				cm.sendOk(ba == 1 ? "Successfully applied to join the expedition team. Please prepare for the expedition." : ba == 2 ? "The expedition team has reached 30 members. Please try again later." : "You have already joined the expedition team. Please prepare for the expedition.");
			}
			if (selection == 3) {
				var baa = cm.addMember("Showa", false);
				cm.sendOk(baa == 1 ? "Successfully left the expedition team." : "You have already left the expedition team.");
			}
			if (selection == 4) {
				if (!cm.getSquadList("Showa", 1)) {
					cm.sendOk("Operation failed due to an unknown error.");
					cm.dispose();
				}
			}
			if (selection == 5) {
				if (!cm.getSquadList("Showa", 2)) {
					cm.sendOk("Operation failed due to an unknown error.");
					cm.dispose();
				}
			}
			if (selection == 6) {
				if (cm.getSquad("Showa") == null) {
					cm.sendOk("Operation failed due to an unknown error.");
					cm.dispose();
					return;
				}
				dd = cm.getEventManager("ShowaBattle");
				dd.startInstance(cm.getSquad("Showa"), cm.getPlayer().getMap());
				cm.dispose();
			}
			if (selection == 7) {
				cm.dispose();
			}
			select = selection;
			break;
		case 2:
			if (select == 4) {
				cm.banMember("Showa", selection);
				cm.dispose();
			}
			if (select == 5) {
				if (selection != -1) {
					cm.acceptMember("Showa", selection);
				}
			}
			cm.dispose();
	}
}
