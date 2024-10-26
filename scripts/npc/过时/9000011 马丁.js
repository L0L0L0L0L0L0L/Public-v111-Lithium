/*
	名字:	马丁
	地圖:	天空之城
	描述:	200000000
*/

var quantities = Array(10, 8, 6, 5, 4, 3, 2, 1, 1, 1);
var prize1 = Array(1442047, 2000000, 2000001, 2000002, 2000003, 2000004, 2000005, 2430036, 2430037, 2430038, 2430039, 2430040); //1 day
var prize2 = Array(1442047, 4080100, 4080001, 4080002, 4080003, 4080004, 4080005, 4080006, 4080007, 4080008, 4080009, 4080010, 4080011);
var prize3 = Array(1442047, 1442048, 2022070);
var prize4 = Array(1442048, 2430082, 2430072); //7 day
var prize5 = Array(1442048, 2430091, 2430092, 2430093, 2430101, 2430102); //10 day
var prize6 = Array(1442048, 1442050, 2430073, 2430074, 2430075, 2430076, 2430077); //15 day
var prize7 = Array(1442050, 3010183, 3010182, 3010053, 2430080); //20 day
var prize8 = Array(1442050, 3010178, 3010177, 3010075, 1442049, 2430053, 2430054, 2430055, 2430056, 2430103, 2430136); //30 day
var prize9 = Array(1442049, 3010123, 3010175, 3010170, 3010172, 3010173, 2430201, 2430228, 2430229); //60 day
var prize10 = Array(1442049, 3010172, 3010171, 3010169, 3010168, 3010161, 2430117, 2430118, 2430119, 2430120, 2430137); //1 year
var status = 0;

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
		if (status >= 2) {
		cm.dispose();
		return;
		}
		status--;
		break;
	case 1:
		status++;
		break;
		}
	if (status == 0) {
		cm.sendNext("嘿，我是#b#p" + cm.getNpc() +"##k，如果你不忙……那我能和你一起出去玩嗎？我聽說有人在這附近聚會#revent#k但是我不想一個人去那裡……嗯，你想和我一起去看看嗎?");
	} else if (status == 1) {
		cm.sendSimple("嗯？什麼樣的活動？嗯，那是……\r\n#L0##e1.#n#b這是什麼樣的活動啊？#k#l\r\n#L1##e2.#n#b給我解釋一下比賽項目#k#l\r\n#L2##e3.#n#b好了，我們走吧！#k#l\r\n#L3##e4.#n#b請提供直接贏獎的獎狀#k#l");
	} else if (status == 2) {
		if (selection == 0) {
			cm.sendOk("整個這個月，冒险岛都在慶祝它的三周年紀念日！將舉行驚喜GM事件，所以保持你的脚趾，並確保參加至少一個重大獎項的活動。");
			cm.dispose();
		} else if (selection == 1) {
			cm.sendSimple("這次比賽有很多比賽項目，在你玩這個遊戲之前，知道如何玩這個遊戲會對你有很大的幫助，選擇一個你想知道更多的！#b\r\n#L0# Ola Ola#l\r\n#L1# MapleStory體能測驗#l\r\n#L2#雪花球#l\r\n#L3#椰子收穫#l\r\n#L4#OX答題#l\r\n#L5#尋寶遊戲#l#k");
		} else if (selection == 2) {
			var marr = cm.getQuestRecord(160200);
			if (marr.getCustomData() == null) {
				marr.setCustomData("0");
				}
				var dat = parseInt(marr.getCustomData());
			if (dat + 3600000 >= cm.getCurrentTime()) {
				cm.sendNext("在過去的一小時內，您已經輸入了事件。");
			} else if (!cm.canHold()) {
				cm.sendOk("無法收納物品，請檢查一下你的背包是否留有空位。");
			} else if (cm.getChannelServer().getEvent() > -1 && !cm.haveItem(4031019)) {
				cm.saveReturnLocation("EVENT");
				cm.getPlayer().setChalkboard(null);
				marr.setCustomData("" + cm.getCurrentTime());
				cm.warp(cm.getChannelServer().getEvent(), cm.getChannelServer().getEvent() == 109080000 || cm.getChannelServer().getEvent() == 109080010 ? 0 : "join00");
			} else {
				cm.sendNext("要麼事件尚未啟動，則您已經擁有#b神秘卷軸#k，或你已在過去24小時內參加此活動，請稍後再試!");
				}
				cm.dispose();
		} else if (selection == 3) {
			var selStr = "您想換哪一份直贏證書?";
			for (var i = 0; i < quantities.length; i++) {
			selStr += "\r\n#b#L" + i + "##t" + (4031332 + i) + "# Exchange(" + quantities[i] + ")#l";
			}
			cm.sendSimple(selStr);
			status = 9;
			}
	} else if (status == 3) {
		if (selection == 0) {
			cm.sendOk("#b[上樓~上樓]#k是一個遊戲，參加者爬梯子到達頂部。爬上你的道路，並轉移到下一個地圖，通過選擇正確的光柱進入的眾多光柱可用。 \r\n\r\n遊戲由三個關卡組成，時間限制為#b6分鐘#k，在[上樓~上樓]，你#b不能跳，瞬移，加速，或新增你的速度使用藥劑或物品#k，也有陷阱的光柱入口，將帶領你到一個陌生的地方，所以請小心。");
			cm.dispose();
		} else if (selection == 1) {
			cm.sendOk("#b[向高地出發]是一場穿越障礙物的比賽#k很像耐心的森林，你可以通過克服各種障礙，在時間限制內到達最終目的地贏得它。 \r\n\r\n遊戲由四個關卡組成，時間限制為#b15分鐘#k，在[向高地活動中]，你不可以使用傳送或瞬移。");
			cm.dispose();
		} else if (selection == 2) {
			cm.sendOk("#b[滾雪球大賽]#k由兩支組隊，彩虹隊和神秘隊，和兩個隊的比賽，#b哪一個隊在有限的時間內把雪球滾得越遠越大#k，果遊戲不能在時間內决定，那麼滾雪球越滾越遠的球隊獲勝。 \r\n\r\n卷起雪，用攻擊它#bCtrl鍵#k，所有遠程攻擊和技能為基礎的攻擊將不會在這裡使用，#b只有近距離攻擊能使用#k。\r\n\r\n如果一個人物接觸了雪球，他/她會被送回起點。在前面的雪人攻擊的起點，以防止反對團隊滾動雪前進，這是一個精心策劃的戰畧活動，因為團隊將决定是否攻擊雪球或雪人。");
			cm.dispose();
		} else if (selection == 3) {
			cm.sendOk("#b[打椰子比賽]#k由兩支組隊，彩虹隊和神秘隊，和兩個隊的比賽，#b看團隊收集了最多椰子#k，時間限制是#b5分鐘#k，如果遊戲結束在一個平局，額外的2分鐘將被授予確定贏家，如果，因為某些原因，比分保持平局，那麼比賽將結束在一場平局。 \r\n\r\n所有遠程攻擊和技能為基礎的攻擊將不會在這裡使用，#b只有近距離攻擊能使用#k，如果你沒有一個武器的近距離攻擊，你可以通過npc在地圖上購買他們的武器，無論是角色的等級、武器或技能，所有的傷害都將是相同的。 \r\n\r\n小心地圖中的障礙和陷阱，如果角色在遊戲中死亡，角色將被從遊戲中消除。隊員誰罷工最後椰子下降之前獲勝。只有椰子砸到地上數，這意味著不要從樹上掉下來的，或者偶爾的爆炸椰子就不算，地圖的底部有一個隱藏的門，所以明智地使用這個門。");
			cm.dispose();
		} else if (selection == 4) {
			cm.sendOk("#b[OX答題]#k遊戲是一種冒險島智慧通過對與錯的活動，一旦你加入遊戲，打開小地圖按#bM#k看到X或O這個活動很簡單，就是說荧幕中間出現問題之後依照你的判斷屬於正確與不正確而站在地圖相對於的X或者O裡面。");
			cm.dispose();
		} else if (selection == 5) {
			cm.sendOk("#b[尋寶]#k是一個遊戲，你的目標是找到#b藏寶卷軸#k這是隱藏在地圖上#r在10分鐘內#k，將有一批神秘寶箱隱藏起來，一旦你將他們找到，就使用攻擊鍵進行打開獲取裡面的物品！");
			cm.dispose();
			}
		} else if (status == 10) {
				if (selection < 0 || selection > quantities.length) {
				return;
				}
			var ite = 4031332 + selection;
			var quan = quantities[selection];
			var pri;
			switch(selection) {
			case 0:
				pri = prize1;
				break;
			case 1:
				pri = prize2;
				break;
			case 2:
				pri = prize3;
				break;
			case 3:
				pri = prize4;
				break;
			case 4:
				pri = prize5;
				break;
			case 5:
				pri = prize6;
				break;
			case 6:
				pri = prize7;
				break;
			case 7:
				pri = prize8;
				break;
			case 8:
				pri = prize9;
				break;
			case 9:
				pri = prize10;
				break;
			default:
				cm.dispose();
				return;
				}
				var rand = java.lang.Math.floor(java.lang.Math.random() * pri.length);
			if (!cm.haveItem(ite, quan)) {
				cm.sendOk("你需要 #b" + quan + " #t" + ite + "##k 用物品交換。");
			} else if (cm.getInventory(1).getNextFreeSlot() <= -1 || cm.getInventory(2).getNextFreeSlot() <= -1 || cm.getInventory(3).getNextFreeSlot() <= -1 || cm.getInventory(4).getNextFreeSlot() <= -1) {
				cm.sendOk("無法收納物品，請檢查一下你的背包是否留有空位。");
			} else {
				cm.gainItem(pri[rand], 1);
				cm.gainItem(ite, -quan);
				cm.gainMeso(100000 * selection); //temporary prize lolol
				}
			cm.dispose();
}
}