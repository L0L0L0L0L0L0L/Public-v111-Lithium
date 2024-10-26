/*
	名字:	莉琳
	地圖:	冰雪洞窟
	描述:	140090000
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
		reactor = 'action' + (cm.getPlayer().getInfoQuest(21019).indexOf("helper=clear") == -1 ? 0 : 1);
		eval(reactor)(mode, type, selection);
}

function action0(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNextS("You're finally awake...!", 8);
		break;
	case 1:
		cm.sendNextPrevS("And you are...?", 2);
		break;
	case 2:
		cm.sendNextPrevS("The hero who fought against the Black Mage... I've been waiting for you to wake up!", 8);
		break;
	case 3:
		cm.sendNextPrevS("Who... Who are you? And what are you talking about?", 2);
		break;
	case 4:
		cm.sendNextPrevS("And who am I...? I can't remember anything... Ouch, my head hurts!", 2);
		break;
	case 5:
		cm.getPlayer().updateInfoQuest(21019, "helper=clear");
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction1.img/aranTutorial/face"));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.EffectPacket.ShowWZEffect("Effect/Direction1.img/aranTutorial/ClickLilin"));
		cm.dispose();
}
}

function action1(mode, type, selection) {
	switch (status) {
	case 0:
		cm.sendNextS("Are you alright?", 8);
		break;
	case 1:
		cm.sendNextPrevS("I can't remember anything. Where am I? And who are you...?", 2);
		break;
	case 2:
		cm.sendNextPrevS("Stay calm. There is no need to panic. You can't remember anything because the curse of the Black Mage erased your memory. I'll tell you everything you need to know...step by step.", 8);
		break;
	case 3:
		cm.sendNextPrevS("You're a hero who fought the Black Mage and saved Maple World hundreds of years ago. But at the very last moment, the curse of the Black Mage put you to sleep for a long, long time. That's when you lost all of your memories.", 8);
		break;
	case 4:
		cm.sendNextPrevS("This island is called Rien, and it's where the Black Mage trapped you. Despite its name, this island is always covered in Ice and snow because of the Black Mage's curse. You were found deep inside the Ice Cave.", 8);
		break;
	case 5:
		cm.sendNextPrevS("My name is Lilin and l belong to the clan of Rien. The Rien Clan has been waiting for a hero to return for a long time now, and we finally found you. You've finally returned!", 8);
		break;
	case 6:
		cm.sendNextPrevS("I've said too much. It's okay if you don't really understand everything l just told you. You'll get it eventually. For now, #byou should head to town#k. I'll stay by your side and help you until you get there.", 8);
		break;
	case 7:
		cm.getPlayer().changeMap(cm.getMap(140090100), cm.getMap(140090100).getPortal(1));
		cm.getClient().getSession().write(Packages.tools.packet.EtcPacket.UIPacket.summonHelper(true));
		cm.dispose();
}
}