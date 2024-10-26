/*
	名字:	威廉的古堡
	地圖:	威廉的古堡城門
	描述:	990000300
*/

function padWithZeroes(n, width) {
	while(n.length < width) n = '0' + n;
	return n;
}

function act() {
	var eim = rm.getPlayer().getEventInstance();
	if (eim != null) {
		var status = eim.getProperty("stage1");
	if (status != null && !status.equals("waiting")) {
		var stage = parseInt(eim.getProperty("stage1phase"));
	if (status.equals("display")) {

		var prevCombo = eim.getProperty("stage1combo");

		var n = "" + (rm.getReactor().getObjectId() % 1000);
		prevCombo += padWithZeroes(n, 3);

		eim.setProperty("stage1combo", prevCombo);
	if (prevCombo.length == (3 * (stage + 3))) {
		eim.setProperty("stage1", "active");
		rm.getPlayer().getMap().broadcastMessage(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The combo has been displayed; Proceed with caution."));
		eim.setProperty("stage1guess", "");
		}
		}
	if (status.equals("active")) {
		var prevGuess = "" + eim.getProperty("stage1guess");
		if (prevGuess.length != (3 * (stage + 3))) {
			var n = "" + (rm.getReactor().getObjectId() % 1000);
			prevGuess += padWithZeroes(n, 3);

			eim.setProperty("stage1guess", prevGuess);
}
}
}
}
}