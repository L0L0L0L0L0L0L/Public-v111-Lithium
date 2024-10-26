/*
	名字:	霧之海
	地圖:	鬼盜船航海室
	描述:	923020100
*/

function start() {
	ms.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.sendPyramidEnergy("PRaid_expPenalty", "0"));
	ms.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.sendPyramidEnergy("PRaid_ElapssedTimeAtField", "0"));
	ms.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.sendPyramidEnergy("PRaid_Point", "-1"));
	ms.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.sendPyramidEnergy("PRaid_Bonus", "-1"));
	ms.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.sendPyramidEnergy("PRaid_Total", "-1"));
	ms.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.sendPyramidEnergy("PRaid_Team", ""));
	ms.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.sendPyramidEnergy("PRaid_IsRevive", "0"));

	ms.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.sendGhostPoint("PRaid_Point", "-1"));

	ms.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.sendGhostStatus("Red_Stage", "1"));
	ms.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.sendGhostStatus("Blue_Stage", "1"));
	ms.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.sendGhostStatus("redTeamDamage", "0"));
	ms.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.sendGhostStatus("blueTeamDamage", "0"));
	ms.dispose();
}