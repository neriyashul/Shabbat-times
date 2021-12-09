
import json
import time
import pyperclip as pc
import PySimpleGUI as sg

from math import inf
from datetime import datetime, timedelta


file = r'shabbats_times.json'



def str_to_epoch(s):
    return time.mktime(time.strptime(s, r'%d/%m/%Y'))

def seconds_until_date(date):
    now = time.time()
    e = str_to_epoch(date)
    diff = e - now
    return diff if diff > 0 else inf

def find_closest_shabbat(times):
    closest_time = None
    min_seconds = inf
    for _time in times:
        seconds = seconds_until_date(_time['date'])
        if seconds < min_seconds:
            min_seconds = seconds
            closest_time = _time
    return closest_time

def add_minutes(_time, minutes):
    e = datetime.strptime(_time, '%H:%M')
    e += timedelta(minutes=minutes)
    return e.strftime('%H:%M')
    

def show_in_gui(shabbat_times):
    text_times = [
        shabbat_times['name'] + " - " + shabbat_times['date'],
        "כניסת שבת ירושלים: " + shabbat_times['startTime-JRS'],
        "כניסת שבת תל אביב: " + shabbat_times['startTime-TLV'],

        "מנחה וקבלת שבת: " + add_minutes(shabbat_times['startTime-TLV'], 10),
        "מנחה: " + shabbat_times['startTime-JRS'],
        "ערבית מוצ\"ש: " + shabbat_times['endTime-TLV']
    ]

    copied_text = sg.Text('הטקסט הועתק', font=('bold', 10), visible=False)
    copy_button = sg.Button('העתק')
    layout = [[sg.Text(text_times[0],  font=("bold", 12))], 
                *[[sg.Text(s)] for s in text_times[1:]],
                [copy_button, copied_text],
            ]
    window = sg.Window('זמנים', layout, element_justification='r')
    
    while 1:
        event1, values1 = window.read()
        print(event1)
        if event1 == sg.WIN_CLOSED:
            break
        elif event1 == 'העתק':
            pc.copy('\n'.join(text_times))
            copy_button.update(visible=False)
            copied_text.update(visible=True)
        elif event1 == "-ok-":
            try:
                title = window["-IN-"].Widget.selection_get()
            except sg.tk.TclError:
                title = None
            print("selected text:", title)

    window.Close()

def main():
    with open(file, encoding='utf-8') as f:
        times = json.load(f)

    shabbat_times = find_closest_shabbat(times)
    show_in_gui(shabbat_times)

main()
