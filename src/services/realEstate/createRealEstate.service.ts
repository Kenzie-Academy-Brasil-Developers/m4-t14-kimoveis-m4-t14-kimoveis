import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import { AppError } from "../../errors/erros";
import {
  realEstateCreateResultSchema,
  tRealEstateSchemaCreate,
  tRealEstateSchemaNewEstate,
} from "../../schemas/realEstate.schema";

export const createRealEstateService = async (
  estateInfo: tRealEstateSchemaCreate
): Promise<RealEstate> => {
  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  const addressRepo: Repository<Address> = AppDataSource.getRepository(Address);
  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  if (estateInfo.address.number) {
    const validdAddress: Address | null = await addressRepo.findOneBy({
      city: estateInfo.address.city,
      number: estateInfo.address.number,
      state: estateInfo.address.state,
      street: estateInfo.address.street,
      zipCode: estateInfo.address.zipCode,
    });

    if (validdAddress) {
      throw new AppError("Address already exists", 409);
    }
  }

  let category;

  if (estateInfo.categoryId) {
    category = await categoryRepo.findOneBy({
      id: estateInfo.categoryId,
    });

    if (!category) {
      throw new AppError("Category not Found.", 404);
    }
  }

  const address: Address = addressRepo.create(estateInfo.address);
  const createAddress: Address = await addressRepo.save(address);

  const newEstate: tRealEstateSchemaNewEstate =
    realEstateCreateResultSchema.parse(estateInfo);

  if (category) {
    const estate: RealEstate = realEstateRepo.create({
      ...newEstate,
      address: { ...createAddress },
      category: category,
    });

    const createdRealEstate: RealEstate = await realEstateRepo.save(estate);

    return createdRealEstate;
  } else {
    const estate: RealEstate = realEstateRepo.create({
      ...newEstate,
      address: { ...createAddress },
    });
    const createdRealEstate: RealEstate = await realEstateRepo.save(estate);

    return createdRealEstate;
  }
};
