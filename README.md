## Backend (AWS Lambda - TypeScript)
- Auth Lambda (validation)
- Weather API integration
- Retry with exponential backoff
- Caching (Map, TTL 1 min)
- JWT Authorizer
- Unit testing (Jest)

How To Test -
cd backend
npm install
npm test

Flow- 
Angular → HTTP call → API Gateway → Lambda → Response → Angular UI
