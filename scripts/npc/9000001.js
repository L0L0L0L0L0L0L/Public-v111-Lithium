/*
	名字:	江
	地圖:	維多利亞港
	描述:	104000000
*/

var Text = [["This event is to celebrate the school vacation! It sucks to be stuck in a room all day, right? So why don't you live vicariously through this exciting vacation event!? Check the event dates on the web site!", 
	"You can obtain various items and mesos from winning in the event! All the event participants will receive trophies while the winners will receive special prizes! Good luck."], 
	["#e[Up and Up]#nThank you everyone for coming! Here are the rules. The [Up and up] game is similar to a #bladder game#k. #rWinning and losing are heavily based on luck#k. When you pass through all gateways within the time limit, you will be moved to an area to get prizes! There are #b3 stages#k to the gateways. The time limit is #r6 minutes#k, and after that the game will #bend automatically#k. [Up and Up] #rdoes not allow #bjumps, teleports#k, or #bhastes#k. More details can be provided within the game."], 
	["#b[Physical Fitness Test] is an obstacle-course-type game#k. Think Forest of Endurance and Forest of Tenacity. Overcome various difficulties and reach the goal within the time limit to win. \r\n\r\nThere are 4 phases total, and #btime limit is 15 minutes#k. You cannot use Teleport or Haste in [Physical Fitness Test]."], 
	["#b[Snowball Rollin]#k is a game to see which one of the two teams, 'Maple' and 'Story', #brolls Snowball farther#k. If the victor is not determined during the time given, the team that rolled more distance at the end wins more. \r\n\r\nGo near the Snowball and attack (Ctrl key) to slowly roll the Snowball forward. Ranged attacks and all attack skills are useless - you can ONLY use #rmelee attack#k. \r\n\r\nCharacter that touches the Snowball will instantly be summoned back to the starting point. Attack the Snowman at the starting point to keep the opposing team's Snowball from moving forward. Attack the Snowball or attack the Snowman? Strategize with your team and lead your team to victory!"], 
	["ln #b[Coconut Harvest]#k, the participants get divided into two different teams, the Maple and the Story team, and compete against each other. The team that #bpicks up more coconuts within the given time limit#k wins the game. The time limit is #r5 minutes#k. If the first game ends in a [Draw], additional 2 minutes will be added to the game. If two teams tie again, then the game will end in a draw. \r\n\r\nNo range attacks or skills can be used in this game mode. Only the #rmelee attack#k can be used. If you don't have any melee weapons, you can purchase a melee weapon from the NPC located inside of the event map. Regardless of the character level, weapon, or its options, same hit damage will be applied. \r\n\r\nAlso you'll find obstacles and traps in various locations in the map. You will be dropped out of the event game when your character dies. The last player to hit the coconut before it falls on the ground will gain the point. Only the fallen coconut will be counted towards your points. There are hidden portals in the turban sheel at the bottom of the map, so try to take advantage of these hidden portals!"], 
	["The #bSpeed OX Quiz#k is a game where you answer questions using Os and Xs. If you want to play, open up your Mini Map with the M key to find the O and X locations. You win by correctly answering all the questions! \r\n\r\nWhen questions are asked, take the ladder down to the location of the answer before time runs out. If you don't answer or you're still on a ladder, you're out! Also, you can't move until the correct answer disappears from your screen."], 
	["#b[Treasure Hunt]#k You must find the hidden #btreasure document#k that is in each field in #r10 minutes#k for this game. You'll find mysterious treasure chests all over the place. Break these to obtain various items, and you will also find the treasure document in them. \r\n\r\nYou must use #bnormal attacks#k to break the treasure chests, You can trade the treasure document for Devil Scrolls from the appropriate NPCs. The exchange NPCs are also in the treasure hunt maps, and you can also ask #b[Vikin]#k in Lith Harbor. \r\n\r\nYou'll find hidden portals and teleporters in this game. Press #bUp direction key#k on them to use them! There are also hidden staircases or ropes, so be sure to try jumping in hidden places! There are also treasure chests that will send you to hidden locations and treasure chests that can only be found in these locations. \r\n\r\n Certain skills are #rnot allowed#k in the Treasure Hunt game, so be sure to use your normal attacks to break the treasure chests!"], 
	["#b[Sheep Ranch]#k game is a survival game in which participants get divided into two different groups, the Sheep and Wolf Group, and try to either destroy the opponent group or survive within the given time limit."]];

var select = -1;

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
		cm.sendNext("Heya, I'm #b#p9000001##k. l came with my friends to enjoy the event, but l can't find them! How about you, will you come with me?");
		break;
	case 1:
		cm.sendSimple("Hey... if you aren't busy, do you want to go with me? Looks like my younger sibling will come with others. \r\n#L0##bWhat kind of event is it?#l\r\n#L1#Explain the event to me.#l\r\n#L2#Okie! Let's go together!#l");
		break;
	default:
		if (selection < 1) {
			if (select == -1) {
				select = selection;
				}
			if (status == 2)
				cm.sendNext(Text[select][status - 2]);
			else
				Text[select][status - 2] == undefined ? cm.dispose() : cm.sendNextPrev(Text[select][status - 2]);
				}
		if (selection == 1) {
			cm.sendSimple("There are a lot of available events! Wouldn't it be helpful to know the game instructions in advance? Which game do you want to hear the instruction for?#b\r\n#L1#Ola Ola#l\r\n#L2#Physical Fitness Test#l\r\n#L3#Snowball#l\r\n#L4#Coconut Harvest#l\r\n#L5#Speed OX Quiz#l\r\n#L6#Treasure Hunt#l\r\n#L7#Sheep Ranch#l");
			status = 4;
			}
		if (selection == 2) {
			cm.sendNext("You cannot participate in the event if it hasn't started, if you already have Devil's Dice, if you already participated in the event once today, or the participant number cut-off has been reached. Play with me next time!");
			cm.dispose();
			}
			break;
	case 5:
		cm.sendNext(Text[selection]);
		cm.dispose();
}
}