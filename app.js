// Değişkenler Variables========================================================================================

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
//id si you olan html elemetini bir değişkene atadık ki scorumuzu ordan artırıp sonucunu ekrana yazabilelim👆
const scorePc = document.getElementById("pc")
//id si pc olan html elemetini bir değişkene atadık ki pc nin scorunu ordan artırıp sonucunu ekrana yazabilelim👆
const domTopScore = document.querySelector(".top-score")
//classı si top-score olan html elemetini bir değişkene atadık ki toplam scoru ekrana yazabilelim👆

// Modal Selectors yani score belli olduğunda kazandı isem you win kaybetti isem you lost yazdırabilmek için html de 4 tane elementi yakalamam gerekiyor.
const resultDiv = document.querySelector(".result-msg");
const containerEl = document.querySelector(".container");
const modalEl = document.querySelector(".modal-container");
const modalBtn = document.querySelector("#modal-ok");

//Sonuç mesajı için
const final = document.getElementById("final");

// Event listeners =======================================================================================
// Ekrandan tıklanan elemente göre bizim seçimimizi ekrana yazdırır.
//select divine eventlistener tıklayarak gereksiz kalabalığın önüne geçtik.👇
select.addEventListener("click", (e) => {
    // console.log(e.target.className)--->target nereye tıkladığımı gösteriyor.targetinin classnameini yakalar.
    // console.log(e.target.getAttribute("alt"))--->tıkladığım elementin target ile getattribute ni yakalarım .alt attributenu.
    // Bu if le boş tıklamanın önüne geçiyoruz.yani tıkladığın yerin bir alt attribute u varsa burayı devreye sok.eğer yoksa fonksiyonu çağırmıyor.aksi takdirde boşluğa tıkladığımızda da bir seçim yapmış gibi olur.
    if (e.target.getAttribute("alt")) {

        userSelect = e.target.getAttribute("alt")
        yourChoice.innerHTML = `<img src="${userSelect}.png"></img>`;
        pc()
        //benim seçimimi ekrana getirecek👆sonuna pc yazmamızın sebebi ben seçimimi yaptım sırada pc nin seçimi var
    }

})

const pcArr = ["tas", "kagit", "makas"]; //pc nin seçenekleri için bir değişken tanımladık

//Bu fonksiyon pc nin seçiminin ekranda belirmesini sağlar.
function pc() {
    pcRandom = pcArr[Math.floor(Math.random() * 3)];
    // pcRandom = 'tas'

    // console.log(pcRandom)
    pcChoice.innerHTML = `<img src="${pcRandom}.png"></img>`;
    result();
    //pc nin seçimini ekrana foto olarak getirecek.👆sonuna result yazmamın sebebi pc seçimini yaptı sırada result var yani sonuç
}

//result fonksiyonu maç sonucu hesaplayıp 10 a ulaşılınca maçı bitirecektir.//karşılaştırma yapacağız kendi seçimimiz ile pc seçimini o yüzden if yapısı ve switch case kullanacağız

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

//Beraberlik durumu yaptığımız her seçimde beraberlik varsa yine ikinci class tanımlıyoruz active classı ve resultdivin innerhtml ine it's a draw yazdırıyoruz.
    if (userSelect == pcRandom) {
        resultDiv.classList.add("active");
        resultDiv.innerHTML = "It's a draw"
        containerEl.style.boxShadow = "3px 3px 10px 1px #FFC538";
        resultDiv.style.backgroundColor = "#FFC538";
    }
// Biz oyunun sonunda  kazanırsak sonuç mesajını kazandınız olarak değiştirmek için .benim scorumun innertext i 10 a eşit ise süslünün içerisindekileri yap.
    if (scoreYou.innerText == '10') {
        final.innerHTML = `💃 You Win🕺`
        document.querySelector(".modal").style.backgroundColor = "#5AB7AC"
        modalBtn.style.color = "#5AB7AC"
        topScoreCheck()
        //topscore fonksiyonu ile ben kazanırsam topscore getireceğim ekrana
    }

    if(scorePc.innerText == '10' || scoreYou.innerText == '10'){
        modal()
    }

// ben veya pc 10 olursa bu maç bitsin👆
}

//Biz her yaptığımız seçimde kaybedersek bu fonksiyon çağrılacak ve renkleri, mesajı değiştirecek css eklenen ikinci active class ile
function lost() {
    resultDiv.classList.add("active") 
    resultDiv.innerHTML = "You Lost"
    containerEl.style.boxShadow = "3px 3px 10px 1px #fb778b";
    resultDiv.style.backgroundColor = "#fb778b";
    scorePc.innerText++;
}

//Biz her yaptığımız seçimde kazanırsak bu fonksiyon çağrılacak ve renkleri, mesajı değiştirecek csse eklenen ikinci active class ile
function win() {
    resultDiv.classList.add("active")
    //kazanırsam 
    resultDiv.innerHTML = "You Win"
    containerEl.style.boxShadow = "3px 3px 10px 1px #5AB7AC";
    resultDiv.style.backgroundColor = "#5AB7AC";
    scoreYou.innerText++
}


// modal kullanımı aç.classı modal olan kısma show classını aç.  ben veya pc 10 olursa çağıracağım modal fonksiyonu .var olan modal classına show classı ekledik
function modal(){
    modalEl.classList.add("show");
}

// moddal kapa sayfayı yenile.modal butonuna tıklandığında window.location.reload kalıp bir fonksiyondur sayfayı yenile anlamına gelir.
modalBtn.addEventListener("click", ()=>{
    // modalEl.classList.remove("show");classı show olan modal classını direkt ekrandan siler böyle de olabilir.
    modalEl.style.display = "none";
    window.location.reload()
})


// local storage den high score u çek
let storagedScore = localStorage.getItem("highScore")
//local storageden highscore getir.
console.log(storagedScore)

let topScore; //ekrana yazdıracağım değer.

//local storage git highscore getir eğer highscore yoksa yani birinin birine üstünlüğü yoksa storagedscore çaılşmaz else kısmı devreye girer ve topscore 0-0 olur.
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