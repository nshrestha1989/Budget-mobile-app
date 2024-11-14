import { Client, Account, Databases, ID } from 'appwrite';

const createAdminClient = new Client();
const {
  VITE_ENDPOINT,
  VITE_PROJECT_ID,
} = import.meta.env;

createAdminClient
  .setEndpoint(VITE_ENDPOINT)
  .setProject(VITE_PROJECT_ID);

const account = new Account(createAdminClient);
const database = new Databases(createAdminClient);

// Function to get the JWT token
async function getJWT() {
  try {
    // Get JWT token for the current user
    const jwtResponse = await account.createJWT();
    console.log('JWT:', jwtResponse);
    return jwtResponse.jwt;
  } catch (error) {
    console.error('Error getting JWT:', error);
    throw new Error('Failed to fetch JWT token');
  }
}

// Fetch collection data function
const useFetchCollection = async (
  databaseId: string,
  collectionId: string,
  documentId?: string,
  orderField?: string,
  orderType: "ASC" | "DESC" = "ASC",
  filters?: string,
  limit: number = 50,
  offset: number = 0
) => {
  // Get the JWT token before making API call
  const token = await getJWT();

  if (!token) {
    throw new Error("No session found. Please login.");
  }

  // Set the JWT token for authenticated requests
  database.client.setJWT(token);

  try {
    let response;

    if (documentId) {
      // Fetch a single document by ID
      response = await database.getDocument(databaseId, collectionId, documentId);
      return response;
    } else {
      // Build the query parameters for ordering, filtering, and pagination
      let queryParams: string[] = [];  // Array of valid query strings

      if (orderField) {
        queryParams.push(`order(${orderField},${orderType})`);
      }

      if (filters) {
        queryParams.push(`filter(${filters})`);
      }

      if (limit) {
        queryParams.push(`limit(${limit})`);
      }

      if (offset) {
        queryParams.push(`offset(${offset})`);
      }

      // Ensure the queries parameter is an array of valid strings
      if (queryParams.length > 0) {
        // Fetch all documents in the collection with valid query parameters
        // response = await database.listDocuments(databaseId, collectionId, queryParams);
        // return response.documents;
      } else {
        // If no query parameters, fetch documents without filters
        response = await database.listDocuments(databaseId, collectionId);
        return response.documents;
      }
      response = await database.listDocuments(databaseId, collectionId);
      return response.documents;
    }
  } catch (error) {
    console.error("Error fetching documents:", error);
    throw error;
  }
};

export default useFetchCollection;

export { createAdminClient, database, account, ID };
