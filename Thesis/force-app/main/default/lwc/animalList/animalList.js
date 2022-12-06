
//TODO when change record card must be refreshed

import { NavigationMixin } from 'lightning/navigation';
import { LightningElement, wire, api } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import COLOR_FILED from '@salesforce/schema/Animal__c.Color__c';

/** BearController.searchBears(searchTerm) Apex method */
import searchAnimals from '@salesforce/apex/AnimalController.searchAnimals';

export default class animalList extends NavigationMixin(LightningElement) {
	@api recordId;

	searchTerm = '';
	colorOptions = [];
	selectedColor = 'Select';

	@wire(searchAnimals, {searchTerm: '$searchTerm', color: '$selectedColor'})
	animals;



	//get color of animal record type picklist
	@wire(getPicklistValues, { recordTypeId: '0127Q000000ywLlQAI', fieldApiName: COLOR_FILED })
	wiredColors({error, data}) {
		if (data){
			this.colorOptions = data.values;
			this.error = undefined;
			console.log(data.values);
		} else{
			this.colorOptions = undefined;
			this.error = error;
			console.log(error);
		}
	}

	selectionChangeHandler(event){
		window.clearTimeout(this.delayTimeout);
		const selectedColorTmp = event.target.value;

		this.delayTimeout = setTimeout(() => {
			this.searchTerm = selectedColorTmp;
		}, 300);
	}

	handleSearchTermChange(event) {
		// Debouncing this method: do not update the reactive property as
		// long as this function is being called within a delay of 300 ms.
		// This is to avoid a very large number of Apex method calls.
		window.clearTimeout(this.delayTimeout);
		const searchTerm = event.target.value;
		// eslint-disable-next-line @lwc/lwc/no-async-operation
		this.delayTimeout = setTimeout(() => {
			this.searchTerm = searchTerm;
		}, 300);
	}
	get hasResults() {
		return (this.animals.data.length > 0);
	}
	handleAnimalView(event) {
		// Get animal record id from animalview event
		const animalId = event.detail;
		// Navigate to animal record page
		this[NavigationMixin.Navigate]({
			type: 'standard__recordPage',
			attributes: {
				recordId: animalId,
				objectApiName: 'Animal__c',
				actionName: 'view',
			},
		});
	}
}