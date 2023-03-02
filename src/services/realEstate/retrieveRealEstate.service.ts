import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";

export const retrieveRealEstateService = async () => {
  const realEstateRepo = AppDataSource.getRepository(RealEstate);

  const realEstateRepoResult = realEstateRepo.find({
    relations: {
      address: true,
    },
  });

  return realEstateRepoResult;
};
