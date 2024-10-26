/*
	名字:	尋找不夠的藥材
	地圖:	靈藥幻境
	描述:	251000000
*/

var item = [1, 10, 50, 100, 200, 300, 500, 700, 900, 1000];

var items = [2001500, 2022144, 2020007, 2020008, 2001513, 2001528, 2001530, 2000012, 2001530, 2000019];

var num = [1, 10, 50, 50, 50, 50, 50, 50, 50, 50];

var exp = [90, 9000, 90000, 195000, 210000, 219000, 2105028, 2105028, 2105028, 2105028];

var status = -1;

function end(mode, type, selection) {
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
		if (qm.getPlayer().getQuestNAdd(Packages.server.quest.MapleQuest.getInstance(3833)).getStatus() < 1) {
			Packages.server.quest.MapleQuest.getInstance(3833).forceStart(qm.getPlayer(), qm.getNpc(), null);
			qm.dispose();
			return;
			}
			for (var i = 0; i < item.length; i++)
		if (qm.getPlayer().itemQuantity(4000294) >= item[i]) {
			x = i;
			}
			qm.sendNext(Text1[x][mode-1] + " #b" + qm.getPlayer().itemQuantity(4000294) + " #t4000294#" + "" + (x == 0 ? " items#k now." : x == 8 ? "#k items, please." : x == 9 ? "#k items, if you would." : " items#k you got for me.") + ""+ "\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n\r\n#fUI/UIWindow.img/QuestIcon/5/0# \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# " + exp[x] + " exp");
			break;
	case 1:
		if (qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
			qm.sendOk(Text2[x][mode-1]);
			qm.dispose();
			return;
			}
			qm.removeAll(4000294);
			qm.gainItem(items[x], num[x]);
			qm.gainExp(exp[x]);
			Packages.server.quest.MapleQuest.getInstance(3833).forceComplete(qm.getPlayer(), qm.getNpc());
			qm.sendOk(Text3[x][mode-1]);
			break;
	case 2:
		qm.dispose();
}
}

/*
var Text1 = [["I guess you got SOMETHING for me. I'll take those #b" + qm.getPlayer().itemQuantity(4000294) +  " #t4000294# items#k now."],
	["So... this is really the best you could do? Huh. Let me take those #b" + qm.getPlayer().itemQuantity(4000294) +  " #t4000294# items#k you got for me."],
	["Really? That's it? It's not bad, but I think you could've done better. I'll take those #b" + qm.getPlayer().itemQuantity(4000294) +  " #t4000294# items#k you got for me."],
	["Honestly it's not quite enough, but I'm desperate. Here, I'll take those #b" + qm.getPlayer().itemQuantity(4000294) +  " #t4000294# items#k you got for me."],
	["Good. This should be enough to keep Tae Sang happy. I'll take those #b" + qm.getPlayer().itemQuantity(4000294) +  " #t4000294# items#k you got for me."],
	["Hm... I hope Tae Sang will be satisfied for a while. Thanks. I'll take those #b" + qm.getPlayer().itemQuantity(4000294) +  " #t4000294# items#k you got for me."],
	["This is a lot! Tae Sang will be set for a while. Here, I'II take those #b" + qm.getPlayer().itemQuantity(4000294) +  " #t4000294# items#k you got for me."],
	["Oh, wow... I am sure gathering these wasn't easy. Thank you very much. Here, I'll take those #b" + qm.getPlayer().itemQuantity(4000294) +  " #t4000294# items#k you got for me."],
	["Did YOU gather all of these? A-amazing... I had no idea you were so powerful. Let me have those #b" + qm.getPlayer().itemQuantity(4000294) +  " #t4000294##k items, please."],
	["Ha... ha ha ha. Do you have supernatural powers? How many Sr. Bellflower Roots did you have to sacrifice? In any event, thank you. Hand over those #b" + qm.getPlayer().itemQuantity(4000294) +  " #t4000294##k items, if you would."]];

*/

var Text1 = [["I guess you got SOMETHING for me. I'll take those"],
	["So... this is really the best you could do? Huh. Let me take those"],
	["Really? That's it? It's not bad, but I think you could've done better. I'll take those"],
	["Honestly it's not quite enough, but I'm desperate. Here, I'll take those"],
	["Good. This should be enough to keep Tae Sang happy. I'll take those"],
	["Hm... I hope Tae Sang will be satisfied for a while. Thanks. I'll take those"],
	["This is a lot! Tae Sang will be set for a while. Here, I'II take those"],
	["Oh, wow... I am sure gathering these wasn't easy. Thank you very much. Here, I'll take those"],
	["Did YOU gather all of these? A-amazing... I had no idea you were so powerful. Let me have those"],
	["Ha... ha ha ha. Do you have supernatural powers? How many Sr. Bellflower Roots did you have to sacrifice? In any event, thank you. Hand over those"]];

var Text2 = [["What do you have in your inventory anyway? Please make some room so I can give you something."],
	["What do you have in your inventory anyway? Please make some room so I can give you something."],
	["What do you have in your inventory anyway? Please make some room so I can give you something."],
	["What do you have in your inventory anyway? Please make some room so I can give you something."],
	["What do you have in your inventory anyway? Please make some room so I can give you something."],
	["What do you have in your inventory anyway? Please make some room so I can give you something."],
	["What do you have in your inventory anyway? Please make some room so I can give you something."],
	["What do you have in your inventory anyway? Please make some room so I can give you something."],
	["What do you have in your inventory? Please make some room so I can give you something."],
	["Why is your inventory so full? Please make some room so I can give you something."]];

var Text3 = [["I don't think I'll be able to talk to Tae Sang for a while after this..."],
	["I don't know how I am going to face Tae Sang with this..."],
	["If only I had more with me... then I wouldn't have resorted to this."],
	["Sigh. Tae Sang will be complaining for a while.."],
	["Now I'll have to really dry these Bellflowers. They need to be dried in order to be used as a medicinal ingredient."],
	["This should be enough for Tae Sang."],
	["It won't be easy loading all these Bellflowers on the ship. I may have to ask for help..."],
	["Hmmm... I don't know if I can put all this on the boat."],
	["How am I going to carry all this to Mu Lung...?"],
	["I think this will be enough to make Tae Sang faint..."]];