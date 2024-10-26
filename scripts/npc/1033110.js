/*
	名字:	音樂盒
	地圖:	櫻花處
	描述:	101050000
*/

var songs = [["rising Star", "BgmEvent2.img/risingStar"], ["Moonlight Shadow", "Bgm01/MoonlightShadow"], ["When The Morning Comes", "BgmJp/WhenTheMorningComes"], ["Flying In A Blue Dream", "Bgm06/FlyingInABlueDream"], ["Fantasia", "Bgm07/Fantasia"], ["Fairy Tale (Diff ver.)", "Bgm09/FairyTalediffvers"], ["Minar's Dream","Bgm13/Minar'sDream"], ["ElinForest", "Bgm15/ElinForest"], ["TimeTemple", "Bgm16/TimeTemple"], ["Queens Garden","Bgm18/QueensGarden"], ["Wind And Flower","Bgm25/WindAndFlower"]];

function start() {
	var chat = "A beautiful, flower-shaped Orgel manufactured in Elluel. You can play a variety of music with this Orgel. Note: To full appreciate this wonderful music, you will need your SFX Sound Option enabled. #b";
	for (var i = 0; i < songs.length; i++)
	chat += "\r\n#L" + i + "#" + songs[i][0] + "#l";
	cm.sendSimple(chat);
}

function action(mode, type, selection) {
	if (mode > 0) {
		if (selection < 1 && cm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(24101)).getStatus() == 1) {
			Packages.server.quest.MapleQuest.getInstance(24103).forceStart(cm.getPlayer(), 0, 1);
			}
			cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.environmentChange(songs[selection][1], 6));
			}
			cm.dispose();
}