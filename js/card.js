const loadPhones = async (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};

const displayPhones = (phones, dataLimit) => {
  const PhonesContainer = document.getElementById("phone-container");

//   clear our list for new search
  PhonesContainer.textContent = '';


  //show all button work
  // show all button see 
  const showAll = document.getElementById('show-all');
  if(dataLimit && phones.length > 20){
    //display 20 phones only 
    phones = phones.slice(0, 20);
    // show all button see
    showAll.classList.remove('d-none')
  }else{
    showAll.classList.add('d-none')
  }


    // error massage or phones not matching message 
    const noPhoneFound = document.getElementById('no-found-message');
    if(phones.length === 0){
        noPhoneFound.classList.remove('d-none')
    }
    else{
        noPhoneFound.classList.add('d-none')
    }

    //display all phones
    phones.forEach((phone) => {
        const phoneDiv = document.createElement("div");
        phoneDiv.classList.add("col");
        phoneDiv.innerHTML = `
            <div class="card p-4">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
                </div>
        </div>
            `;
        PhonesContainer.appendChild(phoneDiv);
  });
  //stop loader
  toggleSpiner(false);
};

//serch buttopn
document.getElementById('btn-search').addEventListener('click', function(){
    // stat loader 
    processSearch(20);
});
//search input filed enter key handler
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      processSearch(20);
    }
});

const processSearch = (dataLimit) => {
    // stat loader 
    toggleSpiner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText,dataLimit);
}

//handle search button
const toggleSpiner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }else{
        loaderSection.classList.add('d-none')
    }
};


// not the best way to load show all
document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
})

// load phone details 
const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data)
}

//modal details
const displayPhoneDetails = phone => {
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML=`
    <p style="color: red;" ><b>Release Date:</b> ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
    <p><b>Memory:</b> ${phone.mainFeatures ? phone.mainFeatures.memory: 'No Memory Details Here'}</p>
    <p><b>Chip Set:</b> ${phone.mainFeatures.chipSet}</p>
    <p><b>Display Size:</b> ${phone.mainFeatures.displaySize}</p>
    <p><b>Memory:</b> 
    ${phone.mainFeatures.sensors}</p>
    <p>Bluetooth: ${phone.others ? phone.others.Bluetooth: 'No Blutooth informatipn Here'}</p>
    <p>GPS: ${phone.others ? phone.others.GPS: 'No GPS informatipn Here'}</p>
    <p>USB: ${phone.others ? phone.others.USB: 'No USB informatipn Here'}</p>
    
    `
}

//tarnari operater if else
// ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}