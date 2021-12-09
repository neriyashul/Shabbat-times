import json

with open(r'chabad-tel-aviv/formatted_chabad-ta-shabbat-times.csv') as cf:   
    lines = cf.read().splitlines()

times = {}

for line in lines[1:]:
    start, end = line.split(',')
    shabbat_times = {}
    
    shabbat_times['startTime-TLV'] = start.split(' - ')[1]
    shabbat_times['endTime-TLV'] = end.split(' - ')[1]
    date = end.split(' - ')[0]
    shabbat_times['date'] = date
    
    times[date] = shabbat_times

with open(r'yeshiva-jerusalem/yeshiva_jrs_shabbat_times.json', encoding='utf-8') as jf:
    jrs_times = json.load(jf)
for shabbat_times in jrs_times:
    if shabbat_times['loaziDate'] not in times:
        print(f"{shabbat_times['loaziDate']} not in tel aviv")
        continue
    date = shabbat_times['loaziDate']
    cur_zman = times[date]
    
    cur_zman['startTime-JRS'] = shabbat_times['startTime']
    cur_zman['endTime-JRS'] = shabbat_times['endTime']
    cur_zman['name'] = shabbat_times['text']
    cur_zman['hebDate'] = shabbat_times['hebDate']


with open('shabbats_times.json', 'w', encoding='utf-8') as f:
    json.dump(list(times.values()), f, ensure_ascii=False)

