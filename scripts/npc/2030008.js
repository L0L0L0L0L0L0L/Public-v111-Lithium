/*
	名字:	阿杜比斯
	地圖:	通往殘暴炎魔之門
	描述:	211042300
*/

var status;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	switch (mode) {
	case -1:
		cm.dispose();
		return;
	case 0:
		if (status < 2) {
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		var chat = "旅行者，前面的道路不是隨便能進入的，裡面住著可怕的#b殘暴炎魔#k，只有拿著火焰之眼的勇士，才有資格進入此區域。";
		if (cm.getPlayer().getLevel() > 50) {
			chat += "\r\n#L0#調查廢礦洞穴（第一階段）";
			chat += "\r\n#L1#探查殘暴炎魔訓練場（第二階段）";
			chat += "\r\n#L2#合成火焰的眼（第三階段）";
			}
			chat += "\r\n#L3#請向我說明一下殘暴炎魔";
			cm.sendSimple(chat);
			break;
	case 1:
		if (selection == 0) {
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
				var chat = "很抱歉，因為你的小组规模不在入场要求範圍大小內，一些组員沒有資格嘗試此任務，或者他們不在此地圖中。\r\n\r\nNumber of players: 2~6 \r\nLevel range: 50~200 \r\n\r\n";
				var chenhui = 0;
				var party = cm.getPlayer().getParty().getMembers();
				for (var i = 0; i < party.size(); i++)
			if (party.get(i).getLevel() < 50 || party.get(i).getLevel() > 200 || party.get(i).getMapid() != 211042300 || party.size() < 2) {
				chat += "#bName: " + party.get(i).getName() + " / (Level: " + party.get(i).getLevel() + ") / 所在地圖: #m" + party.get(i).getMapid() + "#\r\n\r\n";
				chenhui++;
				}
			if (chenhui != 0) {
				cm.sendOk(chat);
				cm.dispose();
				return;
				}
				var em = cm.getEventManager("ZakumPQ");
				var prop = em.getProperty("state");
			if (prop == null || prop == 0) {
				em.startInstance(cm.getPlayer().getParty(), cm.getPlayer().getMap(), 200);
				cm.dispose();
				return;
				}
				cm.sendOk("廢礦洞穴任務正在執行中，請嘗試其它頻道。");
				}
		if (selection == 1) {
			if (cm.getPlayer().itemQuantity(4031062)) {
				cm.sendNext("你已經有了#b#v4031062##t4031062##k, 不需要再挑戰這個階段的任務。");
				cm.dispose();
				return;
				}
			if (!cm.getPlayer().itemQuantity(4031061)) {
				cm.sendOk("請先完成#b調查廢礦洞穴（第一階段）#k才能挑戰（第二階段）。");
				cm.dispose();
				return;
				}
				cm.sendYesNo("哦！你已经找到火石母礦碎片，說明你已經通過了第一階段的試煉，接下來，我會把你送進一個滿是陷阱的地方，你很可能會在裡面死亡，所以你一定要小心。");
				}
		if (selection == 2) {
			if (!(cm.getPlayer().itemQuantity(4031061) && cm.getPlayer().itemQuantity(4031062))) {
				cm.sendOk("合成#b#z4001017##k，需要找到#b#z4031061##k、#b#z4031062##k各一個。");
				cm.dispose();
				return;
				}
			if (cm.getPlayer().itemQuantity(4000051) < 30) {
				cm.sendOk("勇士！你完成了所有的試煉，在幫你製作火焰之眼之前，需要額外提供30野狼之尾巴，作為手續費，村落滅亡了之後，難以維持生計，所以........。");
				cm.dispose();
				return;
				}
				cm.gainItem(4031061, -1);
				cm.gainItem(4031062, -1);
				cm.gainItem(4000051, -30);
				cm.gainItem(4001017, 5);
				cm.sendOk("勇士！請拿好火焰之眼，你已經完全具備挑戰殘暴炎魔的資格，願真主保佑你。");
				cm.dispose();
				}
		if (selection == 3) {
				cm.sendOk("殘暴炎魔已經存在了很久，原本是沒有意志的樹靈，後來因為熔岩地帶居民的情感而漸漸有了實體。熔岩地帶…那個地方的人類村莊充滿了黑暗與火焰，還有慾望…經過悠長的歲月，那裡人們#b黑暗陰險#k的性格都毫無保留的傳給了殘暴炎魔。");
				cm.dispose();
				}
				select = selection;
				break;
	case 2:
		if (select == 1) {
			if (cm.getMap(280020000).getCharacters().size() < 1) {
				cm.getMap(280020000).resetFully();
				cm.getPlayer().changeMap(cm.getMap(280020000), cm.getMap(280020000).getPortal(0));
				cm.getPlayer().startMapTimeLimitTask(600, cm.getMap(211042300));
				cm.dispose();
				return;
				}
				cm.getClient().getSession().write(Packages.tools.packet.MaplePacketCreator.serverNotice(6, "火山的氣息目前擁擠，請稍後再試"));
				}
				cm.dispose();
}
}