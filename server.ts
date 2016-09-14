import * as express from 'express';
import * as powerbi from 'powerbi-api';
import * as msrest from 'ms-rest';
import * as path from 'path';

const config = {
  port: process.env.port || 3000,
  accessKey: process.env["POWERBI_ACCESS_KEY"],
  workspaceCollection: process.env["POWERBI_WORKSPACE_COLLECTION"],
  workspaceId: process.env["POWERBI_WORKSPACE_ID"]
};

const app = express();
const credentials = new msrest.TokenCredentials(config.accessKey, "AppKey");
const powerbiClient = new powerbi.PowerBIClient(credentials);

app.get('/', (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/api/reports', (req: express.Request, res: express.Response) => {
  powerbiClient.reports.getReports(config.workspaceCollection, config.workspaceId, (error, response) => {
    if (error) {
      res.send(500, error.message);
      return;
    }

    const reports = response.value;

    res.send(reports);
  });
});

app.get('/api/reports/:id', (req: express.Request, res: express.Response) => {
  powerbiClient.reports.getReports(config.workspaceCollection, config.workspaceId, (error, response) => {
    if (error) {
      res.send(500, error.message);
      return;
    }

    const reportId = req.params.id;
    const reports = response.value;
    const filteredReports = reports.filter(report => report.id === reportId);

    if (filteredReports.length !== 1) {
      res.send(404, `Report with id: ${reportId} was not found`);
      return;
    }

    const report = filteredReports[0];
    const embedToken = powerbi.PowerBIToken.createReportEmbedToken(config.workspaceCollection, config.workspaceId, report.id);
    const accessToken = embedToken.generate(config.accessKey);
    const embedConfig = Object.assign({ type: 'report', accessToken }, report);

    res.send(embedConfig);
  });
});

app.listen(config.port, function () {
  console.log(`powerbi-node-server-express running on localhost:${config.port}`);
});