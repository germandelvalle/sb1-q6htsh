# Boom Tool Stack & Methodologies - 12/11/2024

## Layers separation
- Routing
    - Layouts + Paging + Params [Doc related](https://nextjs.org/docs/14/app/building-your-application/routing)
- Deploys 
    - Handle by framework [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
- Each page - **presentational components approach**
    - Components just render info, but let's custom hooks and/or stores handle states and business logics 
- Custom Hooks
    - For business logic separation... examples:
        - useClients => handle the way we prepare the list of clients, applying filters.. calling API resftul, etc.
        - useScopes
        - useOneClient
- API Layer
    - For API Restful calls (you can use `fetch()` / `axios()` or whatever you want, but keep the separation by responsability concept)
        

## Stack

* **Next.js** v 14 as frontend framework
    - ***now there is a v 15.x.x but comes with react 19 and have some compatilibty issues with already used libraries***

* **shadcn/ui** as components library

* **react-hooks-form** as form builder/validator library

* **faker-js** as faker library to create random and useful data



    