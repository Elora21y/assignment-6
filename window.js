// get started with name and password
document.getElementById('get-start-btn').addEventListener('click' , (event)=>{ 
    event.preventDefault();
    const name = document.getElementById('person-name').value;
    const pin = parseInt(document.getElementById('pin-number').value);
    if(name){
        if(pin === 123456){
            document.getElementById('navbar').classList.remove('hidden');
            document.getElementById('main').classList.remove('hidden');
            document.getElementById('banner').classList.add('hidden');
            // sweet alert
            Swal.fire({
                title: "অভিনন্দন",
                text: "চলুন আজ নতুন কিছু শেখা যাক!",
                icon: "success"
              });
        }
        else{
            alert('Wrong Password. Contact Admin to get your Login Code');
        }
    }
    else{
        alert('Please Tell Us Your Name First');
    }
})

// logout button
document.getElementById('logout-btn').addEventListener('click' , () =>{
    document.getElementById('navbar').classList.add('hidden');
    document.getElementById('main').classList.add('hidden');
    document.getElementById('banner').classList.remove('hidden');

    document.getElementById('person-name').value = '';
    document.getElementById('pin-number').value = '';
})

// scroll
const faqBtn = document.getElementById('FAQ-btn');
faqBtn.addEventListener('click' , ()=>{
  const faqSection = document.getElementById('FAQ-section');
  const offset = 100;
  const position = faqSection.offsetTop - offset;
  window.scrollTo({ top: position, behavior: "smooth"
  })
})

const learnBtn = document.getElementById('learn-btn');
learnBtn.addEventListener('click' , ()=>{
  const learnSection = document.getElementById('learn-section');
  const offset = 100;
  const position = learnSection.offsetTop - offset;
  window.scrollTo({ top: position, behavior: "smooth"
  })
})

// loading 
function showLoader(){
    document.getElementById('loader').classList.remove('hidden');
    document.getElementById('error-container').classList.add('hidden')
    document.getElementById('cards').classList.add('hidden')
}

function hideLoader(){
    document.getElementById('loader').classList.add('hidden');
    document.getElementById('error-container').classList.remove('hidden')
    document.getElementById('cards').classList.remove('hidden')
}

