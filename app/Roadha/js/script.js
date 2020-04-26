var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


setInterval(function () {
    var d = new Date(); // for now
    var t1 = d.getHours(); // => 9var t2
    var t2 = d.getMinutes(); // =>  30
    var t3 = d.getSeconds();
    var t4 = t1 + ":" + t2 + ":" + t3;
    var cTime = document.getElementById("cTime");
    cTime.innerHTML = t4;
}, 1000);



var countDownDate = undefined;
var countDownDate2 = undefined;

let timer = function () {
    return new Promise(function (resolve, reject) {
        var cMonth = (new Date()).getMonth();
        console.log(cMonth)
        fetch(`https://api.aladhan.com/v1/calendar?latitude=24.946218&longitude=67.005615&method=2&month=${cMonth+1}&year=2020`)
            .then(function (res) { return res.json() })
            .then(function (res) {
                let namazTime = res.data[((new Date()).getDate()) + 1].timings.Fajr;

                let cTime1 = (namazTime[0] + namazTime[((namazTime.indexOf(":")) - 1)]) * 60 * 60 * 1000;
                let cTime2 = (namazTime[(namazTime.indexOf(":")) + 1] + namazTime[(namazTime.indexOf(" ")) - 1]) * 60 * 60 * 1000;
                console.log(res.data[(new Date()).getDate()].timings)
                let namazTimeInMili = (namazTime[0] + namazTime[(namazTime.indexOf(":")) - 1]);
                let n2 = (namazTime[(namazTime.indexOf(":")) + 1] + namazTime[(namazTime.indexOf(" ")) - 1]);
                var fajrTime = namazTimeInMili + ":" + n2 + ":00";
                console.log(fajrTime)
                var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec "];
                var nowMonth = months[(new Date()).getMonth()];
                countDownDate = new Date(`${nowMonth} ${(new Date().getDate()) + 1}, 2018 ${fajrTime}`);


                //===============================================


                let namazTime2 = res.data[((new Date()).getDate()) + 1].timings.Maghrib;

                let cTime11 = (namazTime2[0] + namazTime2[((namazTime2.indexOf(":")) - 1)]) * 60 * 60 * 1000;
                let cTime21 = (namazTime2[(namazTime2.indexOf(":")) + 1] + namazTime2[(namazTime2.indexOf(" ")) - 1]) * 60 * 60 * 1000;
                console.log(res.data[(new Date()).getDate()].timings)
                let namazTimeInMili2 = (namazTime2[0] + namazTime2[(namazTime2.indexOf(":")) - 1]);
                let n3 = (namazTime2[(namazTime2.indexOf(":")) + 1] + namazTime2[(namazTime2.indexOf(" ")) - 1]);
                var magghribTime = namazTimeInMili2 + ":" + n2 + ":00";
                var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec "];
                var nowMonth = months[(new Date()).getMonth()];
                countDownDate2 = new Date(`${nowMonth} ${(new Date().getDate()) + 1}, 2018 ${magghribTime}`)
                resolve([countDownDate , countDownDate2,res])
            }).catch(function (err) {
                reject(err)
            })
    })
}

timer().then(function (res) {
    var x = setInterval(function () {

        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now an the count down date
        var distance = res[0] - now;

        // Time calculations for days, hours, minutes and seconds
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        document.getElementById("timer").innerHTML = hours + "h :" + minutes + "m :" + seconds + " s";
    }, 1000);
});




timer().then(function (res) {
    var x = setInterval(function () {

        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now an the count down date
        var distance = res[1] - now;

        // Time calculations for days, hours, minutes and seconds
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        document.getElementById("timer2").innerHTML = hours + "h :" + minutes + "m :" + seconds + " s";
    }, 1000);
})

timer().then(function (res) {
    var cDayDiv = document.getElementById("cDay");
    console.log(res[2])
    cDayDiv.innerHTML = `${res[2].data[((new Date).getDate())-1].date.hijri.day}  ${days[(new Date()).getDay()]}) ${res[2].data[((new Date).getDate())].date.hijri.month.ar})`
})

$('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})



let search = function () {
    return new Promise(function (resolve, reject) {
        var cMonth = document.getElementById("month").selectedIndex;
        console.log("cMonth ======" + cMonth)
        fetch(`https://api.aladhan.com/v1/calendar?latitude=24.946218&longitude=67.005615&method=2&month=${cMonth}&year=2018`)
            .then(function (res) { return res.json() })
            .then(function (res) {
                resolve([res, cMonth])
            }).catch(function (err) {
                reject({ ERROR: "no result Found" })
            })
    })
}



async function newFunc() {
    const res = await search();
    let userInput = document.getElementById("search").value;
    let result = res[0].data[userInput].timings;
    console.log(userInput - 1, " userinput")
    let table = document.createElement("table");
    table.className = "table table-striped table-dark";
    let tr1 = document.createElement("tr");
    let tr2 = document.createElement("tr");
    for (let key in result) {
        let td1 = document.createElement("td");
        td1.innerHTML = key;
        tr1.appendChild(td1);
        let td2 = document.createElement("td");
        td2.innerHTML = result[key];
        tr2.appendChild(td2);
    }
    table.appendChild(tr1);
    table.appendChild(tr2);
    let div = document.getElementById("searchData");
    var fc = div.firstChild;

    while (fc) {
        div.removeChild(fc);
        fc = div.firstChild;
    }
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var h1 = document.createElement("h1");
    h1.innerHTML = `Namaz Time on ${userInput} ${months[res[1] - 1]} (${res[0].data[userInput - 1].date.hijri.day} ${res[0].data[userInput - 1].date.hijri.month.ar})`;
    h1.className = "text-rtl text-dark"
    div.appendChild(h1);
    div.appendChild(table);
    console.log()

}
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./sw.js')
        .then(function () { console.log('Service Worker Registered'); });
}