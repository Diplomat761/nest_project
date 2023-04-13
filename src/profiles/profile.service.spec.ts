import { getModelToken } from "@nestjs/sequelize";
import { Test, TestingModule } from "@nestjs/testing";
import { Profile } from "./profiles.model";
import { ProfilesService } from "./profiles.service";

describe("ProfilesService", () => {
  let service: ProfilesService;

  const mockProfileRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfilesService,
        {
          provide: getModelToken(Profile),
          useValue: mockProfileRepository,
        },
      ],
    }).compile();

    service = module.get<ProfilesService>(ProfilesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createProfile", () => {
    it("should create a profile and return it", async () => {
      const dto = {
        firstName: "John",
        lastName: "Doe",
        age: 30,
        phoneNumber: "1234567890",
        userId: 1,
      };
      const createdProfile = { id: 1, ...dto };
      mockProfileRepository.create.mockReturnValue(createdProfile);

      const result = await service.createProfile(dto);

      expect(mockProfileRepository.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(createdProfile);
    });
  });

  describe("getProfileById", () => {
    it("should return a profile with specified id", async () => {
      const id = 1;
      const profile = {
        id,
        firstName: "John",
        lastName: "Doe",
        age: 30,
        phoneNumber: "1234567890",
        userId: 1,
      };
      mockProfileRepository.findOne.mockReturnValue(profile);

      const result = await service.getProfileById(id);

      expect(mockProfileRepository.findOne).toHaveBeenCalledWith({
        where: { id },
        include: { all: true },
      });
      expect(result).toEqual(profile);
    });
  });
  describe("getAllProfiles", () => {
    it("should return all profiles with their associated data", async () => {
      const profiles = [
        {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          age: 30,
          phoneNumber: "1234567890",
          userId: 1,
          user: { id: 1, username: "johndoe" },
        },
        {
          id: 2,
          firstName: "Jane",
          lastName: "Smith",
          age: 25,
          phoneNumber: "0987654321",
          userId: 2,
          user: { id: 2, username: "janesmith" },
        },
      ];
      mockProfileRepository.findAll.mockReturnValue(profiles);

      const result = await service.getAllProfiles();

      expect(mockProfileRepository.findAll).toHaveBeenCalledWith({
        include: { all: true },
      });
      expect(result).toEqual(profiles);
    });
  });

  describe("updateProfile", () => {
    it("should update a profile with specified id and return the updated profile", async () => {
      const id = 1;
      const dto = {
        firstName: "Johnн",
        lastName: "Smithш",
        age: 33,
        phoneNumber: "1112223333",
        userId: 1,
      };
      const updatedProfile = {
        id,
        ...dto,
        user: { id: 1, username: "johndoe" },
      };
      mockProfileRepository.update.mockReturnValue([1, [updatedProfile]]);

      const result = await service.updateProfile(id, dto);

      expect(mockProfileRepository.update).toHaveBeenCalledWith(dto, {
        returning: true,
        where: { id },
      });
      expect(result).toEqual([1, [updatedProfile]]);
    });
  });
  describe("deleteProfile", () => {
    it("should delete a profile with specified id and return the deleted profile", async () => {
      const id = 1;
      const profile = {
        id,
        firstName: "John",
        lastName: "Doe",
        age: 30,
        phoneNumber: "1234567890",
        userId: 1,
        user: { id: 1, username: "johndoe" },
        destroy: jest.fn(),
      };
      mockProfileRepository.findOne.mockReturnValue(profile);

      const result = await service.deleteProfile(id);

      expect(mockProfileRepository.findOne).toHaveBeenCalledWith({
        where: { id },
      });
      expect(profile.destroy).toHaveBeenCalled();
      expect(result).toEqual(profile);
    });
  });
});
