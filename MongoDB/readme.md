### **MongoDB Development Notes with FastAPI**

MongoDB is a NoSQL, document-oriented database that stores data in flexible, JSON-like BSON documents, making it ideal for applications with dynamic or semi-structured data. Unlike PostgreSQL’s rigid relational structure, MongoDB is schema-less, which simplifies development for evolving data models but requires careful design to maintain data integrity.



### **Development Setup**
1. **Install MongoDB**:
   - **Local Installation**:
     - Download MongoDB Community Edition: https://www.mongodb.com/try/download/community
     - Install on your OS:
       ```bash
       # Ubuntu
       sudo apt update
       sudo apt install mongodb
       # Start MongoDB
       sudo systemctl start mongod
       ```
       ```bash
       # macOS
       brew tap mongodb/brew
       brew install mongodb-community
       brew services start mongodb-community
       ```
     - Verify MongoDB is running:
       ```bash
       mongosh
       > show databases
       ```
   - **MongoDB Atlas** (Cloud):
     - Create a free M0 cluster at https://www.mongodb.com/cloud/atlas.
     - Get the connection string (e.g., `mongodb+srv://user:password@cluster0.mongodb.net/myapp_dev`).

2. **Install Python Dependencies**:
   ```bash
   pip install fastapi uvicorn motor pydantic python-dotenv
   ```
   - `motor`: Async MongoDB driver for FastAPI.
   - `pydantic`: For data validation and serialization.
   - `python-dotenv`: For environment variables.

3. **Environment Variables**:
   - Create a `.env` file for development:
     ```
     MONGO_URI=mongodb://localhost:27017/myapp_dev  # Local
     # OR for Atlas
     MONGO_URI=mongodb+srv://user:password@cluster0.mongodb.net/myapp_dev?retryWrites=true&w=majority
     ```

4. **Docker for Development**:
   - Run MongoDB in a container:
     ```bash
     docker run -d --name mongodb-dev \
       -e MONGO_INITDB_ROOT_USERNAME=devuser \
       -e MONGO_INITDB_ROOT_PASSWORD=devpassword \
       -p 27017:27017 \
       mongo:latest
     ```
   - Update `.env`:
     ```
     MONGO_URI=mongodb://devuser:devpassword@localhost:27017/myapp_dev
     ```

---

### **Database Configuration**
1. **MongoDB Connection** (`database.py`):
   ```python
   from motor.motor_asyncio import AsyncIOMotorClient
   from dotenv import load_dotenv
   import os

   load_dotenv()
   MONGO_URI = os.getenv("MONGO_URI")
   client = AsyncIOMotorClient(MONGO_URI)
   db = client.get_database("myapp_dev")
   ```

2. **Pydantic Models** (`schemas.py`):
   - Define data structures with Pydantic, handling MongoDB’s `_id` field:
     ```python
     from pydantic import BaseModel, Field
     from typing import Optional
     from bson import ObjectId

     class PyObjectId(ObjectId):
         @classmethod
         def __get_validators__(cls):
             yield cls.validate

         @classmethod
         def validate(cls, v):
             if not ObjectId.is_valid(v):
                 raise ValueError("Invalid ObjectId")
             return ObjectId(v)

     class ItemBase(BaseModel):
         name: str
         price: float

     class ItemCreate(ItemBase):
         pass

     class Item(ItemBase):
         id: Optional[PyObjectId] = Field(default=None, alias="_id")

         class Config:
             allow_population_by_field_name = True
             arbitrary_types_allowed = True
             json_encoders = {ObjectId: str}
     ```
   - Note `_id` alias to handle MongoDB’s default primary key, unlike PostgreSQL’s integer-based `id`.

3. **Project Structure**:
   ```
   project/
   ├── main.py           # FastAPI app entry point
   ├── database.py      # MongoDB connection setup
   ├── schemas.py       # Pydantic models
   ├── crud.py          # CRUD operations
   ├── routers/         # Route definitions
   └── sexample.txt      # Example seed data
   └── .env            # Environment variables
   ```

---

### **Development Workflow**
1. **CRUD Operations** (`crud.py`):
   ```python
   from bson import ObjectId
   from .database import db
   from .schemas import ItemCreate, Item

   async def create_item(item: ItemCreate):
       result = await db.items.insert_one(item.dict(by_alias=True))
       return await get_item(str(result.inserted_id))

   async def get_item(item_id: str):
       item = await db.items.find_one({"_id": ObjectMongoDB uses `_id` as its default primary key, which is an `ObjectId` (a 12-byte unique identifier). Unlike PostgreSQL, where you define tables and schemas explicitly, MongoDB collections are created dynamically when you insert data. This reduces setup overhead but requires careful application-level validation.

---

### **Key Differences from PostgreSQL**
- **Schema**: MongoDB is schema-less, so no need for migrations like Alembic (used with PostgreSQL). However, you may use ODMs like **Beanie** or **ODMantic** for schema validation:
  ```bash
  pip install beanie
  ```
  Example Beanie model:
  ```python
  from beanie import Document

  class Item(Document):
      name: str
      price: float

      class Settings:
          name = "items"
  ```
- **Queries**: MongoDB uses JSON-like queries (e.g., `{"name": "item"}`) vs. SQL. Use `motor` for async queries:
  ```python
  async def get_all_items():
      return await db.items.find().to_list(length=1000)
  ```
- **Scalability**: MongoDB excels with horizontal scaling (sharding) and unstructured data, while PostgreSQL is better for complex relational queries and strong consistency.
- **Consistency**: PostgreSQL offers strong consistency; MongoDB is eventually consistent by default, which may impact development if immediate data availability is critical.

---

### **Development Best Practices**
1. **Connection Lifecycle**:
   - Manage MongoDB connections with FastAPI’s lifespan:
     ```python
     from fastapi import FastAPI
     from contextlib import asynccontextmanager

     @asynccontextmanager
     async def lifespan(app: FastAPI):
         app.mongodb_client = AsyncIOMotorClient(MONGO_URI)
         app.db = app.mongodb_client.get_database("myapp_dev")
         yield
         app.mongodb_client.close()

     app = FastAPI(lifespan=lifespan)
     ```

2. **Data Validation**:
   - Use Pydantic for input validation, as MongoDB lacks schema enforcement:
     ```python
     @app.post("/items/", response_model=Item)
     async def create_item(item: ItemCreate):
         return await create_item(item)
     ```

3. **Indexes**:
   - Add indexes for frequently queried fields to improve performance:
     ```python
     await db.items.create_index([("name", 1)])
     ```

4. **Testing**:
   - Use a separate MongoDB database for tests:
     ```python
     import pytest
     from motor.motor_asyncio import AsyncIOMotorClient
     from fastapi.testclient import TestClient

     @pytest.fixture
     async def test_db():
         client = AsyncIOMotorClient("mongodb://localhost:27017/myapp_test")
         db = client.myapp_test
         yield db
         await client.drop_database("myapp_test")
         client.close()

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

5. **Seed Data**:
   - Create a script to populate test data:
     ```python
     from motor.motor_asyncio import AsyncIOMotorClient

     async def seed_data():
         client = AsyncIOMotorClient("mongodb://localhost:27017/myapp_dev")
         db = client.myapp_dev
         await db.items.insert_many([
             {"name": "Item 1", "price": 10.0},
             {"name": "Item 2", "price": 20.0},
         ])
         client.close()

     if __name__ == "__main__":
         import asyncio
         asyncio.run(seed_data())
     ```

6. **Debugging**:
   - Use **MongoDB Compass** or **mongosh** for querying:
     ```bash
     mongosh mongodb://localhost:27017/myapp_dev
     > db.items.find().pretty()
     ```
   - Enable Motor query logging:
     ```python
     import logging
     logging.basicConfig()
     logging.getLogger("motor").setLevel(logging.DEBUG)
     ```

---


### **Resources**
- **MongoDB Docs**: https://www.mongodb.com/docs/
- **Motor Docs**: https://motor.readthedocs.io/
- **Beanie ODM**: https://beanie-odm.dev/[](https://www.mongodb.com/developer/technologies/fastapi/)
- **FastAPI MongoDB Guide**: https://www.mongodb.com/developer/languages/python/python-quickstart-fastapi/[](https://www.mongodb.com/developer/languages/python/python-quickstart-fastapi/)
- **FARM Stack**: https://www.mongodb.com/developer/products/mongodb/farm-stack-fastapi-react-mongodb/[](https://www.mongodb.com/developer/languages/python/farm-stack-fastapi-react-mongodb/)
- **GitHub Example**: https://github.com/mongodb-developer/mongodb-with-fastapi[](https://github.com/mongodb-developer/mongodb-with-fastapi)

