@echo off
@title Dump
set CLASSPATH=.;dist\KerningMS.jar;lib\*
java -server -Dnet.sf.odinms.wzpath=wz\ tools.wztosql.DumpQuests
pause