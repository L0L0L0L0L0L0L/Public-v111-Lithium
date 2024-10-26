/*
	名字:	寶貝龍
	地圖:	寶貝龍
	描述:	寶貝龍
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
		if (status < 1) {
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
		cm.sendSimple("Hmm? Why, Master? \r\n#L0##b(Have a chat?)#l");
		break;
	default:
		if (status == 1 && type == 5) num = Math.floor(Math.random() * 20);
		reactor = 'action' + num;
		eval(reactor)(mode, type, selection);
}
}

function action0(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Hey, Master. About our combo attack thingy...");
		break;
	case 2:
		cm.sendNextPrevS("Yeah, sure. Whatever.", 2);
		break;
	case 3:
		cm.sendNextPrev("We always go 'Crash! Blam! Boooooom!' But l think 'Blam! Crash! Boom boom!' works way better. Whaddaya think?");
		break;
	case 4:
		cm.sendNextPrevS("Yeah, sure. Whatever.", 2);
		break;
	case 5:
		cm.sendNextPrev("And, and, and... l was thinking l could attack a little earlier, then l could move, and then YOU can attack!");
		break;
	case 6:
		cm.sendNextPrevS("Yeah, sure. Whatever.", 2);
		break;
	case 7:
		cm.sendNextPrev("Master? Are you even listening to me?");
		break;
	case 8:
		cm.sendNextPrevS("Yeah, sure. Whatever.", 2);
		break;
	case 9:
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNextS("Does it hurt when your horn gets hit, Mir?", 2);
		break;
	case 2:
		cm.sendNextPrev("Nope, it doesn't hurt at all! Why do you ask?");
		break;
	case 3:
		cm.sendNextPrevS("Then would you mind dunking your horn in some hot water and make some soup? I've heard that dragon horn soup is really good for the body! Mmmmmm...", 2);
		break;
	case 4:
		cm.sendNextPrev("......");
		break;
	case 5:
		cm.sendNextPrevS("......?", 2);
		break;
	case 6:
		cm.sendNextPrev("HOW DARE YOU?! Flaaaaaaaaame Breath!");
		break;
	case 7:
		cm.sendNextPrevS("Urrrrrrrrgh! Okay, I'm sorry, Mir! Please stop!", 2);
		break;
	case 8:
		cm.dispose();
}
}

function action2(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNextS("Gaaaah!", 2);
		break;
	case 2:
		cm.sendNextPrev("What's the matter, Master?");
		break;
	case 3:
		cm.sendNextPrevS("I stepped in poop...", 2);
		break;
	case 4:
		cm.sendNextPrev("Hee hee! Poop... That wouldn't happen if you just flew around like me!");
		break;
	case 5:
		cm.sendNextPrevS("A bird just pooped on your head!", 2);
		break;
	case 6:
		cm.sendNextPrev("Gaaaah!");
		break;
	case 7:
		cm.dispose();
}
}

function action3(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Master! Do you think l could ever get a girlfriend?");
		break;
	case 2:
		cm.sendNextPrevS("Uh... Aren't you the last remaining Onyx Dragon in Maple World?", 2);
		break;
	case 3:
		cm.sendNextPrev("Yeah? So what?");
		break;
	case 4:
		cm.sendNextPrevS("You might have to consider other dragons, too...", 2);
		break;
	case 5:
		cm.sendNextPrevS("Oh, okay! What about Horntail? Or Vellum?", 2);
		break;
	case 6:
		cm.sendNextPrev("They don't seem like marriage material...");
		break;
	case 7:
		cm.dispose();
}
}

function action4(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNextS("Hmm...", 2);
		break;
	case 2:
		cm.sendNextPrev("What's up, Master? Worried about something?");
		break;
	case 3:
		cm.sendNextPrevS("I was just thinking... Every time you grow, we have to spend a lot more money to feed you.", 2);
		break;
	case 4:
		cm.sendNextPrev("Why are you being so stingy about food? Do you measure our relationships in meals? Is that all you care about, Master? Mir sad...");
		break;
	case 5:
		cm.sendNextPrevS("Okay, okay, you're right. l shouldn't worry too much about conserving food. You'll just have to help out with extra food money!", 2);
		break;
	case 6:
		cm.sendNextPrev("Bwa?! I have to work?");
		break;
	case 7:
		cm.dispose();
}
}

function action5(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNextS("Mir, why are you so angry?", 2);
		break;
	case 2:
		cm.sendNextPrev("That person from before called me an oversized lizard!");
		break;
	case 3:
		cm.sendNextPrevS("Hmm, I wonder what that feels like. I suppose I can never understand that feeling...", 2);
		break;
	case 4:
		cm.sendNextPrev("Hey, look at that monkey over there! It looks exactly like you, Master!");
		break;
	case 5:
		cm.sendNextPrevS("WHAT?!", 2);
		break;
	case 6:
		cm.dispose();
}
}

function action6(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Well, at least I have wings! How do you humans live without them? Isn't that super inconvenient?");
		break;
	case 2:
		cm.sendNextPrevS("...", 2);
		break;
	case 3:
		cm.dispose();
}
}

function action7(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("K-K-K-K-Kerning, Kerning City! Kerning City!");
		break;
	case 2:
		cm.sendNextPrevS("...What the heck is wrong with you?", 2);
		break;
	case 3:
		cm.dispose();
}
}

function action8(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNextS("How long does it take for one of your scales to grow back after it falls off?", 2);
		break;
	case 2:
		cm.sendNextPrev("I'm not sure. Probably not too long.");
		break;
	case 3:
		cm.sendNextPrevS("Oh, cool! Does that mean I can yank some off here and there and use them for...", 2);
		break;
	case 4:
		cm.sendNextPrev("N-no, don't even think about it!");
		break;
	case 5:
		cm.dispose();
}
}

function action9(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Hey, Master. Are pig herders important people in human society?");
		break;
	case 2:
		cm.sendNextPrevS("Uh, well... I guess they're, like, the kings of all pigs?", 2);
		break;
	case 3:
		cm.sendNextPrev("Oh! Does that make you the Kingpig?");
		break;
	case 4:
		cm.sendNextPrevS("I... I guess you could say that.", 2);
		break;
	case 5:
		cm.dispose();
}
}

function action10(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Hey, Master. What do you think about contracts? They're kind of annoying and a little special at the same time.");
		break;
	case 2:
		cm.sendNextPrevS("Well, of course they're special. A contract binds two people together, sometimes over unrelated circumstances, and gives them a special sort of unity.", 2);
		break;
	case 3:
		cm.sendNextPrev("WOW! Those were some really fancy words, Master!");
		break;
	case 4:
		cm.sendNextPrevS("Heh.", 2);
		break;
	case 5:
		cm.dispose();
}
}

function action11(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("I'm so torn... What do I do...");
		break;
	case 2:
		cm.sendNextPrevS("What are you thinking so hard about?", 2);
		break;
	case 3:
		cm.sendNextPrev("Should I drink milk... or soy milk?");
		break;
	case 4:
		cm.sendNextPrevS("......", 2);
		break;
	case 5:
		cm.dispose();
}
}

function action12(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Master! You seem to be a little TOO relaxed whenever we fight, don't you think?");
		break;
	case 2:
		cm.sendNextPrevS("Eh, you're just overthinking it.", 2);
		break;
	case 3:
		cm.sendNextPrev("A-am I?");
		break;
	case 4:
		cm.sendNextPrevS("A wild enemy appeared! Mir, Quick Att... Err, I mean, CHARGE!", 2);
		break;
	case 5:
		cm.dispose();
}
}

function action13(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("So, Master. Do humans form contracts with each other?");
		break;
	case 2:
		cm.sendNextPrevS("Mhmm. All sorts of people make all sorts of contracts!", 2);
		break;
	case 3:
		cm.sendNextPrev("Wow... Say, do people ever fight the way that we fight?");
		break;
	case 4:
		cm.sendNextPrevS("Sure they do! Sometimes they fight on the same side, sometimes against each other...", 2);
		break;
	case 5:
		cm.sendNextPrev("???");
		break;
	case 6:
		cm.dispose();
}
}

function action14(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNextS("Mir, what's it like to be inside an egg?", 2);
		break;
	case 2:
		cm.sendNextPrev("Hmm... Well, I guess it must be a lot like being inside your mommy's stomach.");
		break;
	case 3:
		cm.sendNextPrevS("I don't remember what being in my mom's stomach was like...", 2);
		break;
	case 4:
		cm.sendNextPrev("You get my point, then!");
		break;
	case 5:
		cm.dispose();
}
}

function action15(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNextS("Mir, what does it feel like when you use your Flame Breath?", 2);
		break;
	case 2:
		cm.sendNextPrev("Hmm... Kind of like really intense, kinda spicy burp. Does that make sense?");
		break;
	case 3:
		cm.sendNextPrevS("Not really, to be honest...", 2);
		break;
	case 4:
		cm.sendNextPrev("You should try it sometime, Master! I bet humans can use Human Breath. You'd be so good at it!");
		break;
	case 5:
		cm.sendNextPrevS("Thanks, but no thanks.", 2);
		break;
	case 6:
		cm.dispose();
}
}

function action16(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Heeeroes of Maaaaaple!");
		break;
	case 2:
		cm.sendNextPrevS("W-what was that...?", 2);
		break;
	case 3:
		cm.sendNextPrev("Oh, nothing. It just popped into my head!");
		break;
	case 4:
		cm.dispose();
}
}

function action17(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("Master, don't you think my fighting style is totally fantabulous?");
		break;
	case 2:
		cm.sendNextPrevS("No. You move around too much. A true master only moves when necessary.", 2);
		break;
	case 3:
		cm.sendNextPrev("Yeah, yeah, sure... Mr. Know-it-all...");
		break;
	case 4:
		cm.dispose();
}
}

function action18(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNextS("Hey, what do you do when your head itches, Mir?", 2);
		break;
	case 2:
		cm.sendNextPrev("What kind of question is that? l just scratch it like th--hrrrugh? Hey, Master! My arms don't reach my head!");
		break;
	case 3:
		cm.sendNextPrevS("You noticed that NOW?", 2);
		break;
	case 4:
		cm.dispose();
}
}

function action19(mode, type, selection) {
	switch (status) {
	case 1:
		cm.sendNext("*Huff* Why am I always so tired after a fight? I don't get it!");
		break;
	case 2:
		cm.sendNextPrevS("That's called lack of exercise, Mir.", 2);
		break;
	case 3:
		cm.sendNextPrev("Don't be a jerk!");
		break;
	case 4:
		cm.dispose();
}
}