# **PostgreSQL Development Setup**
1. **Local Installation**:
   - Install PostgreSQL: Download from https://www.postgresql.org/download/ or use a package manager:
     ```bash
     # Ubuntu
     sudo apt update
     sudo apt install postgresql postgresql-contrib

     # macOS
     brew install postgresql
     ```
   - Start PostgreSQL service:
     ```bash
     # Ubuntu
     sudo service postgresql start

     # macOS
     brew services start postgresql
     ```
   - Access PostgreSQL CLI:
     ```bash
     psql -U postgres
     ```
   - Create a development database:
     ```sql
     CREATE DATABASE myapp_dev;
     CREATE USER devuser WITH PASSWORD 'devpassword';
     GRANT ALL PRIVILEGES ON DATABASE myapp_dev TO devuser;
     ```

2. **Environment Configuration**:
   - Use `.env` for development-specific settings:
     ```
     DATABASE_URL=postgresql://devuser:devpassword@localhost:5432/myapp_dev
     ```
   - Load in FastAPI (`database.py`):
     ```python
     from dotenv import load_dotenv
     import os
     from databases import Database

     load_dotenv()
     DATABASE_URL = os.getenv("DATABASE_URL")
     database = Database(DATABASE_URL)
     ```

3. **Docker for Development**:
   - Use Docker to run PostgreSQL locally for consistency:
     ```bash
     docker run -d --name postgres-dev \
       -e POSTGRES_USER=devuser \
       -e POSTGRES_PASSWORD=devpassword \
       -e POSTGRES_DB=myapp_dev \
       -p 5432:5432 \
       postgres:latest
     ```
   - Update `DATABASE_URL`:
     ```
     DATABASE_URL=postgresql://devuser:devpassword@localhost:5432/myapp_dev
     ```

### **Development Workflow**
1. **Database Schema Management**:
   - Use **Alembic** for migrations:
     ```bash
     pip install alembic
     alembic init migrations
     ```
     - Configure `alembic.ini`:
       ```
       sqlalchemy.url = postgresql://devuser:devpassword@localhost:5432/myapp_dev
       ```
     - Update `migrations/env.py` to use your SQLAlchemy `metadata`:
       ```python
       from myapp.models import metadata
       target_metadata = metadata
       ```
     - Create a migration:
       ```bash
       alembic revision --autogenerate -m "create items table"
       ```
     - Apply migrations:
       ```bash
       alembic upgrade head
       ```

2. **Seed Data**:
   - Create a script to populate the database for testing:
     ```python
     from databases import Database
     from sqlalchemy.sql import insert
     from myapp.models import items

     async def seed_data():
         database = Database("postgresql://devuser:devpassword@localhost:5432/myapp_dev")
         await database.connect()
         await database.execute(insert(items).values([
             {"name": "Item 1", "price": 10.0},
             {"name": "Item 2", "price": 20.0},
         ]))
         await database.disconnect()

     if __name__ == "__main__":
         import asyncio
         asyncio.run(seed_data())
     ```

3. **Interactive Development**:
   - Use `psql` for quick queries:
     ```bash
     psql -U devuser -d myapp_dev
     ```
     Example commands:
     ```sql
     \dt              -- List tables
     SELECT * FROM items;  -- Query data
     ```
   - Use tools like **pgAdmin** or **DBeaver** for a GUI to explore the database.

4. **Testing Database**:
   - Create a separate test database: `myapp_test`.
   - Use `pytest` with a temporary database:
     ```python
     import pytest
     from databases import Database
     from fastapi.testclient import TestClient
     from myapp.main import app
     from myapp.models import metadata

     @pytest.fixture
     async def test_db():
         test_db = Database("postgresql://devuser:devpassword@localhost:5432/myapp_test")
         await test_db.connect()
         metadata.create_all(test_db.engine)
         yield test_db
         metadata.drop_all(test_db.engine)
         await test_db.disconnect()

     @pytest.mark.asyncio
     async def test_create_item(test_db):
         client = TestClient(app)
         response = client.post("/items/", json={"name": "Test Item", "price": 15.0})
         assert response.status_code == 200
         assert response.json()["name"] == "Test Item"
     ```
   - Run tests:
     ```bash
     pytest --asyncio
     ```

### **Development Best Practices**
1. **Version Control for Migrations**:
   - Commit `migrations/versions/` to your repository.
   - Avoid manual schema changes; always use Alembic.

2. **Connection Management**:
   - Use a connection pool for development:
     ```python
     database = Database(DATABASE_URL, min_size=2, max_size=10)
     ```
   - Ensure `startup` and `shutdown` events in FastAPI:
     ```python
     @app.on_event("startup")
     async def startup():
         await database.connect()

     @app.on_event("shutdown")
     async def shutdown():
         await database.disconnect()
     ```

3. **Debugging Queries**:
   - Enable SQLAlchemy query logging:
     ```python
     import logging
     logging.basicConfig()
     logging.getLogger("sqlalchemy.engine").setLevel(logging.INFO)
     ```
   - Use `EXPLAIN ANALYZE` for slow queries:
     ```sql
     EXPLAIN ANALYZE SELECT * FROM items WHERE price > 10;
     ```

4. **Data Validation**:
   - Combine Pydantic for API input validation with PostgreSQL constraints:
     ```sql
     ALTER TABLE items ADD CONSTRAINT unique_name UNIQUE (name);
     ```

5. **Mocking External Services**:
   - For development, mock external APIs or use a local PostgreSQL instance to avoid hitting production.

### **Common Development Issues**
- **Schema Out of Sync**: Run `alembic upgrade head` to ensure the database matches the models.
- **Connection Refused**: Verify PostgreSQL is running and `DATABASE_URL` is correct.
- **Test Data Persistence**: Ensure test databases are dropped and recreated between test runs.
- **Slow Queries**: Add indexes for frequently queried columns:
  ```sql
  CREATE INDEX idx_items_price ON items(price);
  ```

### **Development Tools**
- **pgAdmin**: Browser-based GUI for managing PostgreSQL.
- **DBeaver**: Cross-platform database tool for queries and schema visualization.
- **Postico**: macOS-specific PostgreSQL client.
- **SQLAlchemy-Utils**: For additional utilities like database creation/dropping:
  ```bash
  pip install sqlalchemy-utils
  ```

### **Performance Tips for Development**
- **Small Datasets**: Use minimal seed data to speed up tests.
- **Indexes**: Add indexes early for fields used in `WHERE`, `JOIN`, or `ORDER BY`.
- **Query Profiling**: Use `pg_stat_statements` to identify slow queries:
  ```sql
  CREATE EXTENSION pg_stat_statements;
  SELECT query, total_time, calls FROM pg_stat_statements ORDER BY total_time DESC;
  ```

### **Resources**
- **PostgreSQL Docs**: https://www.postgresql.org/docs/
- **Alembic Docs**: https://alembic.sqlalchemy.org/
- **FastAPI SQL Tutorial**: https://fastapi.tiangolo.com/tutorial/sql-databases/
- **Asyncpg**: https://magicstack.github.io/asyncpg/
- **X Discussions**: Search X for `#PostgreSQL` or `#FastAPI` for community tips.

