import { LightningElement, api, wire, track } from 'lwc';
import animalResources from '@salesforce/resourceUrl/animal_shelter';

export default class AnimalTile extends LightningElement {
	@api animal;


    appResources = {
            animalSilhouette: `${animalResources}/standing-cat-silhouette.png`,
     };
	

    handleOpenRecordClick() {
        const selectEvent = new CustomEvent('animalview', {
            detail: this.animal.Id
        });
        this.dispatchEvent(selectEvent);
    }

}