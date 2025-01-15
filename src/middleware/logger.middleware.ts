import { Request, Response, NextFunction } from 'express';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const now = new Date().toISOString();
    const originalSend = res.send;

    console.log(`[${now}] Request Path: ${req.method} ${req.originalUrl}`);
    console.log('Api Request Body:', req.body);

    res.send = function (body: any): Response {
        console.log(`[${now}] Response Status: ${res.statusCode}`);
        console.log(`[${now}] Response Path: ${req.method} ${req.originalUrl}`);
        console.log('Api Response Body:', body);
        return originalSend.call(this, body);
    };

    next();
};
