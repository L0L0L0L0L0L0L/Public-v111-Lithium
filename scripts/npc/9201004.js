/*
    Name: Vincent
    Map: Wedding Town
    Description: 680000000
*/

var Text = [
	["To propose to your beloved, you must have an engagement ring. Talk to Muni, who is the expert in engagement rings. He only sells rings to young people over #rLevel 10#k. If you have found your true love, go talk to Muni first."],
	["By double-clicking the engagement ring gift box, you can enter the name of the person you want to propose to. Remember, you and your partner must be in the same location. It would be really lame to propose while hiding in a corner, wouldn't it?", "When the other person accepts the proposal, they will receive an engagement ring engraved with their partner's name. This ring is a symbol of the agreement to marry. If you #bdiscard this ring, the engagement will be immediately canceled#k, so take good care of it."],
	["To schedule a wedding, go to #rSister Margaret#k. Form a team of #b2#k people with your partner and, with a wedding ticket bought from the Cash Shop, visit Sister Margaret to make your wedding reservation. Do you want me to explain the details of the wedding tickets?", "The simple wedding is suitable for couples who prefer a casual and modest ceremony. Both the bride and groom can invite up to 5 guests each. Once Father Robert IV has conducted the ceremony, the wedding is complete. After the wedding, you will receive a 1-carat wedding ring.", "The sweet wedding is perfect for couples who treasure their legendary love. The bride and groom can invite up to 15 guests each. After Father Robert IV finishes the ceremony, you can take wedding photos in the studio. After the wedding, you will receive a 2-carat wedding ring.", "The luxury wedding is for couples who enjoy grand ceremonies. Both the bride and groom can invite up to 30 guests each. After Father Robert IV conducts the ceremony, you will take wedding photos in the studio and enjoy a simple wedding party. After the wedding, you will receive a 3-carat wedding ring. Additionally, there will be special gifts at the end of the luxury wedding."],
	["When making a wedding reservation, you can create a wedding gift list. This way, guests attending the wedding can give the bride and groom gifts from the list."],
	["After scheduling the wedding, visit Father Robert IV to receive the ceremony commitment. Father Robert IV only gives the ceremony commitment to the bride, so the bride must personally ask for it."],
	["The bride must take the ceremony commitment from Father Robert IV to Sister Larence in front of the chapel to enter the wedding hall. The ceremony begins when Father Robert IV conducts the wedding. The bride and groom can also invite friends to the wedding, so don't forget to send invitations before the ceremony."],
	["If you are attending a sweet or luxury wedding, you will be able to take wedding photos after the ceremony. Use the limited free photo time to position friends and family, strike poses, and capture your most memorable moments."],
	["If you are attending a luxury wedding, you can head to the wedding party map after the photo session. Eliminate all the monsters there, and the bride and groom can move to the wedding gift boxes. There are many gift boxes filled with surprises. I wonder what kinds of gifts you will receive?"],
	["If you have no choice but to divorce, go see Filera. Submit your divorce request to her, and the divorce will be finalized after a 4-day cooling-off period. But I sincerely hope it never comes to that."]
];

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
			cm.sendSimple("It's not easy to find your destined partner. I hope you find yours. You seem to have some questions for me. Ask away.\r\n#L0##bHow do I make an engagement ring?#l\r\n#L1#How can I propose?#l\r\n#L2#How do I schedule a wedding?#l\r\n#L3#How do I send wedding gifts?#l\r\n#L4#How do I get the ceremony commitment?#l\r\n#L5#How does the wedding process work?#l\r\n#L6#How do I take wedding photos?#l\r\n#L7#How does the wedding party work?#l\r\n#L8#Can I get divorced?#l");
			break;
		case 1:
			if (select == -1) select = selection;
			cm.sendNext(Text[select][status - 1]);
			break;
		default:
			Text[select][status - 1] == undefined ? cm.dispose() : cm.sendNextPrev(Text[select][status - 1]);
	}
}
