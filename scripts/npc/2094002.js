/*
    Name: Qiu Weng
    Map: Path to the Pirate Ship
    Description: 925100000
*/

var item = [4001117, 4001120, 4001121, 4001122];

function start() {
	switch(cm.getPlayer().getMap().getId()) {
		case 925100000:
			if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() < 1) {
				cm.sendOk("Sir, the pirates along the way have been eliminated. We can now proceed to board the pirate ship.");
				cm.dispose();
				return;
			}
			cm.sendOk("Sir, this is a necessary path to the pirate ship. We must first eliminate the nearby pirates before we can board the ship.");
			cm.dispose();
			break;
		case 925100100:
			if (cm.getPlayer().getMap().getReactorByName("treasure1").getState() > 0) {
				cm.sendOk("Sir, we can continue moving forward now.");
				cm.dispose();
				return;
			}
			var qty = cm.getMap(925100100).getCharacters().size();
			if (cm.getPlayer().itemQuantity(4001120) < 5 * qty || cm.getPlayer().itemQuantity(4001121) < 5 * qty || cm.getPlayer().itemQuantity(4001122) < 5 * qty) {
				cm.sendOk("Sir, to enter the interior of the pirate ship, you need to collect #b#t4001120##k, #b#t4001121##k, and #b#t4001122##k, each " + 5 * qty + " pieces from the nearby pirates and give them all to me.");
				cm.dispose();
				return;
			}
			cm.sendOk("Sir! All the pirate symbols have been collected, and we can proceed through the ship's passage to the next area.");
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "It is truly touching! All the pirate symbols have been collected, and we can proceed through the ship's passage to the next area."));
			cm.gainItem(4001120, -5 * qty);
			cm.gainItem(4001121, -5 * qty);
			cm.gainItem(4001122, -5 * qty);
			cm.getPlayer().getMap().getReactorByName("treasure1").forceHitReactor(1);
			//cm.getPlayer().getMap().killAllMonsters(true);
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
			cm.dispose();
			break;
		case 925100200:
			if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() < 1) {
				cm.sendOk("Sir, I am very worried about my grandson. We should speed up our progress.");
				cm.dispose();
				return;
			}
			cm.sendOk("Sir, please eliminate all the guards here. If you feel appropriate, you may also enter the ship's cabin to see if there are other discoveries.");
			break;
		case 925100201:
			if (cm.getPlayer().getMap().getReactorByName("treasure" + 1).getState() > 1) {
				cm.sendOk("Sir, the pirate's #btreasure#k was taken by us, which he never expected.");
				cm.dispose();
				return;
			}
			if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() < 1) {
				cm.sendOk("Sir, the pirate king's treasure chest has appeared here. If you find a #bkey#k from the nearby area, you can open the chest, which will make him very angry.");
				cm.dispose();
				return;
			}
			cm.sendOk("Sir, this place may contain the pirate king's treasure. If you have enough time, make sure to find the #btresure#k.");
			break;
		case 925100202:
			if (cm.getPlayer().getMap().getMonsterById(9300107) != null) {
				cm.sendOk("Sir, the spying pirate king is guarding this area. It would be great if we could eliminate it.");
				cm.dispose();
				return;
			}
			if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
				cm.sendOk("Sir, these are the pirate king's trusted subordinates. They usually do some heinous deeds. If you feel appropriate, please #beliminate#k them.");
				cm.dispose();
				return;
			}
			cm.sendOk("Sir, the pirates in this area have been eliminated.");
			break;
		case 925100300:
			if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() < 1) {
				cm.sendOk("Sir, I am increasingly worried about my grandson. I really want to see him soon.");
				cm.dispose();
				return;
			}
			cm.sendOk("Sir, I can already sense my grandson's presence. We must quickly eliminate all the guards here to continue.");
			break;
		case 925100301:
			if (cm.getPlayer().getMap().getReactorByName("treasure" + 2).getState() > 1) {
				cm.sendOk("Sir, the pirate king's treasure chest hidden here has been found. He will surely be very angry.");
				cm.dispose();
				return;
			}
			if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() < 1) {
				cm.sendOk("Sir, the pirate king's treasure chest has appeared here. If you have a #bkey#k, you can open the chest, which will make him very angry.");
				cm.dispose();
				return;
			}
			cm.sendOk("Sir, there may also be the pirate king's treasure here. If there is still plenty of time, be sure to find the #btreasure#k.");
			break;
		case 925100302:
			if (cm.getPlayer().getMap().getMonsterById(9300107) != null) {
				cm.sendOk("Sir, the spying pirate king has appeared here. We need to quickly eliminate it.");
				cm.dispose();
				return;
			}
			if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
				cm.sendOk("Sir, these are the pirate king's trusted subordinates. If you feel appropriate, please eliminate them.");
				cm.dispose();
				return;
			}
			cm.sendOk("Sir, the pirates in this area have been eliminated. We should leave here quickly.");
			break;
		case 925100400:
			for (var i = 1; i < 5; i++)
				if (cm.getPlayer().getMap().getReactorByName("sMob" + i).getState() < 1) {
					cm.sendOk("Sir, I heard my grandson's cries. I believe he is nearby. Now we must find the keys from the nearby monsters and close all the doors to the cabin to prevent more #bpirate reinforcements#k.");
					cm.dispose();
					return;
				}
			cm.sendOk("Sir, entering the passage ahead, we will directly face the pirate king. If you are ready, let's go now.");
			break;
		case 925100500:
			if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
				cm.sendOk("Sir, do you see? My grandson has been captured by the pirate king. Please rescue him as soon as possible.");
				cm.dispose();
				return;
			}
			cm.sendOk("Sir, I am so touched. Thank you for saving my grandson. I owe you a favor.");
			break;
		case 925100700:
			for (var i = 0; i < item.length; i++)
				cm.removeAll(item[i]);
			cm.getPlayer().changeMap(cm.getMap(251010404), cm.getMap(251010404).getPortal(0));
			break;
	}
	cm.dispose();
}
