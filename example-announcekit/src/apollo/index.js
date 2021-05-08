import { ApolloClient, ApolloLink, concat, HttpLink, InMemoryCache } from '@apollo/client';
import { prmApiUri } from '../provider';


const httpLink = new HttpLink({ uri: prmApiUri });

const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext({
        headers: {
            'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token'))?.accessToken,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    return forward(operation);
})

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, httpLink)
});