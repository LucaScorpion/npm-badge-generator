import express from 'express';
import { getPackageInfo } from './packageInfo';

const app = express();

app.get('*', async function (req, res) {
  // Get the package name from the path.
  let packageName = req.path.substring(1);
  if (packageName.endsWith('/')) {
    packageName = packageName.substring(0, packageName.length - 1);
  }

  const info = await getPackageInfo(packageName);
  res.send(info);
});

app.listen(parseInt(process.env.PORT || '3000', 10));
