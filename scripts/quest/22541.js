/*
	名字:	書的下落？1
	地圖:	魔法森林圖書館
	描述:	101000003
*/

var status = -1;

function start(mode, type, selection) {
	switch (mode) {
	case -1:
		qm.dispose();
		return;
	case 0:
		if (status == 6) {
		qm.sendNext("Hm... I guess you're not that interested in learning. That's too bad.");
		qm.dispose();
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
		qm.sendNext("Are you here to borrow a book? Glad to see you're pushing yourself to learn more. Alright, then. Which book would you like?");
		break;
	case 1:
		qm.sendNextPrevS("I'd like to see the second part of #b#t4161050##k.", 2);
		break;
	case 2:
		qm.sendNextPrev("Ah... You must be taking about the book that was published in #m240000000#. Well, I know I loaned Vol. I of that book to a young man from #m100000000# and Vol. II was... Oh no, I think someone borrowed that as well.");
		break;
	case 3:
		qm.sendNextPrevS("#bWHAT? Someone borrowed it? Who?", 2);
		break;
	case 4:
		qm.sendNextPrev("Do you know #b#p1052106##k from #b#m103000000##k? He's always dreamt of flying. He borrowed the book a while ago and still hasn't returned it... Hm...");
		break;
	case 5:
		qm.sendNextPrevS("#bUh, when do you think he'll return it?", 2);
		break;
	case 6:
		qm.sendAcceptDecline("Well, we don't have set due dates for books borrowed here in #m101000003#. If you want, you could go to #m103000000# yourself and get the book from #p1052106#, then return the book to me after you've read It. What do you say?");
		break;
	case 7:
		qm.sendNext("You win, because you to read get the book you're looking for, and I win, because I get my book back. Good idea, right? It's interesting to see someone so young show interest in dragons, not to mention the intriguing little lizard that follows you everywhere. Do you mind my asking what type of a lizard that is?");
		break;
	case 8:
		qm.sendNextPrevS("#b(You can't let anyone know that #p1013000# is actually a dragon. Don't say a word!!)", 2);
		break;
	case 9:
		qm.sendPrev("Fine, fine. I get it! You don't have to shake your head so adamantly! Let's just worry about the book then, okay?");
		break;
	case 10:
		Packages.server.quest.MapleQuest.getInstance(22541).forceStart(qm.getPlayer(), qm.getNpc(), null);
		qm.dispose();
}
}