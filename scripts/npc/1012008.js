/*
	名字:	凱茜
	地圖:	弓箭手村遊戲中心
	描述:	100000203
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
		if (type == 2 || type == 5) {
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
		cm.sendSimple("Hey! Looks like you could use a breather. You should enjoy life, like l do! Well, if you have the right items, you can trade them to me for an item you can use to play mini-games. So what'll it be? \r\n#L0##bCreate a mini-game item#l\r\n#L1#Listen to the explanation on mini-games#l");
		break;
	case 1:
		if (selection == 0) {
			cm.sendSimple("Would you like to create a mini-game item? They'll allow you to start up a min-game nearly anywhere. \r\n#L6##bOmok Set#l\r\n#L7#Memory Set#l");
			}
		if (selection == 1) {
			cm.sendSimple("Do you want to learn about mini-games? Fine! Ask me anything. Which mini-game should I explain to you? \r\n#L8##bOmok#l\r\n#L9#Memory#l");
			}
			break;
	default:
		if (status == 2 && type == 5) {
			select = selection;
			make = true;
			}
			reactor = 'action' + (select < 7 ? 0 : select < 8 ? 1 : select < 9 ? 2 : 3);
			eval(reactor)(mode, type, selection);
}
}

function action0(mode, type, selection) {
	switch (status) {
	case 2:
		cm.sendNext("Looks like you want to play #bOmok#k. You'll need an Omok Set to play. Only those with that item can join a room for playing Omok. You can open an Omok room nearly anywhere, except for the Free Market and waiting maps.");
		break;
	case 3:
		var chat = "There are various Omok Sets with different visual aesthetics. Which Omok Set do you want to make? #b";
		omok = [4080000, 4080001, 4080002, 4080003, 4080004, 4080005];
		omok1 = [4030000, 4030000, 4030000, 4030010, 4030011, 4030011];
		omok2 = [4030001, 4030010, 4030011, 4030001, 4030010, 4030001];
		omok3 = ["Slime", "Slime", "Slime", "Octopus", "Pig", "Pig"];
		omok4 = ["Mushroom", "Octopus", "Pig", "Mushroom", "Octopus", "Mushroom"];
		for (var i = 0; i < omok.length; i++)
		chat += "\r\n#L" + i + "##z" + omok[i] + "##l";
		cm.sendSimple(chat);
		break;
	case 4:
		if (type == 5) select = selection;
		cm.sendNext("You want #b#t" + omok[select] + "##k? Hmm... I can make it for you if I had the right materials. If you can bring me #rOmok Piece : " + omok3[select] + ", Omok Piece : " + omok4[select] + ", and Omok Table#k items. I'm pretty sure monsters drop those...");
		break;
	case 5:
		if ((!cm.getPlayer().itemQuantity(omok1[select]) || !cm.getPlayer().itemQuantity(omok2[select]) || !cm.getPlayer().itemQuantity(4030009)) && make) {
			cm.dispose();
			return;
			}
			cm.sendNextPrev("Wow! Aren't these the #rOmok Piece : " + omok3[select] + ", Omok Piece : " + omok4[select] + ", and Omok Table#k items? That should be everything I need. Wait right there and l'll get to work.");
			break;
	case 6:
		if (make) {
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.sendNext("Are you sure you have #bOmok Piece : " + omok3[select] + ", Omok Piece : " + omok4[select] + ", and Omok Table#k? Maybe you just don't have enough space in your Etc tab.");
			cm.dispose();
			return;
			}
			make = false;
			cm.gainItem(omok1[select], -1);
			cm.gainItem(omok2[select], -1);
			cm.gainItem(4030009, -1);
			cm.gainItem(omok[select], 1);
			}
			cm.sendNextPrev("Here's your #b#t" + omok[select] + "##k! Now you can set up an Omok room whenever you want. Just use your Omok set to open a room and play with others. Something good might even happen if your record is impressive enough. I'll be cheering you on from here, so do your best.");
			break;
	case 7:
		cm.sendNextPrev("I'll be here a while, so let me know if you have any questions about Omok. Work hard to become the best mini-gamer around! Maybe one day you'll surpass me. As if. Anywho, seeya.");
		break;
	case 8:
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 2:
		cm.sendNext("You want to make #bA set of Memory Cards#k? Hmm... I'll need several items to make A set of Memory Cards. You can get Monster Card by defeating monsters here and there on the island. Get me 15 of those and I'll make you A set of Memory Cards.");
		break;
	case 3:
		if (cm.getPlayer().itemQuantity(4030012) < 15 && make) {
			cm.dispose();
			return;
			}
			cm.sendNextPrev("Wow! That's definitely 15 #rMonster Card#k items. It must've been hard getting them all. All right! Time to show off my skills. Wait a moment and I'll make you #rA set of Memory Cards#k.");
			break;
	case 4:
		if (make) {
		if (cm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
			cm.sendNext("Are you sure you have 15 #bMonster Card#k items? Maybe you just don't have enough space in your Etc tab..");
			cm.dispose();
			return;
			}
			make = false;
			cm.gainItem(4030012, -15);
			cm.gainItem(4080100, 1);
			}
			cm.sendNextPrev("Here you are, #bA set of Memory Cards#k. Use the item to start a match and play with others! You can open a Memory room nearly anywhere, except for the Free Market and waiting maps. Something good might happen if you get a nice record. I'll be cheering you on from here, so do your best.");
			break;
	case 5:
		cm.sendNextPrev("I'll be here a while, so let me know if you have any questions about Memory. Work hard to become the best mini-gamer around! Maybe one day you'll surpass me. As if. Anywho, seeya.");
		break;
	case 6:
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 2:
		cm.sendNext("Omok is played by placing tiles known as 'stones' on the board. The first player to get five stones in a row vertically, horizontally, or diagonally wins. Also, only someone with an #bOmok Set#k can create a game, though anyone can join. Omok can be played just about anywhere.");
		break;
	case 3:
		cm.sendNextPrev("You need #r100 mesos#k for every game of Omok. Even if you don't have an Omok Set, you can join someone else with an open game. That's assuming you've got 100 mesos. You'll be kicked out of the room if you run out of mesos.");
		break;
	case 4:
		cm.sendNextPrev("After you've entered a game, press the #bReady#k button to show you're ready to start. The host can then press the #bStart#k button to start the game. If someone you don't want to play with joins a game you're hosting, you can kick them out by pressing the 'X' on the top right of the window.");
		break;
	case 5:
		cm.sendNextPrev("When the room is first opened and the first game starts, the #bhost goes first#k. Make sure to make your move within the time limit, or your opponent will get to go again. Note that you can't place tiles 3 x 3, unless placing your tile elsewhere would end the game. That means placing tiles 3 x 3 is only allowed if it's necessary for defense! Another thing! Only 5 in a row counts as Omok! That means you can't win by connecting #r6 or 7#k.");
		break;
	case 6:
		cm.sendNextPrev("If you make a mistake, you can request a #btake back#k. If your opponent accepts, you can withdraw the stone you just placed and set it somewhere else. If something comes up and you have to leave, you can request a #bdraw#k. If your opponent accepts, the game ends in a draw. Requesting a draw is always better than destroying a friendship.");
		break;
	case 7:
		cm.sendNextPrev("After the first match, the loser of each previous map will get to go first. Also, there's no wandering off in the middle of a game. If you really want to leave, you need to ask to #bdrop out or request a draw#k. Remember that Giving up counts as an automatic loss. Otherwise, when you press Exit, you'll leave the room after the completion of the current match.");
		break;
	case 8:
		cm.sendNextPrev("I wonder if there's anyone who can surpass me? That's it for Omok. Come to me again if you have questions later.");
		break;
	case 9:
		cm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 2:
		cm.sendNext("You don't know how to play Memory? That's okay. Basically, you need find the matching pairs of face-down monster cards. The person with the most matches once all cards are face up is the winner. One player must have #bA set of Memory Cards#k to host the game, and it can be played anywhere.");
		break;
	case 3:
		cm.sendNextPrev("You'll need #r100 mesos#k for every game of Memory. Even if you don't have #bA set of Memory Cards#k, you can enter a join someon with an open game. However, you won't be able to enter a room without 100 mesos, and you'll be forced to exit if you run out of mesos.");
		break;
	case 4:
		cm.sendNextPrev("After you've entered a game, press the #bReady#k button to show you're ready to start. The host can then press the #bStart#k button to start the game. If someone you don't want to play with joins a game you're hosting, you can kick them out by pressing the 'X' on the top right of the window.");
		break;
	case 5:
		cm.sendNextPrev("One more thing... You'll need to decide how many cards you want to use when opening a game of Memory. There are 3 modes: 3x4, 4x5, and 5x6 which result in a playing field of 12, 20, or 30 cards respectively. If you want to change the board size, you'll need to make an new room.");
		break;
	case 6:
		cm.sendNextPrev("At the start of the first game, the #bhost gets the first move#k. Be sure to flip a card within the time limit or your opponent will get to go again. You get an extra move if you match a pair of cards on your turn. Remembering where cards appear is the key to winning.");
		break;
	case 7:
		cm.sendNextPrev("If both you and your opponent have the same number of matches, the one who got the most cards right in a row wins. If you suddenly need to use the restroom or you know that you're going to lose, you can request a #bdraw#k. If your opponent accepts, the game ends in a draw. I would recommend a draw if you want to avoid destroying friendships. Isn't that better than fighting?");
		break;
	case 8:
		cm.sendNextPrev("After the first match, the loser of each previous map will get to go first. Also, there's no wandering off in the middle of a game. If you really want to leave, you need to ask to #bdrop out or request a draw#k. Remember that Giving up counts as an automatic loss. Otherwise, when you press Exit, you'll leave the room after the completion of the current match.");
		break;
	case 9:
		cm.sendNextPrev("I wonder if there's anyone who can surpass me? That's it for Memory. Come to me again if you have questions later.");
		break;
	case 10:
		cm.dispose();
}
}