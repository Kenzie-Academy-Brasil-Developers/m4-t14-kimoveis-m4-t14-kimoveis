import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import { AppError } from "../../errors/erros";
import {
  realEstateCreateResultSchema,
  tRealEstateSchemaCreate,
} from "../../schemas/realEstate.schema";

export const createRealEstateService = async (
  estateInfo: tRealEstateSchemaCreate
): Promise<RealEstate> => {
  const realEstateRepo = AppDataSource.getRepository(RealEstate);
  const addressRepo = AppDataSource.getRepository(Address);
  const categoryRepo = AppDataSource.getRepository(Category);

  if (estateInfo.address.number) {
    const validdAddress = await addressRepo.findOneBy({
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

  const address = addressRepo.create(estateInfo.address);
  const createAddress = await addressRepo.save(address);

  const newEstate = realEstateCreateResultSchema.parse(estateInfo);

  if (category) {
    const estate = realEstateRepo.create({
      ...newEstate,
      address: { ...createAddress },
      category: category,
    });

    const createdRealEstate = await realEstateRepo.save(estate);

    return createdRealEstate;
  } else {
    const estate = realEstateRepo.create({
      ...newEstate,
      address: { ...createAddress },
      category: category,
    });
    const createdRealEstate = await realEstateRepo.save(estate);

    return createdRealEstate;
  }
};
