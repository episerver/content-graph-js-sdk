#!/bin/sh
set -e
service ssh start
dotnet MusicFestival.Backend.dll
