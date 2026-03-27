import { Client, Account} from 'appwrite';

export const client = new Client();

console.log(process.env.APPWRITE_ENDPOINT);
console.log(process.env.APPWRITE_PROJECT_ID);

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject('66f3329e00077e81ceb6');

export const account = new Account(client);
export { ID } from 'appwrite';
