(function(console){

console.save = function(data, filename){

    if(!data) {
        console.error('Console.save: No data')
        return;
    }

    if(!filename) filename = 'console.json'

    if(typeof data === "object"){
        data = JSON.stringify(data, undefined, 4)
    }

    var blob = new Blob([data], {type: 'text/json'}),
        e    = document.createEvent('MouseEvents'),
        a    = document.createElement('a')

    a.download = filename
    a.href = window.URL.createObjectURL(blob)
    a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    a.dispatchEvent(e)
 }
})(console)






var ar = []
    

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    for (let i = 0; i < 100; i++) {
        fetch("https://www.yeshiva.org.il/calendar/calaj.aspx?cache_version=13&v=1&op=ys&pl=%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D&yr=%D7%94%27%D7%AA%D7%A9%D7%A4%22%D7%91&dyr=" 
        + i + 
        "&lng=heb&sv=false&x=rsh1d4kb", {
          "headers": {
            "accept": "application/json, text/plain, */*",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Linux\""
          },
          "referrer": "https://www.yeshiva.org.il/calendar/shabatot?place=%D7%AA%D7%9C-%D7%90%D7%91%D7%99%D7%91",
          "referrerPolicy": "strict-origin-when-cross-origin",
          "body": null,
          "method": "GET",
          "mode": "cors",
          "credentials": "omit"
        }).then(response => response.json())
          .then(data => {
                data['times'].forEach(element => ar.push(element));
            });
        await sleep(300)
    }

    console.log(ar)
}
main()


console.save(ar, ["yeshiva_jerushalim_shabbat_zmanim.json"])
