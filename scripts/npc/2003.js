/*
    Name:    Robin
    Map:     Big Mushroom
    Description: 50000
*/

function start() {
	var chat = "Now...ask me any questions you may have on traveling!!#b";
	var options = ["How do I move?", "How do I take down the monsters?", "How can I pick up an item?", "What happens when I die?", "When can I choose a job?", "Tell me more about this island!", "What should I do to become a Warrior?", "What should I do to become a Bowman?", "What should I do to become a Magician?", "What should I do to become a Thief?", "How do I raise the character stats? (S)", "How do I check the items that I just picked up?", "How do I put on an item?", "How do I check out the items that I'm wearing?", "What are skills? (K)", "How do I get to Victoria Island?", "What are mesos?"];
	for (var i = 0; i < options.length; i++)
	chat += "\r\n#L" + i + "#" + options[i] + "#l";
	cm.sendSimple(chat);
}

function action(mode, type, selection) {
	if (mode > 0)
		cm.sendOk(Text[selection][mode-1]);
		cm.dispose();
}

var Text = [["Alright this is how you move. Use #bleft, right arrow#k to move around the flatland and slanted roads, and press #bAlt#k to jump. A select number of shoes improve your speed and jumping abilities.\r\n\r\n#fUI/DialogImage.img/Help/0#"],
	["Here's how to take down a monster. Every monster possesses an HP of its own and you'll take them down by attacking with either a weapon or through spells. Of course the stronger they are, the harder it is to take them down.\r\n\r\n#fUI/DialogImage.img/Help/1#"],
	["This is how you gather up an item. Once you take down a monster, an item will be dropped to the ground. When that happens, stand in front of the item and press #bZ#k or #b0 on the NumPad#k to acquire the item.\r\n\r\n#fUI/DialogImage.img/Help/2#"],
	["Curious to find out what happens when you die? You'll become a ghost when your HP reaches 0. There will be a tombstone in that place and you won't be able to move, although you still will be able to chat."],
	["When do you get to choose your job? Hahaha, take it easy, my friend. Each job has a requirement set for you to meet. Normally a level between 8 and 10 will do, so work hard."],
	["Want to know about this island? It's called Maple Island and it floats in the air. It's been floating in the sky for a while so the nasty monsters aren't really around. It's a very peaceful island, perfect for beginners!"],
	["You want to become a #bWarrior#k? Hmmm, then I suggest you head over to Victoria Island. Head over to a warrior-town called #rPerion#k and see #bDances with Balrog#k. He'll teach you all about becoming a true warrior. Ohh, and one VERY important thing: You'll need to be at least level 10 in order to become a warrior!!"],
	["You want to become a #bBowman#k? You'll need to go to Victoria Island to make the job advancement. Head over to a bowman-town called #rHenesys#k and talk to the beautiful #bAthena Pierce#k and learn the in's and out's of being a bowman. Ohh, and one VERY important thing: You'll need to be at least level 10 in order to become a bowman!!"],
	["You want to become a #bMagician#k? For you to do that, you'll have to head over to Victoria Island. Head over to a magician-town called #rEllinia#k, and at the very top lies the Magic Library. Inside, you'll meet the head of all wizards, #bGrendel the Really Old#k, who'll teach you everything about becoming a wizard."],
	["You want to become a #bThief#k? In order to become one, you'll have to head over to Victoria Island. Head over to a thief-town called #rKerning City#k, and on the shadier side of town, you'll see a thief's hideaway. There, you'll meet #bDark Lord#k who'll teach you everything about being a thief. Ohh, and one VERY important thing: You'll need to be at least level 10 in order to become a thief!!"],
	["You want to know how to raise your character's ability stats? First press #bS#k to check out the ability window. Every time you level up, you'll be awarded 5 ability points aka AP's. Assign those AP's to the ability of your choice. It's that simple."],
	["You want to know how to check out the items you've picked up, huh? When you defeat a monster, it'll drop an item on the ground, and you may press #bZ#k to pick up the item. That item will then be stored in your item inventory, and you can take a look at it by simply pressing #bI#k."],
	["You want to know how to wear the items, right? Press #bI#k to check out your item inventory. Place your mouse cursor on top of an item and double-click on it to put it on your character. If you find yourself unable to wear the item, chances are your character does not meet the level & stat requirements. You can also put on the item by opening the equipment inventory (#bE#k) and dragging the item into it. To take off an item, double-click on the item at the equipment inventory."],
	["You want to check on the equipped items, right? Press #bE#k to open the equipment inventory, where you'll see exactly what you are wearing right at the moment. To take off an item, double-click on the item. The item will then be sent to the item inventory."],
	["The special 'abilities' you get after acquiring a job are called skills. You'll acquire skills that are specifically for that job. You're not at that stage yet, so you don't have any skills yet, but just remember that to check on your skills, press #bK#k to open the skill book. It'll help you down the road."],
	["You can head over to Victoria Island through a ship ride from Southperry that heads to Lith Harbor. Press #bW#k to see the World Map, and you'll see where you are on the island. Locate Southperry and that's where you'll need to go. You'll also need some mesos for the ride, so you may need to hunt some monsters around here."],
	["It's the currency used in MapleStory. You may purchase items through mesos. To earn them, you may either defeat the monsters, sell items at the store, or complete quests..."]];