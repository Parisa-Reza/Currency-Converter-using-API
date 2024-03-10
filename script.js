const BASE_URL="https://2024-03-06.currency-api.pages.dev/v1/currencies";

const dropdownSelect=document.querySelectorAll(".dropdown-container select");

const btn=document.querySelector("form button")
const fromCurr=document.querySelector(".from select")
const toCurr=document.querySelector(".to select")
const msg=document.querySelector(".msg")

for(let select of dropdownSelect)
{
    for (let currCode in countryList)
    {
       let newOption=document.createElement("option")
       newOption.innerText=currCode;
       newOption.value=currCode;
       if(select.name==="from" && currCode==="USD")
       {
        newOption.selected="selected"
       }
       else if ( select.name==="to" && currCode==="BDT" )
       {
        newOption.selected="selected"
       }
       
       select.append(newOption);
    }

    select.addEventListener("change",(evnt)=>
    {
     updateImageFunc(evnt.target);
    })
}

const updateImageFunc=(element)=>
{
    let currCode=element.value;
    let countrycode=countryList[currCode];
    let newImgSrc=`https://flagsapi.com/${countrycode}/flat/64.png`
   let img= element.parentElement.querySelector("img");
   img.src=newImgSrc;
}

///changing currancy
btn.addEventListener("click",async(evt)=>
{
    evt.preventDefault();// button press e pura page reload na hoi
    let amount=document.querySelector(".amount input") //html theke form er amount input dhorlam
    let amtVal=amount.value;
   if (amtVal==="" || amtVal<1)
   {
    amtVal="1";
    amount.value=1;
    alert("Please enter valid amount")
   }

    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let respose= await fetch(URL)
    let data= await respose.json()
    let rate=  data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]
   let finalAmount=amtVal*rate;
   //console.log(finalAmount);
   msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}` //ekahne fromCurr.value na dile fromcurr er element ta ashto not currency value
                   // 1 USD= 109 BDT


})
