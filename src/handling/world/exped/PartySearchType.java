package handling.world.exped;

public enum PartySearchType {
    Kerning(20, 256, 1000, false),
    Ludi(30, 256, 1001, false),
    Orbis(50, 256, 1002, false),
    Pirate(60, 256, 1003, false),
    Magatia(70, 256, 1004, false),
    ElinForest(40, 256, 1005, false),
    Pyramid(40, 256, 1008, false),
    Dragonica(100, 256, 1009, false), //what the fk
    Hoblin(80, 256, 1011, false),
    Henesys(10, 256, 1012, false),
    Dojo(25, 256, 1013, false),

    Balrog_Normal(50, 256, 2001, true),
    Zakum(50, 256, 2002, true),
    Horntail(80, 256, 2003, true),
    PinkBean(140, 256, 2004, true),
    ChaosZakum(100, 256, 2005, true),
    ChaosHT(110, 256, 2006, true),
    CWKPQ(90, 256, 2007, true),
    VonLeon(120, 256, 2008, true);

    public int id, minLevel, maxLevel, timeLimit;
    public boolean exped;
    private PartySearchType(int minLevel, int maxLevel, int value, boolean exped) {
	this.id = value;
	this.minLevel = minLevel;
	this.maxLevel = maxLevel;
	this.exped = exped;
	this.timeLimit = exped ? 20 : 5;
    }

    public static PartySearchType getById(int id) {
	for (PartySearchType pst : PartySearchType.values()) {
	    if (pst.id == id) {
		return pst;
	    }
	}
	return null;
    }
}
