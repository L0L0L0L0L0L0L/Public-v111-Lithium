/*
	名字:	瑞恩島
	地圖:	冰雪洞窟
	描述:	140090000
*/

function start() {
	ms.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(20000014), -1, 0, -1);
	ms.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(20000015), -1, 0, -1);
	ms.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(20000016), -1, 0, -1);
	ms.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(20000017), -1, 0, -1);
	ms.getPlayer().changeSingleSkillLevel(Packages.client.SkillFactory.getSkill(20000018), -1, 0, -1);
	ms.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.IntroLock(0));
	ms.dispose();
}