document.querySelectorAll('.easySelect').forEach( (item) => {
    item.addEventListener('click', function(event){

        event.stopPropagation();
    
        let optionsList = this.querySelector('.easySelect__options-list');

            
        if ( optionsList.getAttribute('data-state') == 'rolled' ){
            let activeSelectList = document.querySelectorAll('.easySelect[data-state="active"]');
            if ( activeSelectList !== null ) {
                activeSelectList.forEach( (item) => { 
                    item.removeAttribute('data-state');
                    item.querySelector('.easySelect__options-list').setAttribute('data-state', 'rolled');
                })
            }
            item.setAttribute('data-state', 'active');
            optionsList.setAttribute('data-state', 'deploy');
        } else {

            

            item.removeAttribute('data-state');
            optionsList.setAttribute('data-state', 'rolled');
        }
        
        
    })
})



document.querySelectorAll('.easySelect__option').forEach( (item) => {
    item.addEventListener('click', function(){
        let mainParent = this.closest('.easySelect');
        let curValueBlock = mainParent.querySelector('.easySelect__cur-value');
        curValueBlock.innerHTML = this.innerHTML;
        curValueBlock.setAttribute('data-value', this.getAttribute('data-value'));
        
        let hiddenInput =  mainParent.querySelector('.easySelect__hide-input');

        if (hiddenInput !== null ){
            hiddenInput.value = this.getAttribute('data-value');
        }

        if ( this.hasAttribute('data-checked')  == false ){
            let checkedElement = mainParent.querySelector('.easySelect__option[data-checked="checked"]');
            if ( checkedElement !== null ) {
                checkedElement.removeAttribute('data-checked');
            }

            this.setAttribute('data-checked', 'checked');
        }


    })
})


window.addEventListener('click', function(event){
    let textClass = event.target.getAttribute('class');
    if ( textClass === null ) textClass = '';

    if (  textClass.includes('easySelect') == false ){
        let activeSelectList = document.querySelectorAll('.easySelect[data-state="active"]');
            activeSelectList.forEach( (item) => { 
                item.removeAttribute('data-state');
                item.querySelector('.easySelect__options-list').setAttribute('data-state', 'rolled');
            });
       
    }
})




