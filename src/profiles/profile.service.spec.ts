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

  // Добавьте другие тесты здесь
});
