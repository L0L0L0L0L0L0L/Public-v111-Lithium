/*
	Name: Kurt
	Map: First Companion <Checkpoint 1>
	Description: 910340100
*/

var stage1Questions = [
	"Question: What is the minimum level required for a Warrior's first job advancement? Please collect the corresponding number of passes.",
	"Question: What is the minimum strength required for a Warrior's first job advancement? Please collect the corresponding number of passes.",
	"Question: What is the minimum intelligence required for a Mage's first job advancement? Please collect the corresponding number of passes.",
	"Question: What is the minimum agility required for an Archer's first job advancement? Please collect the corresponding number of passes.",
	"Question: What is the minimum agility required for a Thief's first job advancement? Please collect the corresponding number of passes.",
	"Question: What is the minimum level required for the second job advancement? Please collect the corresponding number of passes.",
	"Question: What is the minimum level required for a Mage's first job advancement? Please collect the corresponding number of passes."
];

var stage1Answers = [10, 35, 20, 25, 25, 30, 8];

function start() {
	var eim = cm.getPlayer().getEventInstance();
	switch (cm.getPlayer().getMap().getId()) {
		case 910340100:
			if (eim.getProperty("stage1") == null) {
				if (cm.getPlayer().getParty().getLeader().getId() == cm.getPlayer().getId()) {
					var numpasses = eim.getPlayerCount() - 1; // minus leader
					var stage2 = cm.getPlayer().getParty().getMembers().size() - 1; // Number of passes required
					if (cm.getPlayer().itemQuantity(4001008) == numpasses) {
						cm.sendNext("You have collected " + numpasses + " passes. Congratulations on passing this stage. The portal to the next area is now open. Please hurry as there is a time limit in the next area.");
						eim.setProperty("stage1", 1);
						cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("gate", 2));
						cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
						cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
						cm.removeAll(4001008);
						cm.dispose();
						return;
					}
					cm.sendNext("Welcome to First Companion <Checkpoint 1>. At this stage, the party leader needs to collect " + numpasses + " passes from the party members to proceed to the next area. Please ensure that each member completes the task assigned to them to receive their passes.");
					cm.dispose();
					return;
				}
				if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
					var data = eim.getProperty(cm.getPlayer().getName()); // Check player's name

					if (data == 0) {
						cm.sendNext("Thank you for bringing the pass. Please give this #v4001008# to your party leader.");
						cm.dispose();
						return;
					}
					if (data == null) {
						data = Math.floor(Math.random() * stage1Questions.length) + 1; // Random question
						eim.setProperty(cm.getPlayer().getName(), data);
						var question = stage1Questions[data - 1];
						cm.sendNext("Welcome to First Companion <Checkpoint 1>. At this stage, you need to hunt nearby monsters to collect the number of passes corresponding to the correct answer for the question I ask.\r\n\r\n" + question);
						cm.dispose();
						return;
					}
					var answer = stage1Answers[data - 1];

					if (cm.getPlayer().itemQuantity(4001007) == answer) {
						cm.sendNext("The answer is correct. You have just received a pass. Please give this #v4001008# to your party leader.");
						cm.gainItem(4001007, -answer);
						cm.gainItem(4001008, 1);
						eim.setProperty(cm.getPlayer().getName(), 0); // Reset for question
						cm.dispose();
						return;
					}
					var question = stage1Questions[eim.getProperty(cm.getPlayer().getName()) - 1];
					cm.sendNext("Sorry, the number of passes you brought does not match the correct answer. Currently, you have: #b#c4001007##k passes.\r\n" + question);
					cm.dispose();
					return;
				}
			}
			cm.sendOk("The portal to the next area has been opened.");
			cm.dispose();
			break;
		case 910340200:
			if (eim.getProperty("stage2") == null) {
				if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
					cm.sendOk("Welcome to First Companion <Checkpoint 2>. Please follow the leader's instructions for this stage.");
					cm.dispose();
					return;
				}
				if (eim.getProperty("stage2a") == null) {
					cm.sendOk("Welcome to First Companion <Checkpoint 2>. You will find some ropes here. Two of them lead to the portal for the next stage. What you need to do is to have two party members #bclimb the correct ropes#k. When the members are in position, please have the leader talk to me.\r\n\r\nNote: If the members are too low, you will not get the correct answer. If you position them correctly, the portal will open.");
					eim.setProperty("stage2a", 1);
					cm.dispose();
					return;
				}
				if (eim.getProperty("stage2b") == null) {
					eim.setProperty("stage2b", (Math.random() < 0.3) ? "0101" : (Math.random() < 0.5) ? "0011" : "1001");
				}
				var chenhui = 0;
				for (var i = 0; i < 4; i++) {
					if (cm.getPlayer().getMap().getNumPlayersItemsInArea(i) > 0) {
						chenhui++;
					}
				}
				if (chenhui != 2) {
					cm.sendOk("It looks like you haven't found the correct method yet. You need to have two members #bclimb the ropes#k to form different combinations.");
					cm.dispose();
					return;
				}
				var x = "";
				for (var i = 0; i < 4; i++) {
					x += cm.getPlayer().getMap().getNumPlayersItemsInArea(i);
				}
				var y = x;
				if (y == eim.getProperty("stage2b")) {
					eim.setProperty("stage2", 1);
					cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("gate", 2));
					cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
					cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
					cm.sendOk("The combination is correct. The portal to the next area has been opened.");
					cm.dispose();
					return;
				}
				cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/wrong_kor", 3));
				cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Failed", 4));
				cm.sendNext("The combination is incorrect. It seems you haven't found the correct 2 ropes. Please adjust the positions again.");
				cm.dispose();
				return;
			}
			cm.sendOk("The portal to the next area has been opened.");
			cm.dispose();
			break;
		case 910340300:
			if (eim.getProperty("stage3") == null) {
				if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
					cm.sendOk("Welcome to First Companion <Checkpoint 3>. Please follow the leader's instructions for this stage.");
					cm.dispose();
					return;
				}
				if (eim.getProperty("stage3a") == null) {
					cm.sendOk("Welcome to First Companion <Checkpoint 3>. You will find some platforms here. Two of them lead to the portal for the next stage. What you need to do is to have two party members #bstand on the correct platforms#k. When they are in position, please have the leader talk to me.\r\n\r\nNote: If the members are too close to the edge, you will not get the correct answer. If you position them correctly, the portal will open.");
					eim.setProperty("stage3a", 1);
					cm.dispose();
					return;
				}
				if (eim.getProperty("stage3b") == null) {
					eim.setProperty("stage3b", (Math.random() < 0.3) ? "00101" : (Math.random() < 0.5) ? "00011" : "10001");
				}
				var chenhui = 0;
				for (var i = 0; i < 5; i++) {
					if (cm.getPlayer().getMap().getNumPlayersItemsInArea(i) > 0) {
						chenhui++;
					}
				}
				if (chenhui != 2) {
					cm.sendOk("It looks like you haven't found the correct method yet. You need to have two members #bstand on the platforms#k to form different combinations.");
					cm.dispose();
					return;
				}
				var x = "";
				for (var i = 0; i < 5; i++) {
					x += cm.getPlayer().getMap().getNumPlayersItemsInArea(i);
				}
				var y = x;
				if (y == eim.getProperty("stage3b")) {
					eim.setProperty("stage3", 1);
					cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("gate", 2));
					cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
					cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
					cm.sendOk("The combination is correct. The portal to the next area has been opened.");
					cm.dispose();
					return;
				}
				cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/wrong_kor", 3));
				cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Failed", 4));
				cm.sendNext("The combination is incorrect. It seems you haven't found the correct 2 platforms. Please adjust the positions again.");
				cm.dispose();
				return;
			}
			cm.sendOk("The portal to the next area has been opened.");
			cm.dispose();
			break;
		case 910340400:
			if (eim.getProperty("stage4") == null) {
				if (cm.getPlayer().itemQuantity(4001008) > 18) {
					cm.sendOk("Great job! The portal to the next area has been opened.");
					cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("gate", 2));
					cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
					cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
					eim.setProperty("stage4", 1);
					cm.gainItem(4001008, -19);
					cm.dispose();
					return;
				}
				cm.sendOk("Hello, welcome to First Companion <Checkpoint 4>. Walk around the map to find some monsters. Defeat all the monsters and collect all the passes before handing them to me.");
				cm.dispose();
				return;
			}
			cm.sendOk("The portal to the next area has been opened.");
			cm.dispose();
			break;
		case 910340500:
			if (eim.getProperty("stage5") == null) {
				if (cm.getMap(910340500).getAllMonstersThreadsafe().size() < 1) {
					cm.sendNext("Congratulations on completing all challenges. Please wait to be teleported to the final reward stage, where the monsters are easier to defeat. You will have some time to hunt as much as possible or you can talk to the NPC to end it early.");
					cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Congratulations on completing all challenges. Please wait to be teleported to the final reward stage, where the monsters are easier to defeat. You will have some time to hunt as much as possible or you can talk to the NPC to end it early."));
					cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
					cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
					cm.getEventInstance().startEventTimer(1 * 10000);
					eim.setProperty("stage5", 1);
					cm.dispose();
					return;
				}
				cm.sendOk("Hello, welcome to First Companion <Final Checkpoint>. This is the final stage. Defeat the #bGreen Water Spirit King#k in the map to enter the reward stage.");
				cm.dispose();
				return;
			}
			cm.sendOk("Please wait patiently. After the countdown, you will enter the final reward stage.");
			cm.dispose();
			break;
	}
}
