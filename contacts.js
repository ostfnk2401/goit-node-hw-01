const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contactsArr = await listContacts();
  const result = contactsArr.find((el) => el.id === contactId);
  return result ? result : null;
}

async function removeContact(contactId) {
  const contactsArr = await listContacts();
  const index = contactsArr.findIndex((el) => el.id === contactId);
  const result = contactsArr[index];
  if (!result) {
    return null;
  } else {
    contactsArr.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contactsArr, null, 2));
    return result;
  }
}

async function addContact(name, email, phone) {
  const contactsArr = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contactsArr.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsArr, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
