// remove active class from all btn
function removeClass (){
   const activeClass =  document.getElementsByClassName('active');
   for(const active of activeClass){
    active.classList.remove('active');
   }
}

// Speak Vocabularies
function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-EN'; 
    window.speechSynthesis.speak(utterance);
  }

// all levels
const loadAllLevelsBtn = async() =>{
    const response =await fetch('https://openapi.programming-hero.com/api/levels/all');
    const data = await response.json();
    displayAllLevelsBtn(data.data);
}
// load All Card
const allCards = async(levelNo) => {
    showLoader()
    const response = await fetch(`https://openapi.programming-hero.com/api/level/${levelNo}`);
    const data = await response.json();
    removeClass();
    document.getElementById(`btn-${levelNo}`).classList.add('active');
    displayCards(data.data);
}

// details btn load
const detailsBtn = async(id) =>{
    const response = await fetch(`https://openapi.programming-hero.com/api/word/${id}`);
    const data = await response.json();
    showDetails(data.data);
}
// show details 
const showDetails = (details) =>{
     document.getElementById('details-container').showModal();
    const detailsContext = document.getElementById('details-context')
    if(details.meaning == null){
        detailsContext.innerHTML =`
        <div class="border border-gray-100 p-4 rounded-2xl space-y-8">
                        <h3 class="text-xl md:text-3xl font-bold">${details.word} (<i class="fa-solid fa-microphone-lines"></i> : ${details.pronunciation})</h3>
                    <div class="space-y-2">
                        <h4 class=" font-semibold text-xl">Meaning</h4>
                    <p class="font-medium hind-siliguri">"অর্থ পাওয়া যায়নি"</p>
                    </div>

                    <div class="space-y-2">
                        <h4 class="font-semibold text-xl">Example</h4>
                        <p class="font-medium">${details.sentence}</p>
                    </div>

                    <div class="space-y-2">
                        <h4 class="font-semibold text-xl hind-siliguri">সমার্থক শব্দ গুলো</h4>
                        <div class="flex flex-wrap gap-3">
                              ${details.synonyms.map(word => `<button class="bg-[#D7E4EF] btn">${word}</button>`).join('')}
                        </div>
                    </div>
                    </div>
    `;
    }

    else{
        detailsContext.innerHTML =`
        <div class="border border-gray-100 p-4 rounded-2xl space-y-8">
                        <h3 class="text-xl md:text-3xl font-bold">${details.word} (<i class="fa-solid fa-microphone-lines"></i> : ${details.pronunciation})</h3>
                    <div class="space-y-2">
                        <h4 class=" font-semibold text-xl">Meaning</h4>
                    <p class="font-medium hind-siliguri">${details.meaning}</p>
                    </div>

                    <div class="space-y-2">
                        <h4 class="font-semibold text-xl">Example</h4>
                        <p class="font-medium">${details.sentence}</p>
                    </div>

                    <div class="space-y-2">
                        <h4 class="font-semibold text-xl hind-siliguri">সমার্থক শব্দ গুলো</h4>
                        <div class="flex flex-wrap gap-3">
                             ${details.synonyms.map(word => `<button class="bg-[#D7E4EF] btn">${word}</button>`).join('')}
                        </div>
                    </div>
                    </div>
    `;
    }
}

const displayAllLevelsBtn = (buttons) =>{
    const buttonContainer = document.getElementById('button-container');
    buttons.forEach(btn => {
        const div = document.createElement('div');
        div.innerHTML =`
         <button id="btn-${btn.level_no}" onclick = "allCards('${btn.level_no}')" class="btn-img btn border border-[#422AD5] text-[#422AD5] hover:bg-[#422AD5] hover:text-white">
             <img src="assets/fa-book-open.png" alt=""> Lesson${-btn.level_no} </button>
        `;
        buttonContainer.appendChild(div);
    });
}

const displayCards = (cards) => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.style.display = 'none';
    const cardsBox = document.getElementById('cards');
    cardsBox.innerHTML = "";

    const errorContainer = document.getElementById('error-container');
    errorContainer.innerHTML = "";
    if (cards == "") {
        errorContainer.innerHTML = `
       <div class="flex flex-col gap-2 py-16">
                        <img class="h-24 w-24 mx-auto" src="assets/alert-error.png" alt="">
                        <p class="text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                        <h2 class="text-gray-700 text-[34px] font-medium">নেক্সট Lesson এ যান</h2>
                    </div>
        `;
        hideLoader()
        return;
    }

    cards.forEach(card => {
        // console.log(card)
        const div = document.createElement('div');
        if(card.meaning == null){
            div.innerHTML = `
                    <div class="p-5 rounded-lg bg-white space-y-10 h-full ">
                        <div class ="border border-gray-100 p-5 hover:bg-[#1a90ff0a] rounded-lg">
                        <div class="flex flex-col justify-center items-center space-y-5 text-[#000000]">
                            <h3 class=" text-3xl font-bold">${card.word}</h3>
                            <p class="font-medium">Meaning /Pronunciation </p>
                            <p class="text-gray-700 text-[26px]  font-semibold hind-siliguri">"অর্থ নেই / ${card.pronunciation}"</p>
                        </div>
                        <div class="flex justify-between text-gray-700">
                            <button onclick ="detailsBtn('${card.id}')" class= " bg-[#1A91FF10] btn rounded-lg"><i class="fa-solid fa-circle-info"></i>
                            </button>
                            <button onclick ="pronounceWord('${card.word}')" class= " bg-[#1A91FF10] btn rounded-lg"><i class="fa-solid fa-volume-high"></i>
                            </button>
                        </div>
                        </div>
                    </div>   
        `;
        }
        else{
            div.innerHTML = `
                    <div class=" p-5 rounded-lg bg-white space-y-10 h-full ">
                      <div class =" border border-gray-100 p-5 hover:bg-[#1a90ff0a] rounded-lg">
                       <div class="flex flex-col justify-center items-center space-y-5 text-[#000000] ">
                            <h3 class=" text-3xl font-bold">${card.word}</h3>
                            <p class="font-medium">Meaning /Pronunciation </p>
                            <p class="text-gray-700 text-[26px] font-semibold hind-siliguri">"${card.meaning} / ${card.pronunciation}"</p>
                        </div>
                        <div class="flex justify-between text-gray-700">
                            <button onclick ="detailsBtn('${card.id}')" class= "bg-[#1A91FF10] btn rounded-lg"><i class="fa-solid fa-circle-info"></i>
                            </button>
                            <button onclick ="pronounceWord('${card.word}')" class= " bg-[#1A91FF10] btn rounded-lg"><i class="fa-solid fa-volume-high"></i>
                            </button>
                        </div>
                      </div>
                    </div>        
        `;
        }
        cardsBox.appendChild(div);
    })
    hideLoader()
}

loadAllLevelsBtn();