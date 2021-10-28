import { createApp, provide, h } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
// For apollo client 
import { ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client/core';
// , gql
// For composable
import { DefaultApolloClient } from '@vue/apollo-composable';
import App from './App.vue';
import Visuals from './components/Visuals.vue';
import Corner from './components/Corner.vue';
import Home from './components/Home.vue';

// Set up Router
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Home },
        { path: '/visuals', component: Visuals },
        { path: '/corner', component: Corner },
    ]

});

// console.log("uri: " + process.env.VUE_APP_SOURCELINK_API_URL);

// Set up Apollo GraphQL
const httpLink = createHttpLink({
    // uri: process.env.VUE_APP_SOURCELINK_API_URL,
    uri: 'http://admin.picturingurbanrenewal.org/archive/graphql/'
    // uri: 'http://127.0.0.1:8000/archive/graphql/'
    // uri: 'https://rickandmortyapi.com/graphql',
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
})


// Test access to graphql
// const query = gql`
//     query {
//         characters {
//             results {
//                 name
//             }
//         }
//     }
// `

// const query = gql`
//      query { hello }
//  `

// apolloClient.query({
//     query
// }).then(res => console.log(res))


// const app = 
const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient)
    },

    render: () => h(App),
})
app.use(router)
app.mount('#app')
