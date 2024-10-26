/*
	Name: Xing'er
	Map: Moon Bunny Hill
	Description: 910010000
*/

function start() {
	cm.sendSimple("This is Moon Bunny Hill. When all 6 seeds are planted, a full moon will appear in the sky, summoning the Moon Bunny. When the Moon Bunny starts pounding rice cakes, monsters will continuously appear to disturb it. You must protect the Moon Bunny from harm and collect the rice cakes. If the Moon Bunny dies along the way, you will fail the mission, and I will be hungry....\r\n#L0##bGive you 10 rice cakes#l");
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (cm.getPlayer().itemQuantity(4001101) < 10) {  // Checks if the player has less than 10 rice cakes
			cm.sendOk("I'm too hungry, I need 10 #v4001101##b#t4001101##k.");
			cm.dispose();
			return;
		}
		cm.gainItem(4001101, -10);  // Deducts 10 rice cakes from the player
		cm.givePartyNX(250);  // Grants 250 NX to the entire party
		cm.addPartyTrait("charm", 1);  // Increases Charm for the party
		cm.addPartyTrait("craft", 1);  // Increases Craft for the party
		cm.addPartyTrait("charisma", 1);  // Increases Leadership (Charisma) for the party
		cm.addPartyTrait("will", 5);  // Increases Willpower for the party
		cm.addPartyTrait("sense", 1);  // Increases Sensibility for the party
		cm.addPartyTrait("insight", 1);  // Increases Insight for the party
		cm.getPlayer().endPartyQuest(1200);  // Ends the party quest with a score of 1200
		cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));  // Displays a "clear" message
		cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));  // Displays another "clear" message
		cm.getPlayer().getEventInstance().setProperty("stage0", 1);  // Sets the completion condition for stage 0
		cm.getPlayer().getEventInstance().startEventTimer(10 * 1000);  // Starts a 10-second countdown timer
		cm.sendOk("Oh~~ I can eat delicious rice cakes again, thank you!");
	}
	cm.dispose();
}
