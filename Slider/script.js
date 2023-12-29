var models1 = [
    {
        name: "TOGG 1",
        image: "./img/1.jpeg"
    },
    {
        name: "TOGG 2",
        image: "./img/2.jpeg"
    },
    {
        name: "TOGG 3",
        image: "./img/3.jpeg"
    },
    {
        name: "TOGG 4",
        image: "./img/4.jpeg"
    }
];

var models2 = [
    {
        name: "TOGG 5",
        image: "./img/5.jpeg"
    },
    {
        name: "TOGG 6",
        image: "./img/6.jpeg"
    },
    {
        name: "TOGG 7",
        image: "./img/7.jpeg"
    },
    {
        name: "TOGG 8",
        image: "./img/8.jpeg"
    },
    {
        name: "TOGG 9",
        image: "./img/9.jpeg"
    }
];

var index = 0;




function indexArtır(){
    index++;
    console.log(index);
};
function indexAzalt(){
    index--;
    console.log(index);
};





document.querySelector(".card-title").textContent = models1[index].name;

document.querySelector(".card-img-top").setAttribute("src", models1[index].image)
