import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";

export const retrieveRealEstateService = async () => {
  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const realEstateRepoResult: RealEstate[] = await realEstateRepo.find({
    relations: {
      address: true,
    },
  });

  return realEstateRepoResult;
};
