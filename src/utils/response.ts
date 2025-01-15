import { Response } from 'express';

class ResponseHelper {
    static handleSuccess(res: Response, message: string, data?: any): void {
        res.status(200).json({ message, data });
    }

    static handleCreationSuccess(res: Response, message: string, data: any): void {
        res.status(201).json({ message, data });
    }

    static handleError(res: Response, message: string): void {
        res.status(500).json({ message });
    }

    static handleNotFound(res: Response, message: string): void {
        res.status(404).json({ message });
    }

    static handleBadRequest(res: Response, message: string): void {
        res.status(400).json({ message });
    }
}

export default ResponseHelper;
