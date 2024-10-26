/*
    Name: Payment Box
    Map: Victoria Harbor
    Description: 104000000
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
			var chat = "Hello, have you collected #b#v4001126##z4001126##k while hunting? I am collecting them, and if you give me Maple Leaves, I can exchange them for rewards. #b";
			chat += "\r\n#L0# Exchange Maple Leaves for Level 35 Maple Weapons#l";
			chat += "\r\n#L1# Exchange Maple Leaves for Level 43 Maple Weapons#l";
			chat += "\r\n#L2# Exchange Maple Leaves for Level 64 Maple Weapons#l";
			chat += "\r\n#L3# Exchange Maple Leaves and #z1092030# for Level 64 Maple Shield#l";
			chat += "\r\n#L4# Use Maple Leaves for a lottery#l";
			cm.sendSimple(chat);
			break;
		case 1:
			select = selection;
			if (selection == 0) {
				chat = "Exchanging for Level 35 Maple Weapons requires 33 #b#v4001126##z4001126##k. Let's see what you need. #b";
				var items = [1302020, 1382009, 1462014, 1472030, 1482020, 1492020];
				for (var i = 0; i < items.length; i++)
					chat += "\r\n#L" + items[i] + "# Exchange for #z" + items[i] + "#";
				cm.sendSimple(chat);
			}
			if (selection == 1) {
				chat = "Exchanging for Level 43 Maple Weapons requires 66 #b#v4001126##z4001126##k. Let's see what you need. #b";
				var items = [1302030, 1332025, 1382012, 1412011, 1422014, 1432012, 1442024, 1452022, 1462019, 1472032, 1482021, 1492021];
				for (var i = 0; i < items.length; i++)
					chat += "\r\n#L" + items[i] + "# Exchange for #z" + items[i] + "#";
				cm.sendSimple(chat);
			}
			if (selection == 2) {
				chat = "Exchanging for Level 64 Maple Weapons requires 99 #b#v4001126##z4001126##k. Let's see what you need. \r\n";
				var items = [1302064, 1312032, 1322054, 1332055, 1332056, 1372034, 1382039, 1402039, 1412027, 1422029, 1432040, 1442051, 1452045, 1462040, 1472055, 1482022, 1492022];
				for (var i = 0; i < items.length; i++)
					chat += "\r\n#L" + items[i] + "# Exchange for #z" + items[i] + "#";
				cm.sendSimple(chat);
			}
			if (selection == 3) {
				chat = "Exchanging for a Level 64 Maple Shield requires 50 #b#v4001126##z4001126##k and one #b#v1092030##z1092030##k. #b";
				var items = [1092045, 1092046, 1092047];
				for (var i = 0; i < items.length; i++)
					chat += "\r\n#L" + items[i] + "# Exchange for #z" + items[i] + "#";
				cm.sendSimple(chat);
			}
			if (selection == 4) {
				chat = "Would you like to use #z4001126# for a lottery? It costs 10 #b#v4001126##z4001126##k. Even if you don't win, there are Maple Coins rewards. Are you sure you want to participate? You might win these rewards:\r\n";
				item1 = [4005000, 4005001, 4005002, 4005003, 1002419, 4005004, 4021000, 4021001, 4021002, 4021003, 4021004, 4021005, 4021006, 4021007, 4021008, 2002023, 2022121, 2022195, 2022439, 2022440, 2022441, 2022308, 2022307, 2002028, 2002029, 2022306, 2022305];
				for (var i = 0; i < item1.length; i++) {
					chat += "#v" + item1[i] + "#";
				}
				cm.sendYesNo(chat);
			}
			break;
		case 2:
			maple = (select == 0 ? 33 : select == 1 ? 66 : select == 2 ? 99 : select == 3 ? 50 : 10);
			if (cm.itemQuantity(4001126) < maple) {
				if (select < 3) {
					if (cm.canHold(selection)) {
						var item = cm.gainItem(selection, 1, true, false);
						cm.gainItem(4001126, -maple);
						cm.sendOk("#z" + selection + "# has been sent to your inventory. Please check it.");
						cm.dispose();
						return;
					}
					cm.sendOk("Please make sure there is enough space in your inventory before receiving #b#z" + selection + "##k.");
					cm.dispose();
					return;
				}
				if (select == 3) {
					if (cm.itemQuantity(1092030)) {
						if (cm.canHold(selection)) {
							var item = cm.gainItem(selection, 1, true, false);
							cm.gainItem(4001126, -maple);
							cm.gainItem(1092030, -1);
							cm.sendOk("#z" + selection + "# has been sent to your inventory. Please check it.");
							cm.dispose();
							return;
						}
						cm.sendOk("Please make sure there is enough space in your inventory before receiving #b#z" + selection + "##k.");
						cm.dispose();
						return;
					}
					cm.sendOk("You don't have #z1092030# in your inventory, so the exchange cannot be completed.");
					cm.dispose();
					return;
				}
				if (select == 4) {
					if (cm.itemQuantity(4001126) < maple) {
						var random = Math.floor(Math.random() * item1.length * 5);
						if (random < item1.length) {
							if (cm.canHold(item1[random])) {
								var item = cm.gainItem(item1[random], 1, true, false);
								cm.gainItem(4001126, -maple);
								cm.sendOk("Congratulations, you won #v" + item1[random] + "#");
								cm.dispose();
								return;
							}
							cm.sendOk("Please make sure there is enough space in your inventory before receiving the item.");
							cm.dispose();
							return;
						}
						cm.gainItem(4001126, -maple);
						var meso = Math.floor(Math.random() * 20000);
						cm.gainMeso(meso);
						cm.sendOk("Sorry, you didn't win anything this time. " + meso + " Maple Coins as consolation.");
						cm.dispose();
						return;
					}
					cm.sendOk("You don't have enough #b#v4001126##z4001126##k to participate in the lottery.");
					cm.dispose();
					return;
				}
			}
			cm.sendOk("If you don't have enough #b#v4001126##z4001126##k, you might find them dropped by any monster in MapleStory.");
			cm.dispose();
	}
}