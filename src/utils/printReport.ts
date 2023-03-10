import { AppDataSource } from "../data-source";
import { Client } from "../entities/clients.entity";

const printReport = async () => {
  const clientRepository = AppDataSource.getRepository(Client);

  const clients = await clientRepository.find();
  console.log(clients);

  const body = [];

  for await (let contacts of clients) {
    const rows = new Array();
    rows.push(contacts.id);
    rows.push(contacts.name);
    rows.push(contacts.email);
    rows.push(contacts.phoneNumber);

    body.push(rows);
  }
  return body;
};

export default printReport;
