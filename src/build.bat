@echo off
title build times!
pip install -r requirement.txt
C:\Users\zshul\AppData\Roaming\Python\Python39\Scripts\pyinstaller.exe --noconsole  --onefile --icon=a.ico --clean show_times_in_gui.py
pause