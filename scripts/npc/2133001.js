/*
    Name:    Eilin
    Map:     Toxic Fog Forest
    Description: 930000000
*/

var map = [930000000, 930000100, 930000200, 930000600, 930000700];

var Text = [
	"Thank you very much for coming here to help with the situation in the Toxic Fog Forest. The entrance will lead to a dangerous area, so please be prepared.",
	"The poisoned Ancient Tree Spirits have taken over this area. We must eliminate all these contaminated monsters to proceed.",
	"A large thorny vine is blocking the way forward. To remove this obstacle, we need to find diluted poison to stop the overgrown spine vines. However, the poison in its natural state is too concentrated to handle, so we need to dilute it at the nearby #bSpring#k.",
	"The root of the problem in the Eilin Forest is here. Place the obtained magical stone on the altar to summon the monster and defeat it.",
	"Thank you for your help. The Toxic Fog Forest has been purified."
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
			if (status < 1) {
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
			var eim = cm.getPlayer().getEventInstance();
			for (var i = 0; i < map.length; i++) {
				if (cm.getPlayer().getMap().getId() == map[i]) {
					cm.sendOk(Text[i]);
					cm.dispose();
					return;
				}
			}
			if (cm.getPlayer().getMap().getId() == 930000300) {
				cm.sendNext("Finally, I see you. I was worried you might get lost in the Dense Fog Forest. Now you can continue exploring deeper into the woods.");
			}
			if (cm.getPlayer().getMap().getId() == 930000400) {
				if (eim.getProperty(cm.getPlayer().getName()) == null) { // Check if team member has received items
					if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
						cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(1, "Not enough slots in the consumables inventory"));
						cm.dispose();
						return;
					}
					cm.sendOk("The poisoned little fairies nearby are not ordinary monsters. They grow very quickly, and #bnormal attacks and magic attacks are ineffective#k. Please take these 10 #v2270004# and purify the poisoned little fairies nearby. When the monsters' health decreases, use the Purification Orb to capture them.");
					eim.setProperty(cm.getPlayer().getName(), 1); // Record item collection by team member
					cm.gainItem(2270004, 10);
					cm.dispose();
					return;
				}
				if (cm.getPlayer().itemQuantity(4001169) < 10) {
					cm.sendOk("Please purify these contaminated monsters. The entire team needs to collect 10 #b#z4001169##k and give them to me. When the monsters' health decreases, use the Purification Orb to capture them.");
					cm.dispose();
					return;
				}
				cm.sendNext("Well done! The entire team has collected 10 monster orbs. We can now proceed deeper into the forest.");
			}
			break;
		case 1:
			if (cm.getPlayer().getMap().getId() == 930000300) {
				cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "A team member has passed through the Dense Fog Forest. There are " + (cm.getMap(930000300).getCharacters().size() - 1) + " team members lost in the fog."));
				cm.getPlayer().changeMap(cm.getMap(930000400), cm.getMap(930000400).getPortal(0));
				cm.dispose();
				return;
			}
			cm.gainItem(4001169, -10);
			cm.warpParty(930000500, 0);
			// cm.getPlayer().changeMap(cm.getMap(930000500), cm.getMap(930000500).getPortal(0));
			cm.dispose();
	}
}
