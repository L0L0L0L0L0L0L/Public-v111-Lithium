/*
	Name: Duke William's Soul
	Map: Duke William's Tomb
	Description: 990000700
*/

function start() {
	if (cm.getPlayer().getMap().getReactorByName("ghostgate").getState() > 0) {
		cm.sendOk("After what I thought was an eternal slumber, I have finally found someone who can save Sharion. Now I can truly rest.");
		cm.dispose();
		return;
	}
	if (cm.getPlayerStat("GRANK") < 3) {
		cm.sendOk("After what I thought was an eternal slumber, I have finally found someone who can save Sharion. The entrance to the next area has been opened.");
		cm.getGuild().gainGP(500);
		cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("quest/party/clear", 3));
		cm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.EtcPacket.environmentChange("Party1/Clear", 4));
		cm.getPlayer().getMap().getReactorByName("ghostgate").forceHitReactor(1);
		cm.dispose();
		return;
	}
	cm.sendOk("Sorry, I want to speak with the person in charge of this guild mission.");
	cm.dispose();
}
