💱 Currency Exchange Simulation App
🧩 Problem Statement
Choosing the most profitable currency exchange rate can be difficult due to varying offers across different banks. Users often waste time comparing rates manually.

💡 Solution
This app provides an API to simulate currency exchange operations and find the best exchange rates across multiple banks for a given currency. It reads rate data from JSON files and returns the optimal buy/sell rates using sorting algorithms and clean architecture.

🧪 Technologies Used
Node.js + NestJS – Backend framework
GraphQL – API schema and query language
TypeScript – Strongly typed development
JSON – Used as temporary data storage

🧠 Architecture
GraphQL API (@nestjs/graphql)
Service Layer (RateService)
Temporary Storage: JSON file
DTO / Model structure for strict typing

🚀 Features
Add and update currency exchange rates by bank and date
Retrieve all rates or filter by bank and date
Find the best buy/sell exchange rate for a given currency
Sort banks based on profitability
Validation against invalid input (e.g. sell/buy must be positive)

🛠 How to Run
# 1. Clone the repository
git clone https://github.com/your-username/currency-exchange-simulator.git
cd currency-exchange-simulator

# 2. Install dependencies
npm install

# 3. Start the server
npm run start:dev

# 4. Open GraphQL Playground
http://localhost:3000/graphql
📁 Folder Structure

src/
├── bank/
│   ├── bank.module.ts
│   ├── bank.resolver.ts
│   ├── bank.service.ts
│   └── dto/
│       └── bank.model.ts
│
├── currency/
│   ├── currency.module.ts
│   ├── currency.resolver.ts
│   ├── currency.service.ts
│   └── dto/
│       └── currency.model.ts
│
├── rate/
│   ├── rate.module.ts
│   ├── rate.resolver.ts
│   ├── rate.service.ts
│   └── dto/
│       ├── best-rate-summary.model.ts
│       ├── best-rate-response.model.ts
│       ├── best-rate-item.model.ts
│       ├── create-rate.input.ts
│       └── rate.model.ts
│
├── data/
│   ├── banks.json
│   ├── currencies.json
│   └── rates.json
│
└── main.ts


🧪 Example GraphQL Queries
➕ Set Rates

mutation {
  setRates(input: {
    bank: "002",
    rate_date: "15.06.2025",
    rates: [
      { currency: "840", sell: 13500, buy: 13400 },
      { currency: "978", sell: 15000, buy: 14900 }
    ]
  })
}

🔍 Get Best Rates
query {
  getBestRateByCurrency(currency: "840") {
    currency
    result {
      bank
      rate_date
      currency
      sell
      buy
    }
  }
}

📚 What I Learned
Structuring a modular GraphQL API with NestJS
Applying Object-Oriented Programming through DTOs and services
Working with JSON as a simplified data storage layer
Implementing sorting/filtering algorithms to extract best rates
Clean separation of concerns between API, logic, and data

🔮 Future Improvements
Switch to PostgreSQL or MongoDB for persistent storage
Add a React + Apollo Client frontend interface
Support commission calculations and alternative bank suggestions
Add user authentication and action logging