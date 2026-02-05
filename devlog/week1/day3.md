# Devlog — Day3
- Creating schemas was difficult than i expected. earlier i used to give a brief data on ai models and that used to generate me from tables,relationships, indexes and much more
- But the core idea of creating schemas was still blurry. So i focused on thinking in systems rather than just fixing it fast
- I formed a creation and iterative approach to refine what my error was in respect to thinking and building schemas
- I came to find out that i am really poor at building simple schemas and its relations, always forgot to add or skip details which are often important,but considered very trivial by me
- when creating tables, i came across the term **JOIN TABLES**.I found out that when these points are true, we need a join table:
- 1) relationship is many-to-many(cardinality)
- 2) relationship can change independently
- 3) relationship has roles or metadata
- 4) relationship must be auditable
- 5) relationship should survive deletions
- 6) relationship answers “who was involved?”

- The initial building of columns for tables were difficult at first, but i got to pace up better after some trial and errors. Then came the needs for creating relations, enum values,indexes and uniques
- I understood and documented in schema codes on what indexes and uniques were, and why they were used
- i seperated schemas in each files for easier handling