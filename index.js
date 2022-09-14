setChannel("SVT 1");

function setChannel(channel) {

    document.getElementById("js-loading").classList.remove("hidden");

    document.getElementById("js-title").innerHTML = channel;

    fetchProgram(channel);
}

function fetchProgram(channel, showPrevious = false) {

    fetch('./data/' + channel + '.json')
        .then(response => response.json())
        .then(data => renderData(data, showPrevious))
        .catch(error => console.log("error"));
}

function renderData(data, showPrevious = false) {

    var schedule = document.getElementById("js-schedule");

    if (schedule.children.length > 1)
        schedule.removeChild(schedule.lastChild);
        

    var ul = document.createElement("ul");
    ul.classList.add("list-group", "list-group-flush");

    var li = document.createElement("li");
    li.classList.add("list-group-item", "show-previous");
    li.addEventListener("click", enableShowPrevious);
    li.innerHTML = "Visa tidigare program";
    
    ul.appendChild(li);

    if (showPrevious == false) 
        data = filterByDate(data);
    
    data.sort((programA, programB) => new Date(programA.start) - new Date(programB.start));

    var x = 0;

    data.forEach(element => {

        var li = document.createElement("li");
        li.classList.add("list-group-item");

        var time = document.createElement("strong");
        time.innerHTML = (new Date(data[x].start)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        var name = document.createElement("div");
        name.innerHTML = data[x].name;

        li.appendChild(time);
        li.appendChild(name);

        ul.appendChild(li);

        x++;
    });

    schedule.appendChild(ul);

    document.getElementById("js-loading").classList.add("hidden");

}


function filterByDate(data) {

    let dateNow = new Date();

    let date = new Date(2021, 1, 10, dateNow.getHours(), dateNow.getMinutes(), dateNow.getSeconds());

    let filteredData = data.filter((element) => new Date(element.start) > date);
    
    return filteredData;
}

function enableShowPrevious() {

    let channel = document.getElementById("js-title").innerHTML;
    
    fetchProgram(channel, true);

}

function toggleMenu() {

    var menuIcon = document.getElementById("menu-icon");
    var menu = document.getElementById("menu");
    
    menu.style.transition = "left 1s";

    if (menuIcon.classList.contains("fa-bars")) {


        menu.classList.add("menu--show");

        menuIcon.classList.remove("fas", "fa-bars");
        menuIcon.classList.add("fas", "fa-times");

    }

    else if (menuIcon.classList.contains("fa-times")) {

        menu.classList.remove("menu--show");

        menuIcon.classList.remove("fas", "fa-times");
        menuIcon.classList.add("fas", "fa-bars");

    }

}
