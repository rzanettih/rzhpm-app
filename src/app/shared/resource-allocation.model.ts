import { Resource } from './resource.model';

export class ResourceAllocation {
    id: string;
    resource: Resource;
    allocation: number;
    dateStart: string;
    dateEnd: string;
}
