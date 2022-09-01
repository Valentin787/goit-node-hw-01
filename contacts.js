const fs = require("fs").promises;
const path = require("path");
const short = require('shortid');


const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
	try {
    const data = await fs.readFile(contactsPath,'utf8');
    const result = JSON.parse(data);
		return result;
	} catch (err) {
		err.message = "listContacts error";
		throw new Error(err.message);
	}
}
async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const contactId = short();
	const newContact = { id:contactId, name, email, phone };
  const contactsList = [...contacts, newContact];

	try {
		await fs.writeFile(contactsPath, JSON.stringify(contactsList));
	} catch (err) {
		err.message = "addContact error";
		throw new Error(err.message);
	}
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const getId = contacts.find(item => item.id === contactId);
  return getId;

}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactsList = contacts.filter(item => item.id !== contactId);

  try {

    await fs.writeFile(contactsPath, JSON.stringify(contactsList));
		return console.log("contactId removed");
  } catch (error) {
    error.message = "removeContact error";
    throw new Error(error.message);
  }
}

module.exports = {
  listContacts,
  addContact,
  getContactById,
  removeContact
}

