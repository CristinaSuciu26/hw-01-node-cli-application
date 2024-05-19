import fs from "node:fs/promises";
import * as path from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import colors from "colors";
import { randomUUID } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const contactsPath = `${__dirname}/db/contacts.json`;
console.log(contactsPath);


  export async function listContacts() {
  try {
    console.log("GET contacts".bgBlue);
    const contents = await fs.readFile(contactsPath, { encoding: "utf8" });
    const contacts = JSON.parse(contents);
    console.table(contacts);
  } catch (error) {
    console.error("There is an error".bgRed.white);
    console.error(error);
  }
}

export async function getContactById(contactId) {
  try {
    const contents = await fs.readFile(contactsPath, { encoding: "utf8" });
    const contacts = JSON.parse(contents);
    const contact = contacts.find((c) => c.id === contactId);
    if (!contact) {
      throw new Error("Contact not found");
    }
    console.log("Contact found:".bgGreen, contact);
    return contact;
  } catch (error) {
    console.error("Error getting contact by ID".bgRed.white);
    console.error(error);
    throw error;
  }
}

export async function removeContactById(contactId) {
  try {
    const contents = await fs.readFile(contactsPath, { encoding: "utf8" });
    let contacts = JSON.parse(contents);

    const index = contacts.findIndex((c) => c.id === contactId);
    if (index === -1) {
      throw new Error("Contact not found");
    }

    contacts.splice(index, 1);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    console.log("Contact deleted successfully".bgGreen);
  } catch (error) {
    console.error("Error removing contact by ID".bgRed.white);
    console.error(error);
    throw error;
  }
}

export async function addContact(name, email, phone) {
  try {
    const contents = await fs.readFile(contactsPath, { encoding: "utf8" });
    let contacts = JSON.parse(contents);

    const id = randomUUID();

    const newContact = {
      id,
      name,
      email,
      phone,
    };

    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    console.log("Contact added successfully".bgGreen);
  } catch (error) {
    console.error("Error adding contact".bgRed.white);
    console.error(error);
    throw error;
  }
}
