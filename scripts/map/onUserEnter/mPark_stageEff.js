/*
	名字:	石巨人寺院
	地圖:	第1階段 : 石巨人寺院1
	描述:	952000000
*/

function start() {
	switch ((ms.getPlayer().getMap().getId() / 100) % 100) {
	case 5:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("monsterPark/stageEff/final", 3));
		break;
	default:
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("monsterPark/stageEff/stage", 3));
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange("monsterPark/stageEff/number/" + (((ms.getPlayer().getMap().getId() / 100) % 100) + 1), 3));
		}
		ms.getPlayer().dropMessage(-1, "All monsters must be eliminated before proceeding to the next stage.");
		ms.getPlayer().dropMessage(-1, "Each member can gain a 20% experience point increase.");
		ms.dispose();
}