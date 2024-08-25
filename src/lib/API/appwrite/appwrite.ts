import { Client, Account, Databases,ID} from 'appwrite';

const createAdminClient = new Client();
const {
    VITE_ENDPOINT,
    VITE_PROJECT_ID,
    VITE_APP_OPTIONS_ABUSE
  } =import.meta.env;
createAdminClient
    .setEndpoint(VITE_ENDPOINT)
    .setProject(VITE_PROJECT_ID)


const account = new Account(createAdminClient);
const database = new Databases(createAdminClient);

export {createAdminClient,database,account,ID}
