import express from 'express';
import { getPackageInfo } from './packageInfo';
import { drawBadge } from './badge/drawBadge';
import { packageNameMiddleware } from './packageNameMiddleware';

const app = express();
app.use(express.static('_site'));

app.get('/npm/*', packageNameMiddleware, async function (req, res, next) {
  getPackageInfo(req.packageName)
    .then((pkg) => {
      res.type('image/png');
      drawBadge(pkg).pipe(res);
    })
    .catch(next);
});

app.listen(parseInt(process.env.PORT || '3000', 10));
