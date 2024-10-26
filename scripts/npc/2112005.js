/*
    Name: Juliet
    Map: Special Laboratory
    Description: 926110200
*/

function start() {
	if (cm.getPlayer().getMap().getId() == 926110200) {
		if (cm.getPlayer().getMap().getReactorByName("jnr3_out3").getState() > 0) {
			cm.sendNext("Please hurry, I am very worried about Juliet.");
			cm.dispose();
			return;
		}
		if (cm.getPlayer().itemQuantity(4001130)) {
			cm.sendNext("Romeo's letter! I am very grateful that you found this letter and brought it to me. We must find my beloved as soon as possible.");
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Juliet sees Romeo's letter and seems very shocked"));
			cm.getMap(926110401).getReactorById(2619002).forceHitReactor(1); // Trigger the reactor to summon an angry Falang Keloid
			cm.gainItem(4001130, -1);
			cm.dispose();
			return;
		}
		if (cm.getPlayer().itemQuantity(4001134) && cm.getPlayer().itemQuantity(4001135)) {
			cm.gainItem(4001134, -1);
			cm.gainItem(4001135, -1);
			cm.sendNext("We have obtained the files for #b#v4001134##z4001134##k and #b#v4001135##z4001135##k. Now we can proceed to the next area through the door.");
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "The entrance to the next area has been opened"));
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
			cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
			cm.getPlayer().getMap().getReactorByName("jnr3_out3").forceHitReactor(1);
			cm.getPlayer().getMap().killAllMonsters(true);
			cm.getMap(926110200).setSpawns(false); // Restrict monster spawning
			cm.dispose();
			return;
		}
		cm.sendOk("We need to search around here. Please bring me the files for #b#v4001134##t4001134##k and #b#v4001135##t4001135##k.");
		cm.dispose();
		return;
	}
	if (cm.getPlayer().getMap().getId() == 926110401) {
		cm.sendNext(cm.getPlayer().getMap().getMonsterById(9300138) != null ? "Thank you very much for your help. You saved Romeo from Yulita. Let’s leave this laboratory now." : "Thank you very much for your help. Although we couldn’t save Romeo, we have eliminated Yulita's threat. Let’s leave this laboratory now.");
	}
}

function action(mode, type, selection) {
	if (mode > 0) {
		map = cm.getPlayer().getMap().getMonsterById(9300138) != null ? 926110600 : 926110500;
		cm.getPlayer().changeMap(cm.getMap(map), cm.getMap(map).getPortal(0));
	}
	cm.dispose();
}
