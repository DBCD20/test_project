const               searchBox     = document.querySelector('#searchbox'),
                    filterBox     = document.querySelector('#filterBox'),
                    clientBox     = document.querySelector('#container #clientBox'),
                    detailsBox    = document.querySelector('#detailsBox'),
                    addNewBtn     = document.querySelector('#add-new'),
                    fragment      = document.createDocumentFragment(),
                    saveBtn       = document.querySelector('#container #save'),
                    caret         = document.querySelector('#span-search i'),
                    // details       = document.querySelector('#details'),
                    close         = document.querySelector('#close'),
                    remove        = document.querySelector('#delete'),
                    list          = document.querySelector('ul').childNodes,
                    edit          = document.querySelector('#edit'),
                    xhr           = new XMLHttpRequest(),
                    ul            = document.querySelector('#container ul');
            
let populate = () => {
            ul.innerHTML ='';
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4 && xhr.status == 200){
                    let parsedList = JSON.parse(xhr.responseText)
                    console.log(parsedList)
                    parsedList.forEach(function(d) {
                        let li = document.createElement('li')
                            li.dataset.id = d._id;
                            li.textContent = d.client;
                            fragment.appendChild(li)
                    })
                    ul.appendChild(fragment)
                }
            }
            xhr.open('GET', '/api/data')
            xhr.send()
  },
editable = (bool) => {
        clientBox.setAttribute('contenteditable', bool)
        detailsBox.setAttribute('contenteditable', bool)
        if(bool){clientBox.focus()}
},
    content = (arg) => {
        clientBox.innerText = arg;
        detailsBox.innerText = arg;
    },
    clearId = () => {
        clientBox.removeAttribute('data-id')
        detailsBox.removeAttribute('data-id')
    },
    refresh = () => {
        saveBtn.style.display = 'block';
        close.style.display = 'inline';
        remove.style.display = 'none';
        edit.style.display = 'none';
        editable(true);
        content('');  
    };
    
addNewBtn.onclick = function(e) {
    e.stopPropagation()
    editable(true)
    content('')
    refresh()
    clearId()
    this.style.display = 'none';
    

}


//CREATE AND UPDATE XHR
let request = (req, seedData, id) => {
    let url = {
            POST:   'api/data',
            PUT:    'api/data/' + id + '?_method=PUT',
            DELETE: 'api/data/' + id + '?_method=DELETE'
        }
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4 && xhr.status == 200){
        populate();
    }}
    xhr.open('POST', url[req.toUpperCase()])
    xhr.setRequestHeader('content-type', 'application/json')
    xhr.send(seedData)
    }

//CREATE NEW CLIENT DB
saveBtn.onclick  = function(event) {
    event.stopPropagation();
    addNewBtn.style.display = 'block';
    var client  = clientBox.innerText,
        details = detailsBox.innerText;
    //CLEAR TO TEXT OF DIVS
    
    if( (client && details) === ""){
        refresh()
        alert("Please make sure to fill up the form")
    return
    } else {
        var infoData = {
            client: client,
            acceptSR: details
    }
    var data = JSON.stringify(infoData);
// ===================================
//  POST REQUEST TO UPDATE ROUTE
// ===================================
        if(clientBox.dataset.id && detailsBox.dataset.id){
            request('PUT', data, clientBox.dataset.id)
            close.style.display = 'none';
            remove.style.display = 'none';
        } else {
            console.log(data)
            request('POST', data)
        }
  }
    close.style.display ='none';
    content('')
    editable(false)
    this.style.display = 'none';
}
//SHOW SPECIFIC CLIENT
ul.onclick = event => {
    event.stopPropagation();
    if(event.target && event.target.nodeName == "LI"){
        let infoId = event.target.dataset.id;
            xhr.onreadystatechange = () => {
            if(xhr.readyState == 4 && xhr.status == 200){
                data = JSON.parse(xhr.responseText)
                clientBox.innerText     = data.client;
                clientBox.dataset.id    = data._id;
                detailsBox.innerText    = data.acceptSR;
                detailsBox.dataset.id   = data._id;
                editable('false'),
                
                addNewBtn.style.display = '';
                edit.style.display = 'inline';
                remove.style.display ='inline';
            }
    }
    xhr.open('GET', 'api/data/'+ infoId)
    xhr.send()
    }
    //CHANGE CIRCLE BUTTON TO EDIT
    ul.style.height = '';
    saveBtn.style.display ='none'
    //LET THE SAVE BUTTON APPEAR
}
//UPDATE CONTENT
edit.onclick = function() {
    editable(true)
    close.style.display = 'inline';
    saveBtn.style.display = 'block';
    this.style.display = 'none';
}
close.onclick = function(event){
    event.stopPropagation();
    editable(false)
    saveBtn.style.display = 'none';
    addNewBtn.style.display = '';
     this.style.display = 'none';
        if((clientBox.innerText && detailsBox.innerText) == ''){
             edit.style.display = 'none';
        } else {
             edit.style.display = 'inline';
        }

}
//SEARCH BAR
filterBox.onkeyup = event => {
    event.stopPropagation();
    for( let i = 0; i < list.length; i++){
       if(list[i].innerText.indexOf(filterBox.value) > -1){
           ul.style.height = 'auto';
           list[i].style.display = '';
       } else{
           list[i].style.display = 'none'; 
       }
       
    }
}
remove.onclick = function(){
    request('DELETE','',clientBox.dataset.id);
    clearId();
    editable(false)
    edit.style.display = '';
    this.style.display = '';
    close.style.display = '';
    saveBtn.style.display = '';
    content('')
} 
caret.onclick = event => {
    if( ul.style.height == 0) {
        ul.style.height = 'auto';
    } else {
        ul.style.height = ''
    }
    event.stopPropagation();
}
 filterBox.onfocus = event => {
     event.stopPropagation();
     ul.style.height = 'auto';
     searchBox.style.boxShadow = '0px 5px 17px -6px rgba(57,56,56,0.75)';
 }
filterBox.onblur = event => {
    event.stopPropagation();
    ul.style.height = '0';
    searchBox.style.boxShadow = 'none';
}
window.onload = populate;

//FIX MARGIN OF DETAILS BOX
//FIX TITLE MATCH WITH EXISTING TITLE