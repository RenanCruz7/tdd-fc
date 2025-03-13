import { Request, Response } from 'express';
import { PropertyService } from '../../application/services/property_service';

export class PropertyController {
    constructor(private readonly propertyService: PropertyService) {}

    async createProperty(req: Request, res: Response): Promise<void> {
        try {
            const { name, description, maxGuests, basePricePerNight } = req.body;
            const property = await this.propertyService.createProperty(name, description, maxGuests, basePricePerNight);
            res.status(201).json(property);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }
}