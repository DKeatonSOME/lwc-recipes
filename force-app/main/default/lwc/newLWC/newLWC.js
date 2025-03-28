import { LightningElement, wire } from 'lwc'; /*wire lets SF  know we're using apex*/
import getContacts from '@salesforce/apex/ContactController.getContactList';
/*the import up here calls and apex class and a method and gives it the new name:
getContacts*/

const COLS = [
    { label: 'First Name', fieldName: 'FirstName' },
    { label: 'Last Name', fieldName: 'LastName' },
    { label: 'Title', fieldName: 'Title' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Email', fieldName: 'Email', type: 'email' },

];
/*the colums for the table are here*/
export default class NewLWC extends LightningElement {
   columns = COLS;

    @wire(getContacts)
    contacts;
/*the @wire decorator lets SF know the contacts 
in the table are coming from getContacts.  Contacts
will be used in the html*/

async handlechange() {
    try {
        this.contacts = await getContacts();
        this.error = undefined;
    } catch (error) {
        this.contacts = undefined;
        this.error = error;
    }
}
}