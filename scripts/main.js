const arrowRight = document.getElementById("iconRight");
const arrowLeft = document.getElementById("iconLeft");
const containerMonths = document.querySelector(".months");
const containerDays = document.querySelector(".days");
const familyReading = document.getElementById("familyReading");
const personalReading = document.getElementById("personalReading");

let dateNow = new Date();

let devotionalMonth = dateNow.getMonth() + 1;
let devotionalDay = dateNow.getDate();

arrowRight.addEventListener("click", () => {
  containerMonths.scrollLeft += containerMonths.offsetWidth / 2;
});

arrowLeft.addEventListener("click", () => {
  containerMonths.scrollLeft -= containerMonths.offsetWidth / 2;
});

async function getMonths() {
  const response = await fetch("./../data/calendar.json");
  const calendarData = await response.json();

  createElementMonth(calendarData);
}

async function getDays() {
  const response = await fetch("./../data/calendar.json");
  const devotionalData = await response.json();

  let data = devotionalData.filter((data) => data.id === devotionalMonth)[0];

  createElementDay(data.days);
}

async function getBooks() {
  const response = await fetch("./../data/calendar.json");
  const devotionalData = await response.json();

  let dataDays = devotionalData.filter((data) => data.id === devotionalMonth)[0];
  let dataBooks = dataDays.days.filter((data) => data.day == devotionalDay)[0];

  createElementFamily(dataBooks.familyReading);
  createElementPersonal(dataBooks.personalReading);
}

function createElementMonth(numberMonths) {
  for (let data of numberMonths) {
    const monthElement = document.createElement("li");

    const attrClass = document.createAttribute("class");
    const attrTabindex = document.createAttribute("tabindex");
    const attrRole = document.createAttribute("role");
    const attrDataNumberMonth = document.createAttribute("data-number-month");
    const attrDataMonthActive = document.createAttribute("data-month-active");

    attrClass.value = "month";
    attrTabindex.value = "0";
    attrRole.value = "button";
    attrDataNumberMonth.value = data.id;
    attrDataMonthActive.value = data.id === devotionalMonth ? true : false;

    monthElement.setAttributeNode(attrClass);
    monthElement.setAttributeNode(attrTabindex);
    monthElement.setAttributeNode(attrRole);
    monthElement.setAttributeNode(attrDataNumberMonth);
    monthElement.setAttributeNode(attrDataMonthActive);
    
    monthElement.appendChild(document.createTextNode(data.month.slice(0, 3)));
    containerMonths.appendChild(monthElement);
  }
}

function createElementDay(numberDays) {
  let elementDayExist = document.querySelectorAll('.day').length > 0 ? true : false;
  
  if (elementDayExist) {
    while (containerDays.firstChild) {
      containerDays.removeChild(containerDays.firstChild);
    }
  }

  for (let d of numberDays) {
    const dayElement = document.createElement("li");

    const attrClass = document.createAttribute("class");
    const attrTabindex = document.createAttribute("tabindex");
    const attrRole = document.createAttribute("role");
    const attrDataNumberDay = document.createAttribute("data-number-day");
    const attrDataMonthDay = document.createAttribute("data-day-active");

    attrClass.value = "day";
    attrTabindex.value = "0";
    attrRole.value = "button";
    attrDataNumberDay.value = d.day;
    attrDataMonthDay.value = d.day === devotionalDay ? true : false;

    dayElement.setAttributeNode(attrClass);
    dayElement.setAttributeNode(attrTabindex);
    dayElement.setAttributeNode(attrRole);
    dayElement.setAttributeNode(attrDataNumberDay);
    dayElement.setAttributeNode(attrDataMonthDay);
    
    dayElement.appendChild(document.createTextNode(d.day));
    containerDays.appendChild(dayElement);
  }
}

function createElementFamily(numberBooks) {
  let elementBookExist = document.querySelectorAll('.book').length > 0 ? true : false;

  if (elementBookExist) {
    while (familyReading.firstChild) {
      familyReading.removeChild(familyReading.firstChild);
    }
  }

  for (let f of numberBooks) {
    const familyReadingElement = document.createElement("li");

    const attrClass = document.createAttribute("class");

    attrClass.value = "book";

    familyReadingElement.setAttributeNode(attrClass);

    familyReadingElement.appendChild(document.createTextNode(f));
    familyReading.appendChild(familyReadingElement);
  }
}

function createElementPersonal(numberBooks) {
  let elementBookExist = document.querySelectorAll('.book').length > 0 ? true : false;

  if (elementBookExist) {
    while (personalReading.firstChild) {
      personalReading.removeChild(personalReading.firstChild);
    }
  }

  for (let f of numberBooks) {
    const personalReadingElement = document.createElement("li");

    const attrClass = document.createAttribute("class");

    attrClass.value = "book";

    personalReadingElement.setAttributeNode(attrClass);

    personalReadingElement.appendChild(document.createTextNode(f));
    personalReading.appendChild(personalReadingElement);
  }
}

getMonths().then(() => {
  const months = document.querySelectorAll(".month");
  
  months.forEach((month) => {
    month.addEventListener("click", (element) => {
      for (let m of months) {
        if (m.dataset.monthActive === "true") {
          m.dataset.monthActive = false;
          m.classList.remove("active");
          break;
        }
      }

      devotionalMonth = Number(month.dataset.numberMonth);
      devotionalDay = 1;

      getBooks();
      
      getDays().then(() => {
        const days = document.querySelectorAll(".day");

        days.forEach((day) => {
          day.addEventListener("click", (element) => {
            for (let d of days) {
              if (d.dataset.dayActive === "true") {
                d.dataset.dayActive = false;
                d.classList.remove("active");
                break;
              }
            }

            devotionalDay = Number(day.dataset.numberDay);

            getBooks();
            
            element.target.classList.add("active");
            element.target.dataset.dayActive = "true";
          });
        });
      });
  
      element.target.classList.add("active");
      element.target.dataset.monthActive = "true";
    });
  });
});

getDays().then(() => {
  const days = document.querySelectorAll(".day");

  days.forEach((day) => {
    day.addEventListener("click", (element) => {
      for (let d of days) {
        if (d.dataset.dayActive === "true") {
          d.dataset.dayActive = false;
          d.classList.remove("active");
          break;
        }
      }

      devotionalDay = Number(day.dataset.numberDay);

      getBooks();
      
      element.target.classList.add("active");
      element.target.dataset.dayActive = "true";
    });
  });
});

getBooks();