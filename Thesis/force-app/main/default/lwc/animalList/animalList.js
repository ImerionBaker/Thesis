import { LightningElement, wire } from 'lwc';
import animalResources from '@salesforce/resourceUrl/animal_shelter';
/** BearController.getAllBears() Apex method */
import searchAnimals from '@salesforce/apex/AnimalController.searchAnimals';
export default class animalList extends LightningElement {
    // @wire(getAllAnimals) animals;
    searchTerm = '';
    @wire(searchAnimals, {searchTerm: '$searchTerm'})
    animals;
	appResources = {
		bearSilhouette: `${animalResources}/standing-cat-silhouette.png`,
	};


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
}