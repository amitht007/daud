# Database Structure

## Collections

- users
  - _id
  - email
  - name
  - createdAt

- posts
  - _id
  - userId
  - content
  - createdAt

## Indexes

- users: email (unique)
- posts: userId
