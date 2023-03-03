import express, { Request } from 'express';
import { getPackageInfo } from './packageInfo';
import { drawBadge } from './badge/drawBadge';

const app = express();

app.get('/api/*', async function (req, res) {
  const info = await getPackageInfo(packageNameFromReq(req));
  res.send(info);
});

app.get('/ico/*', async function (req, res) {
  const info = await getPackageInfo(packageNameFromReq(req));
  const badge = drawBadge(info);
  badge.pipe(res);
});

function packageNameFromReq(req: Request): string {
  let name = req.params['0'];

  if (name.endsWith('/')) {
    name = name.substring(0, name.length - 1);
  }

  return name;
}

app.listen(parseInt(process.env.PORT || '3000', 10));
