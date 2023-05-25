//Get the user input fields and the calculation button

var amount = document.getElementById("amount");
var interest = document.getElementsByName("interest");
var duration = document.querySelector("select");
var calculateBtn = document.getElementById("calculate");

//Get the error message element, and result display elements

var errorMessageSpace = document.querySelector("span");
var monthlyPayment = document.getElementById("monthlyResult");
var totalPayment = document.getElementById("totalResult");

//Sets the lowest interest radio button to the checked state on page load. Otherwise, none of the buttons would be
//checked on load and it would require additional validation and error messages. 

interest[0].checked = true; 

//Loops through the radio buttons, checks which one of them is in the checked state and returns its value. 

function getInterest(){
	
	for(var i = 0; i < interest.length; i++){
		if(interest[i].checked){
			return interest[i].value;
		}
	}
}


//Checks if the text input value is not a number (isNaN), if the value is null (length equals 0) or is negative. 
//If any of these statements are true the funcion returns false. If none of them are true, the function returns true. 
//This function also clears the result fields in case user previously made some calculations. 

function validation(){

	if(isNaN(amount.value) || amount.value.length == 0 || amount.value < 0){
		monthlyPayment.innerHTML = "";
		totalPayment.innerHTML = ""; 
		return false;
	}
	
	return true; 
	
}

//Calls the validation function and checks if it returns true. If validation function returns false an error
//message is displayed under the text input. If the validation function returns true, the error message gets
//cleared (just in case it was previously already displayed). 

//Values of the user input fields are assigned to the corresponding variables (K, i, n) and the variables are
//implemented into the formula. 

function calculateMonthlyPayment(){

		if(!validation()){
			errorMessageSpace.innerHTML = "Please enter a valid value."; 
		}else{
			errorMessageSpace.innerHTML = ""; 

			let K = amount.value;
			let i = getInterest();
			let n = duration.value; 

			//Monthly installment calculation
			let monthly = K * (i / 12) / (1 - Math.pow((1 + i / 12), -n)); 
			//Total amount to be paid calculation (monthly installment times number of months)
			let total = monthly * n; 

			//Results are displayed in the cerresponding fields. 
			monthlyPayment.innerHTML = monthly.toFixed(2); 
			totalPayment.innerHTML = total.toFixed(2);
		}
}

//The calculateMonthlyPayment function is set as a click event listener on the calculate button. 
//This can also be done inline in HTML, but this way of assigning events enables multiple events
//to be assigned to an element when needed. 

calculateBtn.addEventListener("click", calculateMonthlyPayment);