import { NavigationMixin } from 'lightning/navigation';
import { LightningElement, wire, api } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import COLOR_FILED from '@salesforce/schema/Animal__c.Color__c';

import searchAnimals from '@salesforce/apex/AnimalController.searchAnimals';

export default class animalList extends NavigationMixin(LightningElement) {
	@api recordId;
	searchTerm = '';

	@wire(searchAnimals, {searchTerm: '$searchTerm'})
	animals;

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