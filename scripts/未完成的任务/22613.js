/*
	名字:	倘若擁有相同的敵人
	地圖:	公園一角
	描述:	931050710
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		qm.sendNext("……沒想到會在外面再次見到你們。你們是誰？沒想到黑色翅膀成員中還有你和……那種蜥蜴。");
		break;
	case 1:
		qm.sendNextPrevS("牠不是蜥蜴。牠的名字是寶貝龍，是歐尼斯龍。我也不是黑色翅膀！我跟那些傢伙有仇！");
		break;
	case 2:
		qm.sendNextPrev("有仇…你們的村子也被他們佔領了嗎？像埃德爾斯坦一樣？");
		break;
	case 3:
		qm.sendNextPrevS("不，但是黑色翅膀中的一個名叫伊培賀的人騙了我！而且他們想復活歐尼斯龍的仇人黑魔法師！所以絕對不能原諒他們！");
		break;
	case 4:
		qm.sendNextPrev("……伊培賀是黑色翅膀中地位很高的人。他們的陰謀到底進行到哪一步了呢……");
		break;
	case 5:
		qm.sendNextPrevS("但是你為什麼會在這裡？你也討厭黑色翅膀，對吧？");
		break;
	case 6:
		qm.sendNextPrev("……是的。看到了你就知道了……埃德爾斯坦遭到了黑色翅膀的統治。我是末日反抗軍，是努力想從黑色翅膀手上解放埃德爾斯坦的人之一……");
		break;
	case 7:
		qm.sendNextPrevS("哇……好像很了不起的樣子……");
		break;
	case 8:
		qm.sendNextPrev("解釋了這麼多應該可以了吧？這件事千萬別洩露出去。今後也別裝作認識我。");
		break;
	case 9:
		qm.sendNextPrevS("等，等等！為什麼要裝作不認識啊？我們都討厭黑色翅膀的話，完全可以合作啊？那樣的話，就能更快地打敗黑色翅膀！");
		break;
	case 10:
		qm.sendNextPrev("……哈，你說得沒錯，但老實說我還不能完全信任你。如果你是在說謊呢？即使是真的，如果你太弱的話呢？我不需要幫不上忙的人。");
		break;
	case 11:
		qm.sendNextPrev("喂！別看不起歐尼斯龍！如果我們不是很強的龍的話，黑魔法師怎麼會想讓我們滅亡呢？", 1013000);
		break;
	case 12:
		qm.sendAcceptDecline("……嗯……每次看你說話的時候，我都覺得很神奇。而且又那麼可愛……呵呵，先不說這些……既然你這麼說，就去展示一下你們的力量。");
		break;
	case 13:
		qm.sendPrev("你們知道礦山有條小路嗎？通過那裡往裡面走，可以到達傑利麥勒的實驗室。傑利麥勒是黑色翅膀的成員，是專門進行殘忍實驗的科學家……你們去傑利麥勒的實驗室，消滅裡面的黑色翅膀成員，收集30個黑色翅膀的象徵，證明你們的力量。如果收集不到的話……我們的緣分就到此為止。以後不要再裝作認識我。");
		break;
	case 14:
		Packages.server.quest.MapleQuest.getInstance(22613).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}