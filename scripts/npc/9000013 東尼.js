/*
    Name: Tony
    Map: Toy City
    Description: 220000000
*/

var Text = [
	["[Climbing Up Stairs]\r\n\r\nThis is a ladder climbing game where participants need to continuously climb ladders, choose paths, and move between maps until they reach the destination. \r\n\r\nThe game consists of three stages, with a time limit of #b6 minutes#k. During the entire game, you cannot jump, teleport, accelerate, or use any enhancement potions. There will also be some traps along the way that could mislead you, so please be cautious."],
	["[Heading to the Highlands]\r\n\r\nThis is an obstacle course competition, similar to the Forest of Patience. Use your wisdom to reach the final destination within the specified time.\r\n\r\nThe game consists of four stages, with a time limit of #b15 minutes#k. During the entire game, you cannot teleport, accelerate, or use any enhancement potions."],
	["[Snowball Fight]\r\n\r\nA competitive event where two teams roll snowballs as far and as large as possible within the time limit. \r\n\r\nDuring the game, only #bnormal attacks#k can be used. Press #b「Ctrl」#k to attack and roll the snowball. Players cannot touch the snowball with their bodies during the rolling process, or they will be forced to return to the starting point. This is a well-planned strategic event, and only through teamwork can you achieve ultimate victory."],
	["[Coconut Smash]\r\n\r\nA competitive event where two teams compete to collect the most coconuts within the time limit.\r\n\r\nThe game time limit is #b5 minutes#k. If the game ends in a tie, a 2-minute overtime match will determine the final result. If it is still tied, the game will end in a draw.\r\n\r\nOnly #bnormal attacks#k can be used. If you don't have a close-range attack weapon, you can purchase one from the NPC on the map. All damage values will be the same regardless of character level, weapon, or skills.\r\n\r\nBe careful of obstacles and traps on the map. If your character dies during the game, they will be removed from the game."],
	["[OX Quiz]\r\n\r\nThe quiz game is a test of intelligence in MapleStory. Once you join the event, press #b「M」#k to open the mini-map to see X or O.\r\n\r\nThe game is simple: when a question appears on the screen, stand in the corresponding position on the map according to your judgment."],
	["[Treasure Hunt]\r\n\r\nThis is an event to find hidden items on the map. Your goal is to find #bTreasure Scrolls#k.\r\n\r\nThe game time limit is #b10 minutes#k. Search for hidden mysterious treasure chests on the map. Once you find them, use the #b「Ctrl」#k key to attack and break the chests to obtain the items inside."]
];

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
			if (status < 3) {
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
			cm.sendNext("Hey, I'm #b#p9000001##k. I'm waiting for my brother #b#p9000000##k. He should be around here...");
			break;
		case 1:
			cm.sendNextPrev("We're planning to join some nearby events. Many people are rushing to sign up...");
			break;
		case 2:
			cm.sendSimple("Hey... do you want to join me? I think my brother should be waiting for us at the event map with others.\r\n#L0##e1.#n#bWhy are these events held?#k#l\r\n#L1##e2.#n#bWhat events are there?#k#l\r\n#L2##e3.#n#bLet's get started!#k#l");
			break;
		case 3:
			if (selection == 0) {
				cm.sendNext("MapleStory is celebrating its anniversary this month, and GMs will hold surprise events, so stay tuned to make sure you don't miss them.");
				cm.dispose();
			}
			if (selection == 1) {
				cm.sendSimple("There are many events in this competition, so it's best to understand the rules of these events before participating. It will be very helpful to you. Please choose an event you're interested in.#b\r\n#L0# Climbing Up Stairs#l\r\n#L1# Heading to the Highlands#l\r\n#L2# Snowball Fight#l\r\n#L3# Coconut Smash#l\r\n#L4# OX Quiz#l\r\n#L5# Treasure Hunt#l#k");
			}
			if (selection == 2) {
				if (cm.getEvent() != null && cm.getEvent().getLimit() > 0) {
					cm.getPlayer().saveLocation("EVENT");
					if (cm.getEvent().getMapId() == 109080000 || cm.getEvent().getMapId() == 109060001)
						cm.divideTeams();
					cm.getEvent().minusLimit();
					cm.getPlayer().changeMap(cm.getMap(cm.getEvent().getMapId()), cm.getMap(cm.getEvent().getMapId()).getPortal(0));
					cm.dispose();
					return;
				}
				cm.sendNext("The event is not open yet or you have already participated in the event today. Please wait patiently.");
				cm.dispose();
			}
			break;
		case 4:
			cm.sendOk(Text[selection]);
			cm.dispose();
	}
}
