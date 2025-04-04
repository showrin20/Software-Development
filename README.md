# Step 1: Create project folder and initialize frontend & backend
```mkdir project-app && cd project-app
npx create-react-app client
mkdir server && cd server
npm init -y
```
# Step 2: Install backend dependencies
```npm install express mongoose cors dotenv```

# Step 3: Create server files & folders
```
mkdir models routes
touch index.js .env models/Project.js routes/projectRoutes.js
```

# Step 4: Populate files with initial content

# Populate index.js
```
echo 'require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const projectRoutes = require("./routes/projectRoutes");
app.use("/api/projects", projectRoutes);

app.get("/", (req, res) => res.send("Team Bertho API Running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));' > index.js
```
# Populate models/Project.js
``` echo 'const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
});

module.exports = mongoose.model("Project", ProjectSchema);' > models/Project.js
```
# Populate routes/projectRoutes.js
``` echo 'const express = require("express");
const Project = require("../models/Project");
const router = express.Router();

router.get("/", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

router.post("/", async (req, res) => {
  const newProject = new Project(req.body);
  await newProject.save();
  res.json(newProject);
});

module.exports = router;' > routes/projectRoutes.js
```
# Populate .env
```
echo 'MONGO_URI=your_mongodb_connection_string' > .env
```
# Step 5: Switch to frontend and install dependencies
```
cd ../client
npm install axios react-router-dom
```
# Step 6: Create frontend components
```
mkdir src/components
touch src/components/ProjectList.js src/App.js
```
# Populate src/components/ProjectList.js
```
echo 'import React, { useEffect, useState } from "react";
import axios from "axios";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/projects")
      .then(res => setProjects(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>Our Projects</h2>
      <ul>
        {projects.map(project => (
          <li key={project._id}>
            <h3>{project.title}</h3>
            <img src={project.image} alt={project.title} width="200" />
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;' > src/components/ProjectList.js
```
# Populate src/App.js
```
echo 'import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProjectList from "./components/ProjectList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProjectList />} />
      </Routes>
    </Router>
  );
}

export default App;' > src/App.js
```



