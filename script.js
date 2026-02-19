
let fromSelect = document.getElementById("fromCurrency")
let toSelect = document.getElementById("toCurrency")
let amountInput = document.getElementById("amount")
let btn = document.getElementById("convertBtn")



async function currency() {
    let response = await fetch("https://api.exchangerate-api.com/v4/latest/USD")
    let data = await response.json()
  let currencies = Object.keys(data.rates)
  currencies.forEach(currency => {
    let option1 = document.createElement("option")
    option1.value = currency
    option1.textContent = currency

    let option2 = document.createElement("option")
    option2.value = currency
    option2.textContent = currency
   if (currency === "INR") {
    option1.selected = true;   
  }
if (currency === "USD") {
    option2.selected = true;  
  }
    fromSelect.append(option1)
    toSelect.append(option2)
  });
  
}
currency()

fromSelect.addEventListener("change",(evt)=>{
upadateFlag(evt.target)
})
toSelect.addEventListener("change",(evt)=>{
  upadateFlag(evt.target)
})
const upadateFlag = (element) =>{
  let currCode = element.value
  let countryCode = countryList[currCode]
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
 if (element.id === "fromCurrency") {
        document.getElementById("fromImg").src = newSrc;
    } else if (element.id === "toCurrency") {
        document.getElementById("toImg").src = newSrc;
    }
 
}
btn.addEventListener("click", async ()=>{
 let amount = amountInput.value
  let fromCurr = document.getElementById("fromCurrency").value
  let toCurr = document.getElementById("toCurrency").value
  try{
    if(!amount || amount < 1)
       throw new Error("Amount should not be empty or less than 1");
    let response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurr}`)

  if(!response.ok)
    throw new Error("Internet or API issue")

    let data = await response.json()

    let rate = data.rates[toCurr]
    if(!rate)
      throw new Error("Currency rate not found")
    let result = amount * rate
    document.getElementById("result").innerHTML = `${amount} ${fromCurr} = ${result} ${toCurr}`

  }catch(err){
     document.getElementById("result").textContent = err.message
  }


})