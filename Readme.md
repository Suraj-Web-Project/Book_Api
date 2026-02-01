# Books API

> **Format:** Markdown (`README.md`)

A minimal, production-style **Books API** built with **Node.js**. This repository uses standard **Markdown syntax** (headings, lists, tables, code blocks) and is ready to be viewed on GitHub or rendered as a `.md` file.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Data Model](#data-model)
- [Project Structure](#project-structure)
- [Setup](#setup)
- [Database Seeding](#database-seeding)
- [API Endpoints](#api-endpoints)
- [Indexing and Performance](#indexing-and-performance)
- [API Documentation](#api-documentation)
- [Scripts](#scripts)
- [Evaluation Notes](#evaluation-notes)
- [License](#license)

---

## Overview

This API allows clients to:

- Create and persist books
- Explore books using **search**, **filters**, **pagination**, and **sorting**
- Work with **ISO-8601** dates consistently
- Query indexed fields for acceptable performance

The implementation prioritizes readability, correctness, and separation of concerns.

---

## Tech Stack

- **Runtime:** Node.js (>= 18)
- **Language:** JavaScript
- **Framework:** Express
- **Database:** MongoDB
- **ODM:** Mongoose

---

## Data Model

### Book

| Field         | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `id`          | string | yes      | Server-generated identifier |
| `name`        | string | yes      | Book title                  |
| `description` | string | yes      | ~2000 characters            |
| `author`      | string | yes      | Author name                 |
| `publishDate` | date   | no       | ISO-8601 date               |
| `createdAt`   | date   | yes      | Auto-generated              |
| `updatedAt`   | date   | yes      | Auto-generated              |

---

## Project Structure

```text
Api/
├── src/
│   ├── server.js
│   ├── lib/
│   │   └── db.js
│   ├── models/
│   │   └── book.model.js
│   ├── routes/
│   │   └── book.routes.js
│   ├── controllers/
│   │   └── book.controller.js
│   ├── validations/
│   │   └── book.validation.js
│   ├── utils/
│   │   └── AppError.js
│   └── seed.js
│
├── .env.example
├── package.json
└── README.md
```

---

## Setup

### 1. Clone Repository

```bash
git clone https://github.com/Suraj-Web-Project/Book_Api.git
cd Api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/BookApi

```

### 4. Run the Server

```bash
npm run dev
```

API available at:

```text
http://localhost:3000
```

---

## Database Seeding

Populate the database with sample data (≥ 15 books):

```bash
npm run seed
```

---

## API Endpoints

### Create Book

**POST** `/books`

```json
{
  "name": "Clean Code",
  "description": "A handbook of agile software craftsmanship",
  "author": "Robert C. Martin",
  "publishDate": "2008-08-01"
}
```

---

### Explore Books

**GET** `/books`

#### Query Parameters

| Name     | Default | Description                             |
| -------- | ------- | --------------------------------------- |
| `search` | —       | Text search on `name` and `description` |
| `author` | —       | Case-insensitive exact match            |
| `from`   | —       | Publish date (inclusive)                |
| `to`     | —       | Publish date (inclusive)                |
| `page`   | 1       | Page number                             |
| `limit`  | 10      | Max 50                                  |
| `sortBy` | name    | `name`, `author`, `publishDate`         |
| `order`  | asc     | `asc` or `desc`                         |

Example:

```text
/books?search=design&from=2000-01-01&sortBy=publishDate&order=desc&limit=10
```

##  Get Book by ID

**GET**  `/books/:id`

Example: /books/<book-id>



## ⚡ Quick Test URLs

After running `npm run seed`, you can click these links to verify the API immediately:

Note: Replace `<book-id>` with an ID returned from `GET /books`.


| Feature | Method | Endpoint URL |
| :--- | :--- | :--- |
| **Get All Books** | `GET` | `http://localhost:3000/books` |
| **Get One Book** | `GET` | `http://localhost:3000/books/<book-id>` |
| **Search** | `GET` | `http://localhost:3000/books?search=wizard` |
| **Filter by Author** | `GET` | `http://localhost:3000/books?author=George%20Orwell` |
| **Filter by Date** | `GET` | `http://localhost:3000/books?from=1990-01-01&to=1999-12-31` |
| **Pagination** | `GET` | `http://localhost:3000/books?page=2&limit=5` |
| **Complex Query** | `GET` | `http://localhost:3000/books?search=design&sortBy=publishDate&order=desc` |

---

## Indexing and Performance

- Index on `author`
- Index on `publishDate`
- Index on `name`
- Text index on `name` and `description`

Filtering → sorting → pagination order is strictly enforced.

---

## API Documentation

Full API specification is available in the OpenAPI (Swagger) file included in this repository.
File: openapi.yaml

- Importable into **Postman**

---

## Scripts

```bash
npm run dev     # Development server
npm start       # Production server
npm run seed    # Seed database
```

---

## Evaluation Notes

- ISO-8601 dates everywhere
- All filters work independently and together
- Clean route → controller → service separation

---

## License

MIT
