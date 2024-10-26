/*
	名字:	瑞恩島
	地圖:	瑞恩西邊平原
	描述:	140010000
*/

function start() {
	if (ms.getPlayer().getInfoQuest(21019).indexOf("arr=o") != -1) {
		ms.dispose();
		return;
		}
		ms.getPlayer().updateInfoQuest(21019, ms.getPlayer().getInfoQuest(21019) + ";arr=o");
		ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.AranTutInstructionalBalloon("Effect/OnUserEff.img/guideEffect/aranTutorial/tutorialArrow3"));
		ms.dispose();
}