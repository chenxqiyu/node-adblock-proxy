#!/bin/bash


# Update Host Lists

wget http://winhelp2002.mvps.org/hosts.txt -O ./hosts.d/winhelp2002-mvps.txt
wget http://someonewhocares.org/hosts/hosts -O ./hosts.d/someonewhocares.txt
wget http://cdn.trjlive.com/hosts/hosts-v8.txt -O ./hosts.d/trjlive.txt


# Update AdBlock Plus Filters

wget --no-check-certificate https://easylist-downloads.adblockplus.org/fanboy-annoyance.txt -O ./adblockplus.d/fanboy-annoyance.txt
wget --no-check-certificate https://easylist-downloads.adblockplus.org/fanboy-social.txt -O ./adblockplus.d/fanboy-social.txt
wget --no-check-certificate https://easylist-downloads.adblockplus.org/easylist_noelemhide.txt -O ./adblockplus.d/easylist_noelemhide.txt
wget --no-check-certificate https://easylist-downloads.adblockplus.org/easyprivacy.txt -O ./adblockplus.d/easyprivacy.txt

