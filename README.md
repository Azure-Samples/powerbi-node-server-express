# powerbi-node-server-express
Sample express server to demonstrate building REST API for embedding reports.

# Live Demo
[https://powerbiembedapinode.azurewebsites.net/](https://powerbiembedapinode.azurewebsites.net/)

# Getting Started

- Clone the repository:
  ```
  git clone https://github.com/Azure-Samples/powerbi-node-server-express.git
  ```

- Set environment variables:

  (If you are using VS Code you can set them in `launch.json` to use F5 for debugging)

  ```
  set POWERBI_ACCESS_KEY=[The access key for the workspace collection]
  set POWERBI_WORKSPACE_COLLECTION=[The name of the workspace collection]
  set POWERBI_WORKSPACE_ID=[The GUID of workspace]
  ```

- Run the server:
  
  (VS Code: Press F5)

  ```
  npm start
  ```

