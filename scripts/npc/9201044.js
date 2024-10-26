/*
    Name:    Hero Amias
    Map:     Stage 1 - Magic Mirror
    Description:    670010200
*/

var mobid = [210100, 1110101, 1140100, 2100100, 2100104, 2230103, 2230200, 3110101, 3210200, 3230200, 4110300, 4230101, 4230111, 4230116, 4230126, 4230502, 4250001, 5100004, 5120003, 5130100, 5300001, 6230200, 6230400, 6400000, 7130001, 7130004, 7130100, 7130501, 7160000, 8140102, 8140600];

function start() {
	var eim = cm.getPlayer().getEventInstance();
	switch (cm.getPlayer().getMap().getId()) {
		case 670010200:
			if (eim.getProperty("stage0") == null) {
				cm.sendOk("Hello, welcome to the Amias Challenge Stage. At this stage, please find the Glowing Person to get further details on your task. Once you meet the requirements, return here to receive the next challenge.");
				cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("gate1", 2));
				eim.setProperty("stage0", 0);
				cm.dispose();
				return;
			}
			if (eim.getProperty("stage0") == 3) {
				cm.sendOk("The portal to the next stage is now open. Please proceed to the next stage.");
				cm.dispose();
				return;
			}
			if (eim.getProperty("stage0") == 2) {
				cm.sendOk("Oh! Nice work, you successfully completed the first stage. The portal to the next area is now open. Good luck.");
				cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("gate" + val, 2));
				cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
				cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
				var val = Math.floor(Math.random() * 3);
				eim.setProperty("stage0a", val);
				eim.setProperty("stage0", 3);
				cm.dispose();
				return;
			}
			cm.sendOk("Please pass through the nearby portal to talk to the Glowing Person. They will give you further details on your task. Once you meet the requirements, return here to receive the next challenge.");
			cm.dispose();
			break;
		default:
			if (eim.getProperty("stage1") == null) {
				if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
					cm.sendOk("Welcome to Stage 2 of the Amias Challenge. In this stage, you need #b2 players#k to climb on the ropes in the area to form different combinations. The leader will then determine the solution with me.");
					cm.dispose();
					return;
				}
				if (eim.getProperty("stage1a") == null) {
					cm.sendOk("Welcome to Stage 2 of the Amias Challenge. You will see some ropes, with #btwo of them connecting#k to the portal to the next stage. You need to have #rtwo team members#k climb the correct ropes. Once your members are in place, please have the team leader talk to me.\r\n\r\nNote: If you climb too low, you won't get the correct answer. If your combination is correct, the portal will open.");
					eim.setProperty("stage1a", 1);
					cm.dispose();
					return;
				}
				if (eim.getProperty("stage1b") == null) {
					eim.setProperty("stage1b", (Math.random() < 0.3) ? "011" : (Math.random() < 0.5) ? "110" : "101");
				}
				var chenhui = 0;
				for (var i = 0; i < 3; i++)
					if (cm.getPlayer().getMap().getNumPlayersItemsInArea(i) > 0) {
						chenhui++;
					}
				if (chenhui != 2) {
					cm.sendOk("It looks like you haven't found the correct solution yet. Two team members need to #bclimb the ropes#k to form different combinations.");
					cm.dispose();
					return;
				}
				var x = "";
				for (var i = 0; i < 3; i++)
					x += cm.getPlayer().getMap().getNumPlayersItemsInArea(i);
				y = x;
				if (y == eim.getProperty("stage1b")) {
					cm.sendOk("The combination is correct. The portal to the next stage is now open.");
					cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "Amias: The combination is correct. The portal to the next stage is now open."));
					cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("gate", 2));
					cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
					cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
					eim.setProperty("stage1", "1");
					cm.dispose();
					return;
				}
				for (var i = 0; i < 4; i++)
					if (Math.random() < 0.2) cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(mobid[parseInt(Math.random() * mobid.length)]), new java.awt.Point(-295 + (Math.random() * 500), -840));

				cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/wrong_kor", 3));
				cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Failed", 4));
			}
			cm.sendOk("The portal to the next stage is now open. I heard the following stages will be more challenging.");
			cm.dispose();
	}
}
