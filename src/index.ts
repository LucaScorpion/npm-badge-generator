import express from 'express';
import { getPackageInfo } from './packageInfo';
import { drawBadge } from './badge/drawBadge';
import { packageNameMiddleware } from './packageNameMiddleware';
import { parseInstallMode } from './installMode';

const app = express();
app.use(express.static('_site'));

app.get('/npm/*', packageNameMiddleware, async function (req, res, next) {
  getPackageInfo(req.packageName)
    .then((pkg) => {
      const { mode } = req.query;
      res.type('image/png');
      res.set('Cache-Control', 'no-cache, no-store');
      drawBadge(pkg, parseInstallMode(mode)).pipe(res);
    })
    .catch(next);
});

app.listen(parseInt(process.env.PORT || '3000', 10));
