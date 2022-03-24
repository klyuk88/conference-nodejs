let hamburger = document.querySelector('.hamburger');
let mobmenu = document.querySelector('.mob-menu');

let header = document.querySelector('.header');

let mobItems = document.querySelectorAll('.mob-menu__item');


function rollItems(itemsList){
    itemsList.forEach( (item) => {
        item.classList.remove('open');
    })
}



window.addEventListener('resize', function(event){
    if ( window.innerWidth > 1367){
        document.body.classList.remove('mobmenu-open');
        header.classList.remove('mobmenu-open');
        mobmenu.classList.remove('open');
    }
})


mobmenu.addEventListener('click', function(event){
    let clicked = event.target;

    

    if ( clicked.classList.contains('mob-menu__item') && ( clicked.querySelector('.mob-sub-menu') )  ){
        
        if (clicked.classList.contains('open') ){
            clicked.classList.remove('open');
        } else{
            rollItems(mobItems);
            
            clicked.classList.add('open');
        }
      
        

    } else {
        rollItems(mobItems);
    }


})



if ( hamburger && mobmenu){
    hamburger.onclick = function(){

        if ( mobmenu.classList.contains('open') ){
            mobmenu.classList.remove('open');
            document.body.classList.remove('mobmenu-open')
            header.classList.remove('mobmenu-open');
            rollItems(mobItems);
        } else{
            mobmenu.classList.add('open');
            document.body.classList.add('mobmenu-open');
            setTimeout(() => {
                header.classList.add('mobmenu-open');    
            }, 250);
            
        }
        
    }
}

let addFile = document.querySelectorAll('.add-file');
let inputFile = document.querySelectorAll('.file-input');


if ( inputFile ){
    inputFile.forEach( (input) => {
        input.onchange = function(){
            let fileContainer = input.parentElement;
            let btn = fileContainer.querySelector('.add-file');
            btn.dataset.file = input.files[0].name;


            let span = document.createElement('span');
            span.innerText = input.files[0].name;
            fileContainer.prepend(span);

        }
    })
}

if ( addFile ) {

    addFile.forEach( (btn) => {
        btn.onclick = function(e){

            if ( btn.hasAttribute('data-file') === false){
                let fileContainer = btn.parentElement;
            
                let fileInput = fileContainer.querySelector('.file-input');

                fileInput.click();
            } else {
                btn.removeAttribute('data-file');
                let fileContainer = btn.parentElement;
            
                let fileInput = fileContainer.querySelector('.file-input');
                fileInput.value = null;

                let span = fileContainer.querySelector('span');
                if (span){
                    span.remove();
                }
            }


            

        }
    })

}

let textApprove = document.querySelectorAll('.easyCheckbox__text');

if ( textApprove ){
    textApprove.forEach( (text) => {
        text.onclick = function(e){


            if ( e.target.tagName == 'a' || e.target.tagName == 'A'){
                
            } else {
                e.preventDefault();
            }
        }
    })
}

let inpApprove = document.querySelector('#approve');
let formSendBtn = document.querySelector('.sendform-btn');


if ( inpApprove ){
    if ( inpApprove.checked ){
        formSendBtn.removeAttribute('disabled');    
    } else{
        formSendBtn.setAttribute('disabled', 'disabled');
    }


    inpApprove.onchange = function(){
        if ( inpApprove.checked ){
            formSendBtn.removeAttribute('disabled');    
        } else{
            formSendBtn.setAttribute('disabled', 'disabled');
        }
    }
}


let  accItems =  document.querySelectorAll('.easyAccordion__item');

let rolledAcc = document.querySelectorAll('.easyAccordion__item[data-state="rolled"]');
let deployedAcc = document.querySelectorAll('.easyAccordion__item[data-state="deploy"]');

rolledAcc.forEach( (item) => {

    item.querySelector('.easyAccordion__content').style.height = '0' + 'px';
} );

deployedAcc.forEach( (item) => {
    let innerHight = item.querySelector('.easyAccordion__content-inner').offsetHeight;
    item.querySelector('.easyAccordion__content').style.minHeight = innerHight + 'px';
    item.querySelector('.easyAccordion__content').style.height = '0' + 'px';
} );

document.querySelectorAll('.easyAccordion').forEach((item)=>{
    item.onclick = function(){
        this.classList.add('easyAccordion_ready')
    }
});

accItems.forEach( ( item )=> {
    item.onclick = function(){

        let acc = this.closest('.easyAccordion');
        let option = this.closest('.easyAccordion').getAttribute('data-option');
        
        if ( this.getAttribute('data-state') == 'rolled' ){
            

            if ( option == 'onlyone'){
                

                let deployed = acc.querySelector('.easyAccordion__item[data-state = "deploy"]');


                if ( deployed !== null){
                    let closedContent = deployed.querySelector('.easyAccordion__content');
                    
                    deployed.setAttribute('data-animated', 'true');

                    closedContent.addEventListener('animationend', ()=>{
                        deployed.querySelector('.easyAccordion__content').style.minHeight = '0px';
                        deployed.querySelector('.easyAccordion__content').style.height = '0px';
                        deployed.setAttribute('data-state', 'rolled');  
                        deployed.removeAttribute('data-animated');  
                        closedContent.classList.remove('hide-content');
                    }, {once:true});

                    deployed.querySelector('.easyAccordion__content').classList.add('hide-content');
                } else{
                    this.querySelector('.easyAccordion__content').style.height = '0px';
                }

                let innerHight = this.querySelector('.easyAccordion__content-inner').offsetHeight;
                this.querySelector('.easyAccordion__content').style.height = '0px';
                this.querySelector('.easyAccordion__content').style.minHeight = innerHight + 'px';
                this.setAttribute('data-state', 'deploy');
            } else{
                let innerHight = this.querySelector('.easyAccordion__content-inner').offsetHeight;
                this.querySelector('.easyAccordion__content').style.height = '0px';
                this.querySelector('.easyAccordion__content').style.minHeight = innerHight + 'px';
                this.setAttribute('data-state', 'deploy');
            }


        } else {
            if ( option == 'onlyone'){

            } else {
                let closedContent = this.querySelector('.easyAccordion__content');
                this.setAttribute('data-animated', 'true');
                closedContent.addEventListener('animationend', ()=>{
                    this.querySelector('.easyAccordion__content').style.minHeight = '0px';
                    this.querySelector('.easyAccordion__content').style.height = '0px';
                    this.setAttribute('data-state', 'rolled');  
                    closedContent.classList.remove('hide-content');
                    this.removeAttribute('data-animated');
                }, {once:true});

                this.querySelector('.easyAccordion__content').classList.add('hide-content');
            }    
        }
    }
} )



const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // },

  });
