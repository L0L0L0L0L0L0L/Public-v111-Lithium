/*
    Name: Yulita
    Map: Yulita's Office
    Description: 926110203
*/

function start() {
	var eim = cm.getPlayer().getEventInstance();
	if (eim.getProperty("stage7") != null) {
		cm.sendOk(eim.getProperty("stage7") == 1 ? "Hahaha, Farang Kenloid is the pinnacle of Magatia's alchemy, hahahahaha..." : "No... I have been defeated. Everything I did was for the development of a greater alchemy. I did what anyone in my position would do! No!!! They only decided to obstruct the development of science because they think science is dangerous.");
		cm.dispose();
		return;
	}
	if (cm.getPlayer().getMap().getId() == 926110401) {
		cm.sendNext("What... how did you get here? I had closed all the entrances to this place. Anyway, this situation will be resolved soon. It seems I need to show you my latest weapon, the best alchemical combination from the Montpeau Association and the Capale Association, #bFarang Kenloid#k!");
		cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Yulita: What... how did you get here? I had closed all the entrances to this place. Anyway, this situation will be resolved soon. It seems I need to show you my latest weapon, the best alchemical combination from the Montpeau Association and the Capale Association, Farang Kenloid"));
		mob = cm.getPlayer().getMap().getReactorById(2619002).getState() > 0 ? 9300151 : 9300152;
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(mob), new java.awt.Point(250, 100));
		eim.setProperty("stage7", 1);
		cm.dispose();
		return;
	}
	cm.sendNext("Ha~~ you are very cunning. However, I have been monitoring your actions since you entered. Now that you are in this area, don’t worry, my assistants will take care of you, ha... ha... ha... I’ll retreat for now.");
	cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Yulita: Ha~~ you are very cunning. However, I have been monitoring your actions since you entered. Now that you are in this area, don’t worry, my assistants will take care of you, ha... ha... ha... I’ll retreat for now"));
	cm.removeNpc(cm.getPlayer().getMap().getId(), cm.getNpc());
	for (var i = 0; i < 20; i++) {
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300143), new java.awt.Point(-500 + (Math.random() * 900), 243));
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9300144), new java.awt.Point(-500 + (Math.random() * 900), 243));
	}
	cm.dispose();
}
