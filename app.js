// Değişkenler Variables

const yourChoice = document.getElementById("your-choice")
//benim seçimimin id sini bir değişkene atadık.👆
const pcChoice = document.getElementById("pc-choice")
//pc nin seçiminin id sini bir değişkene atadık👆

const select = document.querySelector(".select")
//taş-kağıt-makas hepsinin parenti olan select divini bir değişkene atadık👆
let userSelect; // Bizim seçimimiz i bir değişkende saklasın
let pcRandom; // Pc nin seçimi i bir değişkende saklasın.

//score yazabilmek için
const scoreYou = document.getElementById("you")
const scorePc = document.getElementById("pc")
const domTopScore = document.querySelector(".top-score")


// Modal Selectors
const resultDiv = document.querySelector(".result-msg");
const containerEl = document.querySelector(".container");
const modalEl = document.querySelector(".modal-container");
const modalBtn = document.querySelector("#modal-ok");

//Sonuç mesajı için
const final = document.getElementById("final");

// Event listeners
// Ekrandan tıklanan elemente göre bizim seçimimizi ekrana yazdırır.
//select divine eventlistener tıklayarak gereksiz kalabalığın önüne geçtik.👇
select.addEventListener("click", (e) => {
    // console.log(e.target.className)--->target nereye tıkladığımı gösteriyor.targetinin classnameini yakalar.
    // console.log(e.target.getAttribute("alt"))--->tıkladığım elementin target ile getattribute ni yakalarım .alt attributenu.
    // Bu if le boş tıklamanın önüne geçiyoruz.
    if (e.target.getAttribute("alt")) {

        userSelect = e.target.getAttribute("alt")
        yourChoice.innerHTML = `<img src="${userSelect}.png"></img>`;
        pc()
    }

})

const pcArr = ["tas", "kagit", "makas"]; //pc nin seçenekleri

//Bu fonksiyon pc nin seçiminin ekranda belirmesini sağlar.
function pc() {
    pcRandom = pcArr[Math.floor(Math.random() * 3)];
    // pcRandom = 'tas'

    // console.log(pcRandom)
    pcChoice.innerHTML = `<img src="${pcRandom}.png"></img>`;
    result();
}

//result fonksiyonu maç sonucu hesaplayıp 10 a ulaşılınca maçı bitirecektir.
function result() {
    switch (userSelect) {
        case "tas":
            if (pcRandom == "kagit") {
                lost()
            } else if (pcRandom == "makas") {
                win()
            }
            break;

        case "kagit":
            if (pcRandom == "makas") {
                lost()
            } else if (pcRandom == "tas") {
                win()
            }
            break;
        case "makas":
            if (pcRandom == "tas") {
                lost()
            } else if (pcRandom == "kagit") {
                win()
            }
            break;

        default:
            break;
    }

//Beraberlik durumu
    if (userSelect == pcRandom) {
        resultDiv.classList.add("active");
        resultDiv.innerHTML = "It's a draw"
        containerEl.style.boxShadow = "3px 3px 10px 1px #FFC538";
        resultDiv.style.backgroundColor = "#FFC538";
    }
// Biz kazanırsak sonuç mesajını kazandınız olarak değiştirmek için
    if (scoreYou.innerText == '10') {
        final.innerHTML = `💃 You Win🕺`
        document.querySelector(".modal").style.backgroundColor = "#5AB7AC"
        modalBtn.style.color = "#5AB7AC"
        topScoreCheck()
    }

    if(scorePc.innerText == '10' || scoreYou.innerText == '10'){
        modal()
    }


}

//Biz kaybedersek bu fonksiyon çağrılacak ve renkleri, mesajı değiştirecek
function lost() {
    resultDiv.classList.add("active")
    resultDiv.innerHTML = "You Lost"
    containerEl.style.boxShadow = "3px 3px 10px 1px #fb778b";
    resultDiv.style.backgroundColor = "#fb778b";
    scorePc.innerText++;
}

//Biz kazanırsak bu fonksiyon çağrılacak ve renkleri, mesajı değiştirecek
function win() {
    resultDiv.classList.add("active")
    resultDiv.innerHTML = "You Win"
    containerEl.style.boxShadow = "3px 3px 10px 1px #5AB7AC";
    resultDiv.style.backgroundColor = "#5AB7AC";
    scoreYou.innerText++
}


// modal kullanımı aç 
function modal(){
    modalEl.classList.add("show");
}

// moddal kapa sayfayı yenile
modalBtn.addEventListener("click", ()=>{
    // modalEl.classList.remove("show");
    modalEl.style.display = "none";
    window.location.reload()
})


// local storage den high score u çek
let storagedScore = localStorage.getItem("highScore")
console.log(storagedScore)

let topScore; //ekrana yazdıracağım değer.


//local storage boş ise 0-0 yazdırmak için
if(storagedScore){
    topScore = `10 - ${storagedScore}`
}else{
    topScore = "0 - 0"
}

// top score u dom a yazdır.
domTopScore.innerText = topScore;


function topScoreCheck(){
    storagedScore || localStorage.setItem("highScore", +scorePc.innerText )
    
    if (storagedScore >= scorePc.innerText) {
        localStorage.setItem("highScore", +scorePc.innerText);
        
    }

}














// kötü örnek

/* const tasImage = document.querySelector(".tas")
const kagitImage = document.querySelector(".kagit");
const makasImage = document.querySelector(".makas");

tasImage.addEventListener('click',(e)=>{
    console.log(e)
    yourChoice.innerHTML = `<img src="./assets/tas.png"></img>`
})taşa tıklandığında(seçtiğimde) taş resmi altta gözükecek

kagitImage.addEventListener('click',(e)=>{
    console.log(e)
    yourChoice.innerHTML = `<img src="./assets/kagit.png"></img>`;
})kağıda tıklandığında (seçtiğimde) kağıt fotosu altta gözükecek

makasImage.addEventListener('click',(e)=>{
    console.log(e)
    yourChoice.innerHTML = `<img src="./assets/makas.png"></img>`;
}) */ //makasa tıkladığımda (seçtiğimde)makas foto çıkacak altta