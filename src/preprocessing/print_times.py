import json
import time
from math import inf
from msvcrt import getch


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

with open(file, encoding='utf-8') as f:
    times = json.load(f)

shabbat_times = find_closest_shabbat(times)
print(shabbat_times['name'], shabbat_times['date'])
print(shabbat_times['startTime-JRS'], ":כניסת שבת ירושלים")
print(shabbat_times['endTime-JRS'], ":יציאת שבת ירושלים")
print(shabbat_times['startTime-TLV'], ":כניסת שבת תל אביב")
print(shabbat_times['endTime-TLV'], ":יציאת שבת תל אביב")
print("\nPress any key to exit...")
junk = getch() 