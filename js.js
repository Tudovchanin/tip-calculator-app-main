const { customPercentage, percentage, bill, people, btnReset } = getElements();
const errorText = document.querySelector('.error-people');

customPercentage.oninput = handleInput;
bill.oninput = handleInput;
people.oninput = handleInput;
percentage.forEach(element => {

	element.onclick = function () {

		const objData = getData(element);

		if (dataChecking(objData)) {
			count(objData.bill, objData.percentage, objData.numberOfPeople);
		}
	}
});
btnReset.onclick = function () {
	const inputFields = [customPercentage, bill, people];
	const outputFields = [document.querySelector('.tip-amount'), document.querySelector('.total-person')];
	inputFields.forEach(field => field.value = '');
	outputFields.forEach(field => field.value = '');
	deActivationBtnReset()
	showScore('0.00', '0.00')
}


function getElements() {
	const customPercentage = document.querySelector('.custom-percentage');
	const percentage = document.querySelectorAll('.percentage');
	const bill = document.querySelector('.bill');
	const people = document.querySelector('.number-of-people');
	const btnReset = document.querySelector('.reset');

	return {
		customPercentage,
		percentage,
		bill,
		people,
		btnReset
	};
}
function getData(percentage) {
	const data = {
		bill: +bill.value,
		percentage: percentage ? +percentage.value : null,
		customPercentage: +customPercentage.value,
		numberOfPeople: +people.value,
	}
	return data;
}
function dataChecking({ bill, numberOfPeople, customPercentage, percentage }) {
	return (bill && numberOfPeople && customPercentage) || (bill && numberOfPeople && percentage);
}
function handleInput() {
	checkIfLessThanOne(people)
	const objData = getData();
	if (dataChecking(objData)) {
		count(objData.bill, objData.customPercentage, objData.numberOfPeople);
		return;
	}
}
function checkIfLessThanOne(elem) {
	if (parseFloat(elem.value) === 0) {
		elem.value = '';
		showError(errorText, people);
		return;
	}
	hideError(errorText, people);
}
function count(bill, percentage, numberOfPeople) {
	const tip = ((bill * percentage / 100) / numberOfPeople).toFixed(2);
	const totalPerson = ((bill + (bill * percentage / 100)) / numberOfPeople).toFixed(2);
	showScore(tip, totalPerson);
	activationBtnReset();
}
function showScore(tip, total) {
	let tipAmount = document.querySelector('.tip-amount');
	let totalPerson = document.querySelector('.total-person');
	tipAmount.value = `$${tip}`;
	totalPerson.value = `$${total}`;
}
function activationBtnReset() {
	btnReset.classList.add('active-reset');
}
function deActivationBtnReset() {
	btnReset.classList.remove('active-reset');
}

function showError(text, input) {
	text.classList.add('error-active');
	input.classList.add('error-border');
}

function hideError(text, input) {
	text.classList.remove('error-active');
	input.classList.remove('error-border');
}