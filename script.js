var currentTimeIdx;
var allTimes;

async function loadData() {
  const response = await fetch('shabbats_times.json');
  allTimes = await response.json();
  console.log("file loaded");

  currentTimeIdx = findTodayTimeIdx();
  updateCard();
}
loadData();

function findTodayTimeIdx() {
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  for (let i = 0; i < allTimes.length; i++) {
    const currentDateStr = allTimes[i]["date"]; // dd/mm/yyyy format
    const [day, month, year] = currentDateStr.split("/");
    const curDate = new Date(year, month - 1, day);
    // if the time is in the current week:
    if (curDate > today && curDate < nextWeek) {
      return i;
    }
  }
}

function addMinutesToTime(timeStr, minutes) {
  date = new Date((new Date("1970-01-01T" + timeStr).getTime() + minutes * 60 * 1000))
  return `${date.getHours()}:${date.getMinutes()}`
}

// Update card content
function updateCard() {
  shabbatTimes = allTimes[currentTimeIdx]

  const shabbatName = shabbatTimes["name"]
  const date = `${shabbatTimes["hebDate"]["dayText"]} ${shabbatTimes["hebDate"]["monthText"]} - ${shabbatTimes["date"]}`
  data = [
    ["כניסת שבת ירושלים", shabbatTimes["startTime-JRS"]],
    ["כניסת שבת תל אביב", shabbatTimes["startTime-TLV"]],
    ["מנחה וקבלת שבת", addMinutesToTime(shabbatTimes["startTime-TLV"], 10)],
    ["מנחה", shabbatTimes["startTime-JRS"]],
    ["ערבית מוצ\"ש", shabbatTimes["endTime-TLV"]],
  ]

  document.getElementById("shabbat-name").innerText = shabbatName;
  document.getElementById("shabbat-date").innerText = date;
  const table = document.getElementById("table");
  table.innerHTML = data.map((kv) => `
               <tr
                class="odd:bg-white even:bg-gray-50 border-y">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  ${kv[0]}
                </th>
                <td class="px-6 py-4">
                  ${kv[1]}
                </td>
              </tr>`).join("");
}

function isModile() {
  const userAgent = navigator.userAgent.toLowerCase();
  return !/windows|macintosh|linux/i.test(userAgent) || /mobile/i.test(userAgent);
}

// Navigate allTimes
document.getElementById("prev-btn").addEventListener("click", () => {
  currentTimeIdx = (currentTimeIdx - 1 + allTimes.length) % allTimes.length;
  updateCard();
});

document.getElementById("next-btn").addEventListener("click", () => {
  currentTimeIdx = (currentTimeIdx + 1) % allTimes.length;
  updateCard();
});

function formatText() {
  const shabbatTimes = allTimes[currentTimeIdx]
  const shabbatDate = `${shabbatTimes["hebDate"]["dayText"]} ${shabbatTimes["hebDate"]["monthText"]} (${shabbatTimes["date"]})`
  details = [
    `${shabbatTimes["name"]} - ${shabbatDate}`,
    "",
    `כניסת שבת ירושלים: ${shabbatTimes["startTime-JRS"]}`,
    `כניסת שבת תל אביב: ${shabbatTimes["startTime-TLV"]}`,
    `מנחה וקבלת שבת: ${addMinutesToTime(shabbatTimes["startTime-TLV"], 10)}`,
    `מנחה: ${shabbatTimes["startTime-JRS"]}`,
    `ערבית מוצ"ש: ${shabbatTimes["endTime-TLV"]}`,
  ]

  return details.join("\n")
}

// Copy functionality
document.getElementById("copy-btn").addEventListener("click", () => {
  const text = formatText();

  const $defaultMessage = document.getElementById('default-message');
  const $successMessage = document.getElementById('success-message');

  const showSuccess = () => {
    $defaultMessage.classList.add('hidden');
    $successMessage.classList.remove('hidden');
  }

  const resetToDefault = () => {
    $defaultMessage.classList.remove('hidden');
    $successMessage.classList.add('hidden');
  }
  console.log(text)

  console.log("copy");

  navigator.clipboard.writeText(text);
  showSuccess()
  // alert("Copied the text: " + text);

  setInterval(
    function () { resetToDefault() },
    6000
  );
});

// Share functionality
document.getElementById("share-btn").addEventListener("click", () => {
  const text = formatText();
  console.log(text)
  if (navigator.share && isModile()) {
    console.log('in navigator')
    navigator.share({ text }).catch((error) => console.error("Error sharing:", error));
  } else {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  }
});