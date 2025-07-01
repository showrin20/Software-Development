FastAPI is a modern, high-performance web framework for building APIs with Python 3.6+ based on standard Python type hints. Below are concise notes covering key aspects of creating a FastAPI backend, based on best practices and common use cases:

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

