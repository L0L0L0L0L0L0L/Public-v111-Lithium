@echo off
@title Dump
set CLASSPATH=.;dist\Kerning.jar;lib\*
java -server -Dnet.sf.odinms.wzpath=wz\ tools.wztosql.DumpItems
pause