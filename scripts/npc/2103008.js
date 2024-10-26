/*
	名字:	奇妙之聲
	地圖:	岩石山丘
	描述:	260010401
*/

function start() {
	cm.sendGetText("If you want to open the door, then yell out the magic word...");
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (cm.getText() == "Open Sesame" || cm.getText() == "") {
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "When l yelled out the password, this mysterious force leads me inside the cave."));
			cm.getPlayer().changeMap(cm.getMap(260010402), cm.getMap(260010402).getPortal(1));
			cm.dispose();
			return;
			}
			cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The door doesn't seem to budge."));
			}
			cm.dispose();
}