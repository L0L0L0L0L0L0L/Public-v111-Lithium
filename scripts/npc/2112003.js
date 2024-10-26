/*
	名字:	茱麗葉
	地圖:	卡帕萊特祕密之室
	描述:	261000021
*/

var map = [926110000, 926110001, 926110100, 926110300, 926110400];

var Text = ["很感謝你來幫助我，首先我們要找到進入實驗室的入口，圖書館裏到處亂堆放的書，也許會有什麼發現也說不定。",
	"聚集在這裡的怪物，阻擋了我們前進的道路，讓我們先消滅掉這些怪物，然後繼續前進。",
	"在這個房間裏，我們必須修復好那些燒杯的漏洞，才能開啟進入下一區域的通道。",
	"我有聽見愛人的聲音，就在實驗室的上方，我們所有人必須要到達實驗室的頂端。",
	"請快一些，希望時間還來得及，我們要快去救救我的愛人，羅密歐就在前面的那個房間裏。"];

function start() {
	for (var i = 0; i < map.length; i++)
	if (cm.getPlayer().getMap().getId() == map[i]) {
		cm.sendOk(Text[i]);
		cm.dispose();
		return;
		}
		cm.sendSimple("#e<組隊任務: 拯救羅密歐>#n \r\n不久前，一位名叫猶利塔的術士因為研究蒙特鳩協會和卡帕萊協會的結合煉金術而被逐出了這個小鎮，由於這種結合所產生的巨大力量，法律禁止對兩者進行研究。然而，他忽視了這一規律，在兩項研究中都獲得了成功。結果，他被流放了。他現在正在報復，已經帶走了我心愛的人，他的下一個目標也許就是我，因為我們是兩個協會的繼承人，但我不害怕，我們必須不惜一切代價找到她。\r\n\r\n Number of players: 2~6 \r\n Level range: 70~119 \r\n Time limit: 20minutes\r\n#L0##b進入任務地圖#l");
}

function action(mode, type, selection) {
	switch (selection) {
	case 0:
		if (cm.getPlayer().getParty() == null) {
			cm.sendOk("很抱歉，裡面的怪物很危險，我不能讓你單獨去冒險。");
			cm.dispose();
			return;
			}
		if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendOk("如果妳想執行這項任務，請告訴妳的組長與我談話。");
			cm.dispose();
			return;
			}
			var chat = "很抱歉，因為你的小组规模不在入场要求範圍大小內，一些组員沒有資格嘗試此任務，或者他們不在此地圖中。\r\n\r\nNumber of players: 2~4 \r\nLevel range: 70~119 \r\n\r\n";
			var chenhui = 0;
			var party = cm.getPlayer().getParty().getMembers();
			for (var i = 0; i < party.size(); i++)
		if (party.get(i).getLevel() < 70 || party.get(i).getLevel() > 119 || party.get(i).getMapid() != 261000021 || party.size() < 2 || party.size() > 4) {
			chat += "#bName: " + party.get(i).getName() + " / (Level: " + party.get(i).getLevel() + ") / Map: #m" + party.get(i).getMapid() + "#\r\n";
			chenhui++;
			}
		if (chenhui != 0) {
			cm.sendOk(chat);
			cm.dispose();
			return;
			}
			var em = cm.getEventManager("Juliet");
			var prop = em.getProperty("state");
		if (prop == null || prop == 0) {
			em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
			cm.dispose();
			return;
			}
			cm.sendOk("拯救羅密歐任務正在執行中，請嘗試其它頻道。");
			}
			cm.dispose();
}