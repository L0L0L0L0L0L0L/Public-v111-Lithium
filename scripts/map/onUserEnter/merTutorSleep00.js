/*
	名字:	精靈之林
	地圖:	國王休息處
	描述:	910150005
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction5.img/mersedesTutorial/Scene0"));
	ms.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(20020111), -1, 0, -1);
	ms.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(20021166), -1, 0, -1);
	ms.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(20021181), -1, 0, -1);
	ms.dispose();
}