
export interface IGetPetsDTO {
    name?: string;
    species?: string;
    customerId?: string;
    color?: string;
}

export class GetPetsDTO implements IGetPetsDTO {
    name?: string;
    species?: string;
    customerId?: string;
    color?: string;

    constructor(dto) {
        this.name = dto.name;
        this.species = dto.species;
        this.customerId = dto.customerId;
        this.color = dto.color;
    }

    static createDTO(dto: unknown): GetPetsDTO {
        return new GetPetsDTO(dto as IGetPetsDTO);
    }
}


/*
export interface IGetPetsDTO {
    name?: string;
    species?: string;
    customerId?: string;
    color: string;

}

export class GetPetsDTO implements IGetPetsDTO {
    name?: string;
    species?: string;
    customerId?: string;
    color: string;


    constructor(dto) {
        this.name = dto.name;
        this.species = dto.species;
        this.customerId = dto.customerId;
        this.color = dto.color;
    }

    static createDTO(dto: unknown) {
        return new GetPetsDTO(dto as IGetPetsDTO);
    }
}

*/