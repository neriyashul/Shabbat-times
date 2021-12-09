import json
from datetime import datetime, timedelta

file = r'shabbats_times.json'


def str_to_date(s):
    return datetime.strptime(s, '%H:%M')

def date_to_str(d):
    return d.strftime('%H:%M')

hour = timedelta(hours=1)
half_hour = timedelta(hours=1)

with open(file, encoding='utf-8') as f:
    times =  json.load(f)

for time in times:
    start_jrs = str_to_date(time['startTime-JRS'])
    start_tlv = str_to_date(time['startTime-TLV'])
    end_tlv = str_to_date(time['endTime-TLV'])

    if start_jrs >= start_tlv:
        time['startTime-TLV'] = date_to_str(start_tlv + hour)
        time['endTime-TLV'] = date_to_str(end_tlv + hour)
        print('a')
    elif start_tlv - half_hour >= start_jrs:
        time['startTime-TLV'] = date_to_str(start_tlv - hour)
        time['endTime-TLV'] = date_to_str(end_tlv - hour)

with open(file, 'w', encoding='utf-8') as fw:
    json.dump(times, fw, ensure_ascii=False)
