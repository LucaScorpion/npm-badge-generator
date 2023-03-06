import express, { NextFunction, Request, Response } from 'express';
import { getPackageInfo } from './packageInfo';
import { drawBadge } from './badge/drawBadge';
import { packageNameMiddleware } from './packageNameMiddleware';
import { sendCanvasResponse } from './sendCanvasResponse';

const app = express();

app.get(
  '/npm/*',
  packageNameMiddleware,
  function (req: Request, res: Response, next: NextFunction) {
    getPackageInfo(req.packageName)
      .then((pkg) => {
        // TODO: Get image type from request.
        const imageType = 'png';
        sendCanvasResponse(res, drawBadge(pkg, imageType), imageType);
      })
      .catch(next);
  }
);

const port = parseInt(process.env.PORT || '3000', 10);
app.listen(port);
console.info(`Server listening on port ${port}`);
