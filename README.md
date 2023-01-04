# serverless-feedbacks-api

src
├── application
│   ├── use-cases
│   │   └── create-feedback-use-case
│   └── validation
│       └── create-feedback-validator
├── domain
│   ├── common
│   │   └── generic-type
│   ├── entities
│   │   └── feedback-entity
│   ├── exceptions
│   │   ├── bad-request-exception
│   │   └── infrastructure-exception
│   ├── http
│   │   ├── http-response-header
│   │   └── http-response
│   └── interfaces
│       ├── adapters
│       │   └── mail-adapter
│       ├── repositories
│       │   └── feedbacks-repository
│       └── user - Interfaces for user use cases
├── infrastructure
│   ├── adapters
│   │   └── nodemailer 
│   │       └── nodemailer-mail-adapter
│   └── repositories
│       └── dynamodb
│           └── dynamodb-feedbacks-repository
└── presentation
    ├── controllers
    │   ├── factories
    │   │   └── create-feedback-controller-factory
    │   └── create-feedback-controller
    ├── handlers
    │   └── create-feedback-handler
    └── helpers
        └── http-helper
