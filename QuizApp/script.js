function Soru(soruMetni, cevapMetni, dogruCevap){
    this.soruMetni = soruMetni;
    this.cevapMetni = cevapMetni;
    this.dogruCevap = dogruCevap;
}

Soru.prototype.cevabiKontrolEt = function(cevap){
    return cevap === this.dogruCevap;
}

let sorular = [
    new Soru("Hangisi javascript paket yönetim uygulamasıdır", {a: "NodeJS", b: "TS", c: "Npm"}, "c"),
    new Soru("Hangisi javascript paket yönetim uygulamasıdır", {a: "NodeJS", b: "TS", c: "Npm"}, "c"),
    new Soru("Hangisi javascript paket yönetim uygulamasıdır", {a: "NodeJS", b: "TS", c: "Npm"}, "c"),
    new Soru("Hangisi javascript paket yönetim uygulamasıdır", {a: "NodeJS", b: "TS", c: "Npm"}, "c")
];


function Quiz(sorular){
    this.sorular = sorular;
    this.soruIndex = 0;
}

Quiz.prototype.soruGetir = function(){
    return this.sorular[this.soruIndex];
}

const quiz = new Quiz(sorular);

document.querySelector(".btn_start").addEventListener("click", function(){
    
})