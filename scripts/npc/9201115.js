/*
    Name:    War Statue
    Map:     Master Council Hall
    Description:    610030600
*/

function start() {
	if (cm.getPlayer().getMap().getReactorByName("mob1").getState() == 0) {
		cm.sendNext("Welcome to the Master Council Hall. I will be your host tonight… oh… hahaha.");
	}
	if (cm.getPlayer().getMap().getReactorByName("mob1").getState() == 1) {
		if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
			cm.sendOk("Hahaha… You can go and greet my guardians… hahaha…");
			cm.dispose();
			return;
		}
		cm.sendNext("Uh!!!! Where are my lovely guardians? How dare you do such an impudent thing, unforgivable.");
	}
	if (cm.getPlayer().getMap().getReactorByName("mob1").getState() == 2) {
		if (cm.getPlayer().getMap().getAllMonstersThreadsafe().size() > 0) {
			cm.sendOk("Hahaha… The Masters of the guardians are welcoming you… hahaha…!!");
			cm.dispose();
			return;
		}
		cm.sendNext("What? Ah… this cannot be happening. You actually defeated the Masters of the guardians, no!!!");
		cm.dispose();
	}
}


function action(mode, type, selection) {
	if (mode > 0)
	if (cm.getPlayer().getMap().getReactorByName("mob1").getState() == 0) {
		cm.sendNext("我正在為你們的到來準備盛大的歡迎典禮…哦……想想都興奮…hahaha。");
		cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "請注意！！！守護者的軍團已經來了"));

		for (var i = 0; i < 15; i++)
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9400594), new java.awt.Point(-872 + (Math.random() * 2000), 276));
		for (var i = 0; i < 15; i++)
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9400582), new java.awt.Point(-872 + (Math.random() * 2000), 276));
		cm.getPlayer().getMap().getReactorByName("mob1").forceHitReactor(1);
		cm.dispose();
		return;
		}
	if (cm.getPlayer().getMap().getReactorByName("mob1").getState() == 1) {
		cm.sendNext("接下來，為你們引薦一些守護者的大師們，哦……hahaha。");
		cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "請注意！！！守護者的大師們已經來了"));

		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9400589), new java.awt.Point(-391, 276));
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9400590), new java.awt.Point(-291, 276));
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9400591), new java.awt.Point(-117, 276));
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9400592), new java.awt.Point(75, 276));
		cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9400593), new java.awt.Point(233, 276));

		cm.getPlayer().getMap().getReactorByName("mob1").forceHitReactor(2);
		}
		cm.dispose();
}