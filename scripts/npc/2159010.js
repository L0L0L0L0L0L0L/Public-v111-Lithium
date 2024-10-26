/*
	名字:	J
	地圖:	礦山後面
	描述:	931000030
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
		status--;
		break;
	case 1:
		status++;
		break;
		}
	switch (status) {
	case 0:
		cm.sendNextS("Looks like we lost him. Of course, I could've easily handled him, no problemo, but I wasn't sure I could protect you kiddos at the same time. *chuckle* What're you two doing here anyway? Didn't your parents warn you to steer clear of the mines?", 8);
		break;
	case 1:
		cm.sendNextPrevS("It's my fault! #h0# was just trying to help! #h0# rescued me!", 4, 2159007);
		break;
	case 2:
		cm.sendNextPrevS("Rescued you, eh? Hm, you are dressed kind of funny, little girl. Ooooh. Were you a prisoner of the Black Wings?", 8);
		break;
	case 3:
		cm.sendNextPrevS("#b(Vita quickly explains the situation.)#k", 4, 2159007);
		break;
	case 4:
		cm.sendNextPrevS("Ah, yes, I knew the Black Wings were up to something dangerous. I knew it all along. I should tell the others so we can come up with a plan.", 8);
		break;
	case 5:
		cm.sendNextPrevS("But who are you? Where did you come from? And why did you rescue us?", 2);
		break;
	case 6:
		cm.sendNextPrevS("I suppose I can't hide it after everything you've seen today, including but not limited to my heroic rescue and brazen bravery. *cough* You know our grand city of Edelstein is currently under the control of the Black Wings, right?", 8);
		break;
	case 7:
		cm.sendNextPrevS("The stolen mines, the occupation of City Hall, the existence of the Watchmen... Everywhere you look, they're trampling over our liberty. Despite all that, the Black Wings will never rule our hearts!", 8);
		break;
	case 8:
		cm.sendNextPrevS("I am a proud member of the Resistance, a group secretly fighting and undermining the Black Wings. I cannot tell you who I am, but I go by the codename of J. ", 8);
		break;
	case 9:
		cm.sendNextPrevS("Now, please return to town and stay away from the mines. As for you, Vita, come with me. If you're left unprotected, I fear the Black Wings will come look for you. No one can keep you safe like I can! Now, keep my words a secret. The fate of the Resistance depends on your discretion.", 8);
		break;
	case 10:
		cm.sendNextPrevS("Wait, before you go, tell me one thing. How can I join the Resistance?", 2);
		break;
	case 11:
		cm.sendNextPrevS("Ah, little youngling, so you wish to fight the Black Wings, do you? Your heart is noble, but there is little you can do to aid our efforts until you reach Lv. 10. Do so, and I will have someone from the Resistance contact you. That's a promise, kiddo. Now, I must be off, but perhaps we will meet again someday!", 8);
		break;
	case 12:
		cm.dispose();
		cm.gainExp(90);
		cm.getPlayer().changeMap(cm.getMap(310000000), cm.getMap(310000000).getPortal(8));
}
}