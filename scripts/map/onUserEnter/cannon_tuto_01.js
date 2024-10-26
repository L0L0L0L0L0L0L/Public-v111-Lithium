/*
	名字:	可可島
	地圖:	維多利亞島
	描述:	3000000
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroEnableUI(1));
	ms.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(110), 1, 1, -1);
	ms.dispose();
	ms.openNpc(1096000);
}