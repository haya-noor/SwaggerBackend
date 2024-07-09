

import { IPet } from "../../src/domain/petEntitiy";
import { AddPetsDTO } from "../../src/application/dto/addPetsDTO";
import { GetPetsDTO } from "../../src/application/dto/getPetsDTO";
import { petsService } from "../../src/application/petsService";
import { Body, Controller, Get, Post, Res, Query, Route, SuccessResponse, TsoaResponse, Middlewares } from "tsoa";
import { authMiddleware } from "../routes/authMiddleware";

@Route("/petsapp/pet")
export class PetsController extends Controller {
    @SuccessResponse("200", "Found")
    @Get("/")
    @Middlewares(authMiddleware)
    public async getPets(@Res() success: TsoaResponse<200, IPet[]>, @Res() error: TsoaResponse<500, { status: string, message: string }>, @Query() query?: string): Promise<void> {
        try {
            const getPetsDTO = GetPetsDTO.createDTO(query || "");
            const petService = new petsService();
            const httpResponse = await petService.getPets(getPetsDTO);

            success(200, httpResponse.body as IPet[]);
        } catch (err) {
            error(500, { status: "error", message: (err as Error).message });
        }
    }

    @SuccessResponse("201", "Created")
    @Post("/")
    public async addPets(@Body() body: AddPetsDTO, @Res() success: TsoaResponse<200, IPet>, @Res() error: TsoaResponse<500, { status: string, message: string }>): Promise<void> {
        try {
            const addPetsDTO = AddPetsDTO.createDTO(body);
            const petService = new petsService();
            const response = await petService.addPets(addPetsDTO);

            success(200, response.body as IPet);
        } catch (err) {
            error(500, { status: "error", message: (err as Error).message });
        }
    }
}
