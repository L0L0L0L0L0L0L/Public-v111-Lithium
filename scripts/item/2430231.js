/*
	名字:	提神飲料-胡蘿蔔汁礦泉水
	地圖:	提神飲料-胡蘿蔔汁礦泉水
	描述:	特殊消耗品
*/

function start() {
	var time = parseInt(im.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2430231)).getCustomData());
	if (time + (1 * 60000) > im.getCurrentTime()) {
		im.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "You can only use one energy drink per 10 minutes."));
		im.dispose();
		return;
		}
	if (im.getPlayer().getFatigue() < 1) {
		im.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(5, "The character is full of energy and does not need to be used."));
		im.dispose();
		return;
		}
		im.gainItem(2430231, -1);
		im.getPlayer().setFatigue(im.getPlayer().getFatigue() - 40);
		im.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(2430231)).setCustomData("" + im.getCurrentTime());
		im.dispose();
}