/*
    This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 ~ 2010 Patrick Huy <patrick.huy@frz.cc>
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
package tools;

import java.io.FileOutputStream;
import java.io.IOException;
import provider.MapleDataDirectoryEntry;
import provider.MapleDataFileEntry;
import provider.MapleDataProvider;
import provider.MapleDataProviderFactory;
/*
 * Author: Xerdox
*/
public class HairAndEyeCreator {
    public static void main(String args[]) throws IOException {
    MapleDataProvider hairSource = MapleDataProviderFactory.getDataProvider(MapleDataProviderFactory.fileInWZPath("Character.wz/Hair"));
        MapleDataProvider faceSource = MapleDataProviderFactory.getDataProvider(MapleDataProviderFactory.fileInWZPath("Character.wz/Face"));
        final MapleDataDirectoryEntry root = hairSource.getRoot();
        StringBuilder sb = new StringBuilder();
        FileOutputStream out = new FileOutputStream("hairAndFacesID.txt", true);
        System.out.println("Loading Male Hairs!");
        StringBuilder s1 = new StringBuilder();
        s1.append("var mhair = Array(");
        for (MapleDataFileEntry topDir : root.getFiles()) {
            int id = Integer.parseInt(topDir.getName().substring(0, 8));
            if ((id / 1000 == 30 || id / 1000 == 33 || id / 1000 == 36) && id % 10 == 0) {
                s1.append(id).append(", ");
            }
        } 
        String a = s1.toString().substring(0, s1.toString().length() - 2);
        sb.append(a);
        sb.append(");\r\n");
        System.out.println("Loading Female Hairs!");
        StringBuilder s2 = new StringBuilder();      
        s2.append("var fhair = Array(");
        for (MapleDataFileEntry topDir : root.getFiles()) {
            int id = Integer.parseInt(topDir.getName().substring(0, 8));
            if ((id / 1000 == 31 || id / 1000 == 34 || id / 1000 == 37) && id % 10 == 0) {
                s2.append(id).append(", ");
            }
        }
        String b = s2.toString().substring(0, s2.toString().length() - 2);
        sb.append(b);
        sb.append(");\r\n");
        System.out.println("Loading Male Faces!");
        StringBuilder s3 = new StringBuilder();     
        s3.append("var mface = Array(");
        final MapleDataDirectoryEntry root2 = faceSource.getRoot();
        for (MapleDataFileEntry topDir2 : root2.getFiles()) {
            int id = Integer.parseInt(topDir2.getName().substring(0, 8));
            if ((id / 1000 == 20) && id % 1000 < 100) {
                s3.append(id).append(", ");
            } else {
            }
        }
        String c = s3.toString().substring(0, s3.toString().length() - 2);
        sb.append(c);
        sb.append(");\r\n");
        System.out.println("Loading Female Faces!");
        StringBuilder s4 = new StringBuilder();
        s4.append("var fface = Array(");
        for (MapleDataFileEntry topDir2 : root2.getFiles()) {
            int id = Integer.parseInt(topDir2.getName().substring(0, 8));
            if ((id / 1000 == 21) && id % 1000 < 100) {
                s4.append(id).append(", ");
            }
        }
        String d = s4.toString().substring(0, s4.toString().length() - 2);
        sb.append(d);
        sb.append(");\r\n");
        out.write(sb.toString().getBytes());
    }
}  