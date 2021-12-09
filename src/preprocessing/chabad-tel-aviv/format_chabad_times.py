import os 

file = 'chabad-ta-shabbat-times.csv'
formatted_file = f'formatted_{os.path.basename(file)}'


def format_datetime(datetime_s):
    date_s = datetime_s.split(' - ')[0]
    time_s = datetime_s.split(' - ')[1]
    
    month_day = date_s.rsplit('/', maxsplit=1)[0]
    year  = int(date_s.rsplit('/', maxsplit=1)[1])
    foramtted_year = str(year - 100 + 2000)
    foramtted_date = month_day + '/' + foramtted_year
    return foramtted_date + ' - ' + time_s


if __name__ == '__main__':
    with open(file) as f:
        text = f.read()

    with open(formatted_file, 'w') as f:
        for line in text.splitlines():
            try:
                enter =  format_datetime(line.split(',')[0])
                exit =  format_datetime(line.split(',')[1])
                f.write(f'{enter},{exit}\n')
            except:
                f.write(line + '\n')
