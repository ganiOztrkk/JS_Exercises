var models = [
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
    },
    {
        name: "TOGG 5",
        image: "./img/5.png"
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
showSlide(index);
var slaytCount = models.length;
var interval;

var settings={
    duration : '3000',
    random : false
};

init(settings);

document.querySelector('.fa-arrow-circle-left').addEventListener('click',function(){
    index--;
    showSlide(index);
});

document.querySelector('.fa-arrow-circle-right').addEventListener('click',function(){
    index++;
    showSlide(index);    
});

document.querySelectorAll('.arrow').forEach(function(item){
    item.addEventListener('mouseenter',function(){
        clearInterval(interval);
    })
});

document.querySelectorAll('.arrow').forEach(function(item){
    item.addEventListener('mouseleave',function(){
        init(settings);
    })
})


function init(settings){

    var prev;
    interval=setInterval(function(){
        
        if(settings.random){
            // random index
            do{
                index = Math.floor(Math.random() * slaytCount);
            }while(index == prev)
            prev = index;
        }else{
            // artan index
            if(slaytCount == index+1){
                index = -1;
            }
            showSlide(index);
            index++;
        }
        showSlide(index);

    },settings.duration)
}



function showSlide(i){

    index = i;

    if (i<0) {
        index = slaytCount - 1;
    }
    if(i >= slaytCount){
        index =0;
    }

    document.querySelector('.card-title').textContent = models[index].name;

    document.querySelector('.card-img-top').setAttribute('src',models[index].image);
}