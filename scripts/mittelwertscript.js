const mittelwertSubmitButton = document.querySelector(".mittelwert-submit button"); 

mittelwertSubmitButton.addEventListener("click", (e) => {
    const input = document.querySelector(".mittelwert-input"); 
    if(input instanceof HTMLInputElement) {
        const value = input.value; 
        if(value !== "") {
            createElement(true, value); 
        } else {
            createElement(false, "The input must not be empty!"); 
        }
    } else {
        createElement(false, "The text input field is somehow no HTML Input Element???"); 
    }
}); 


const createElement = async (valid, content) => {

    const res = document.querySelector(".mittelwert-autoresponse"); 

    if(res) {
        if(!valid) {
            res.textContent = content; 
        } else {
            const replaced = await content.replace(/\s/gi, ""); 
            const splitted = replaced.split(","); 
            if(splitted instanceof Array) {

                for(const e of splitted) {
                    if(isNaN(e)) {
                        return res.textContent = `The entry "${e}" is not a number!`; 
                    }
                }

                const result = calculateMittelwert(splitted); 

                if(isNaN(result)) {
                    return res.textContent = "An error occured whilst trying to calculate the result!"; 
                }

                res.textContent = result; 
            } 
        }
    } else {
        if(!valid) {

            const p = document.createElement("p"); 
            p.textContent = content; 
            p.classList.add("mittelwert-autoresponse"); 
            document.querySelector(".content").append(p); 
            
        } else {
            
            const p = document.createElement("p"); 
            p.classList.add("mittelwert-autoresponse"); 


            const replaced = await content.replace(/\s/gi, ""); 
            const splitted = replaced.split(",");
            
            if(splitted instanceof Array) {
                
                for(const e of splitted) {
                    if(isNaN(e)) {
                        return p.textContent = `The entry "${e}" is not a number!`;
                    }
                }

                const result = calculateMittelwert(splitted); 

                if(isNaN(result)) {
                    return p.textContent = "An error occured whilst trying to calculate the result!"; 
                }

                p.textContent = result; 

                document.querySelector(".content").append(p); 
            }
        }
    }
}; 

// formulas 

const calculateMittelwert = (numbersArray) => {

    let added = 0;     
    numbersArray.map(x => added += parseFloat(x)); 

    return added / numbersArray.length; 
}
