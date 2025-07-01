# FastAPI 

### **Core Concepts**
- **Asynchronous Support**: Built on Starlette and Pydantic, FastAPI leverages Python's async/await for high performance, comparable to Node.js and Go.
- **Type Hints**: Uses Python type annotations for automatic request validation, serialization, and OpenAPI documentation.
- **Automatic Docs**: Generates interactive API docs (Swagger UI at `/docs`, ReDoc at `/redoc`).
- **Dependency Injection**: Built-in system for managing dependencies, reusable across routes.
- **Pydantic Models**: For data validation, serialization, and schema generation.

### **Setup**
1. **Installation**:
   ```bash
   pip install fastapi uvicorn
   ```
   - `fastapi`: Core framework.
   - `uvicorn`: ASGI server to run the app.

2. **Basic Example**:
   ```python
   from fastapi import FastAPI

   app = FastAPI()

   @app.get("/")
   async def root():
       return {"message": "Hello, FastAPI!"}
   ```
   Run with:
   ```bash
   uvicorn main:app --reload
   ```
   - `main`: Python file name (e.g., `main.py`).
   - `--reload`: Auto-reload for development.

3. **Project Structure** (Scalable):
   ```
   project/
   ├── main.py           # Entry point
   ├── models/          # Pydantic models
   ├── routers/         # Route definitions
   ├── schemas/         # Data validation schemas
   ├── crud/            # Database operations
   ├── database.py      # DB connection setup
   └── dependencies.py  # Dependency injection logic
   ```

### **Key Features**
1. **Path Operations**:
   - Decorators: `@app.get()`, `@app.post()`, `@app.put()`, `@app.delete()`, etc.
   - Path parameters: `@app.get("/items/{item_id}")` (e.g., `/items/123`).
   - Query parameters: `def read_item(item_id: int, q: str = None)` (e.g., `/items/123?q=hello`).

2. **Pydantic Models** (for request/response validation):
   ```python
   from pydantic import BaseModel

   class Item(BaseModel):
       name: str
       price: float
       is_offer: bool = None
   ```
   - Use in endpoints:
     ```python
     @app.post("/items/")
     async def create_item(item: Item):
         return item
     ```

3. **Dependencies**:
   - Define reusable functions for authentication, DB sessions, etc.
   ```python
   from fastapi import Depends

   async def get_db():
       # Simulate DB connection
       yield {"db": "connected"}

   @app.get("/items/", dependencies=[Depends(get_db)])
   async def read_items():
       return {"items": []}
   ```

4. **Middleware**:
   - Add custom logic (e.g., logging, CORS).
   ```python
   from fastapi.middleware.cors import CORSMiddleware

   app.add_middleware(
       CORSMiddleware,
       allow_origins=["*"],
       allow_methods=["*"],
       allow_headers=["*"],
   )
   ```

5. **Error Handling**:
   - Use HTTPException for custom errors.
   ```python
   from fastapi import HTTPException

   @app.get("/items/{item_id}")
   async def read_item(item_id: int):
       if item_id not in items:
           raise HTTPException(status_code=404, detail="Item not found")
       return {"item_id": item_id}
   ```

6. **Background Tasks**:
   - Run non-blocking tasks after responding.
   ```python
   from fastapi import BackgroundTasks

   def send_email(email: str):
       # Simulate email sending
       print(f"Sending email to {email}")

   @app.post("/send-email/")
   async def send_notification(email: str, background_tasks: BackgroundTasks):
       background_tasks.add_task(send_email, email)
       return {"message": "Email scheduled"}
   ```

7. **Database Integration** (e.g., SQLAlchemy with PostgreSQL):
   - Install: `pip install sqlalchemy databases asyncpg`
   - Setup:
     ```python
     from sqlalchemy.orm import Session
     from databases import Database

     database = Database("postgresql://user:password@localhost/dbname")

     @app.on_event("startup")
     async def startup():
         await database.connect()

     @app.on_event("shutdown")
     async def shutdown():
         await database.disconnect()
     ```

8. **Authentication**:
   - Use OAuth2, JWT, or API keys.
   - Example with OAuth2:
     ```python
     from fastapi.security import OAuth2PasswordBearer

     oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

     @app.get("/users/me")
     async def read_users_me(token: str = Depends(oauth2_scheme)):
         return {"token": token}
     ```

9. **Testing**:
   - Use `TestClient` from `fastapi.testclient`.
   ```python
   from fastapi.testclient import TestClient

   client = TestClient(app)

   def test_read_main():
       response = client.get("/")
       assert response.status_code == 200
       assert response.json() == {"message": "Hello, FastAPI!"}
   ```

### **Best Practices**
- **Modularize**: Split routes, models, and logic into separate files for scalability.
- **Environment Variables**: Use `python-dotenv` for config (e.g., DB credentials).
   ```bash
   pip install python-dotenv
   ```
   ```python
   from dotenv import load_dotenv
   import os

   load_dotenv()
   DB_URL = os.getenv("DATABASE_URL")
   ```



## Integrating **PostgreSQL** with a **FastAPI** backend is a common setup for building scalable, database-driven APIs. Below are concise notes on setting up and using PostgreSQL with FastAPI, focusing on best practices and practical implementation.

### **Setup**
1. **Install Dependencies**:
   ```bash
   pip install fastapi uvicorn databases[postgresql] sqlalchemy asyncpg psycopg2-binary
   ```
   - `databases`: For async PostgreSQL queries.
   - `sqlalchemy`: For ORM and database schema management.
   - `asyncpg`: Async driver for PostgreSQL.
   - `psycopg2-binary`: For synchronous operations (if needed).

2. **PostgreSQL Setup**:
   - Install PostgreSQL locally or use a cloud provider (e.g., AWS RDS, Heroku Postgres).
   - Create a database:
     ```sql
     CREATE DATABASE myapp;
     ```
   - Note the connection details: `host`, `port`, `user`, `password`, `database`.

3. **Environment Variables**:
   - Use `python-dotenv` to manage sensitive data.
     ```bash
     pip install python-dotenv
     ```
     Create a `.env` file:
     ```
     DATABASE_URL=postgresql://user:password@localhost:5432/myapp
     ```

### **Database Configuration**
1. **Database Connection** (`database.py`):
   ```python
   from databases import Database
   from sqlalchemy import create_engine, MetaData
   from dotenv import load_dotenv
   import os

   load_dotenv()
   DATABASE_URL = os.getenv("DATABASE_URL")

   # Async connection for queries
   database = Database(DATABASE_URL)

   # SQLAlchemy for schema management
   metadata = MetaData()
   engine = create_engine(DATABASE_URL)
   ```

2. **Define Models** (e.g., `models.py`):
   - Use SQLAlchemy for table definitions.
   ```python
   from sqlalchemy import Table, Column, Integer, String, Float, MetaData

   metadata = MetaData()

   items = Table(
       "items",
       metadata,
       Column("id", Integer, primary_key=True),
       Column("name", String, nullable=False),
       Column("price", Float, nullable=False),
   )
   ```

3. **Pydantic Schemas** (e.g., `schemas.py`):
   - For request/response validation.
   ```python
   from pydantic import BaseModel

   class ItemBase(BaseModel):
       name: str
       price: float

   class ItemCreate(ItemBase):
       pass

   class Item(ItemBase):
       id: int

       class Config:
           orm_mode = True
   ```

### **CRUD Operations**
1. **Create Tables**:
   - Run this once to create tables (e.g., in `main.py` or a migration script).
   ```python
   metadata.create_all(engine)
   ```

2. **CRUD Functions** (e.g., `crud.py`):
   ```python
   from sqlalchemy.sql import select, insert, update, delete
   from .database import database, items

   async def get_item(item_id: int):
       query = select([items]).where(items.c.id == item_id)
       return await database.fetch_one(query)

   async def create_item(item: dict):
       query = insert(items).values(**item)
       last_id = await database.execute(query)
       return {**item, "id": last_id}

   async def update_item(item_id: int, item: dict):
       query = update(items).where(items.c.id == item_id).values(**item)
       await database.execute(query)
       return await get_item(item_id)

   async def delete_item(item_id: int):
       query = delete(items).where(items.c.id == item_id)
       await database.execute(query)
       return {"message": "Item deleted"}
   ```

### **FastAPI Integration**
1. **Main Application** (`main.py`):
   ```python
   from fastapi import FastAPI, HTTPException
   from .database import database
   from .crud import get_item, create_item, update_item, delete_item
   from .schemas import ItemCreate, Item

   app = FastAPI()

   @app.on_event("startup")
   async def startup():
       await database.connect()

   @app.on_event("shutdown")
   async def shutdown():
       await database.disconnect()

   @app.get("/items/{item_id}", response_model=Item)
   async def read_item(item_id: int):
       item = await get_item(item_id)
       if item is None:
           raise HTTPException(status_code=404, detail="Item not found")
       return item

   @app.post("/items/", response_model=Item)
   async def create_item_endpoint(item: ItemCreate):
       return await create_item(item.dict())

   @app.put("/items/{item_id}", response_model=Item)
   async def update_item_endpoint(item_id: int, item: ItemCreate):
       updated_item = await update_item(item_id, item.dict())
       if updated_item is None:
           raise HTTPException(status_code=404, detail="Item not found")
       return updated_item

   @app.delete("/items/{item_id}")
   async def delete_item_endpoint(item_id: int):
       result = await delete_item(item_id)
       if not result:
           raise HTTPException(status_code=404, detail="Item not found")
       return result
   ```

### **Best Practices**
- **Use Migrations**: Use `Alembic` for database schema migrations.
  ```bash
  pip install alembic
  alembic init migrations
  ```
  Configure `alembic.ini` and `env.py` to use your `DATABASE_URL`.

- **Connection Pooling**: `asyncpg` handles connection pooling automatically. Tune `min_size` and `max_size` in `Database` if needed:
  ```python
  database = Database(DATABASE_URL, min_size=5, max_size=20)
  ```

- **Transactions**: Use `database.transaction()` for atomic operations.
  ```python
  async def create_item_with_transaction(item: dict):
      async with database.transaction():
          query = insert(items).values(**item)
          last_id = await database.execute(query)
          return {**item, "id": last_id}
  ```

- **Error Handling**: Handle database-specific errors (e.g., `asyncpg.exceptions.UniqueViolationError`).
  ```python
  from asyncpg.exceptions import UniqueViolationError

  @app.post("/items/")
  async def create_item_endpoint(item: ItemCreate):
      try:
          return await create_item(item.dict())
      except UniqueViolationError:
          raise HTTPException(status_code=400, detail="Item already exists")
  ```

- **Indexes**: Add indexes to frequently queried columns (e.g., `name`).
  ```sql
  CREATE INDEX idx_items_name ON items(name);
  ```

### **Testing**
- Use `pytest` and `pytest-asyncio` for async tests.
  ```bash
  pip install pytest pytest-asyncio
  ```
  Example test (`test_main.py`):
  ```python
  from fastapi.testclient import TestClient
  from .main import app

  client = TestClient(app)

  def test_create_item():
      response = client.post("/items/", json={"name": "Test Item", "price": 10.0})
      assert response.status_code == 200
      assert response.json()["name"] == "Test Item"
  ```
















- **Validation**: Leverage Pydantic for strict input validation.
- **Logging**: Use Python’s `logging` module or middleware for request logging.
- **Rate Limiting**: Implement with `slowapi` or custom middleware.
- **Deployment**:
   - Use Uvicorn with Gunicorn: `gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app`.
   - Deploy on platforms like AWS, Heroku, or Docker.

### **Performance Tips**
- Use async/await for I/O-bound tasks (e.g., DB queries, external APIs).
- Enable response compression (e.g., Gzip middleware).
- Cache responses with `fastapi-cache` for frequently accessed endpoints.

### **Common Issues**
- **CORS Errors**: Ensure CORS middleware is configured for cross-origin requests.
- **Type Errors**: Verify Pydantic model types match endpoint expectations.
- **Async Misuse**: Use `async def` only for I/O-bound operations, `def` for CPU-bound.

### **Resources**
- **Official Docs**: https://fastapi.tiangolo.com/
- **Tutorial**: https://fastapi.tiangolo.com/tutorial/
- **GitHub**: https://github.com/tiangolo/fastapi
- **Community**: Check X for real-time discussions or updates on FastAPI.

