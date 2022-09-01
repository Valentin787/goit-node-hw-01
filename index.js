const { Command } = require("commander");
const {
	listContacts,
	addContact,
	getContactById,
	removeContact,
} = require("./contacts");

const program = new Command();
program
	.option("-a, --action <type>", "choose action")
	.option("-i, --id <type>", "user id")
	.option("-n, --name <type>", "user name")
	.option("-e, --email <type>", "user email")
	.option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case "list":
			listContacts().then((res) => console.table(res));
			break;

		case "get":
			getContactById(id).then((res) =>
				 !res.length ? console.table(res) : console.log("contactId not found")
			);
			break;

		case "add":
			addContact(name, email, phone);
			break;

		case "remove":
			removeContact(id);
			break;

		default:
			console.warn("\x1B[31m Unknown action type!");
	}
}

invokeAction(argv);