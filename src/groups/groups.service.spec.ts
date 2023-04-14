import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/sequelize";
import { CreateGroupsDto } from "./dto/create-group.dto";
import { CreatePostGroupsDto } from "./dto/createPostGroups.dto";
import { Group } from "./groups.model";
import { GroupsService } from "./groups.service";
import { PostGroups } from "./post-groups.model";

const mockGroupRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  destroy: jest.fn(),
};

const mockPostGroupRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
};

describe("GroupsService", () => {
  let service: GroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupsService,
        {
          provide: getModelToken(Group),
          useValue: mockGroupRepository,
        },
        {
          provide: getModelToken(PostGroups),
          useValue: mockPostGroupRepository,
        },
      ],
    }).compile();

    service = module.get<GroupsService>(GroupsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("create", () => {
    it("should create a group and return it", async () => {
      const dto: CreateGroupsDto = { keyword: "test" };
      const group = { id: 1, ...dto };
      mockGroupRepository.create.mockReturnValue(group);

      const result = await service.create(dto);

      expect(mockGroupRepository.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(group);
    });
  });

  describe("getAllGroups", () => {
    it("should return all groups with their posts", async () => {
      const groups = [
        { id: 1, keyword: "test", posts: [{ id: 1, title: "post 1" }] },
      ];
      mockGroupRepository.findAll.mockReturnValue(groups);

      const result = await service.getAllGroups();

      expect(mockGroupRepository.findAll).toHaveBeenCalledWith({
        include: { all: true },
      });
      expect(result).toEqual(groups);
    });
  });

  describe("getGroupById", () => {
    it("should return the group with the specified id and its posts", async () => {
      const id = 1;
      const group = {
        id,
        keyword: "test",
        posts: [{ id: 1, title: "post 1" }],
      };
      mockGroupRepository.findOne.mockReturnValue(group);

      const result = await service.getGroupById(id);

      expect(mockGroupRepository.findOne).toHaveBeenCalledWith({
        where: { id },
        include: { all: true },
      });
      expect(result).toEqual(group);
    });
  });
  describe("deleteGroup", () => {
    it("should delete the group with the specified id and return it", async () => {
      const id = 1;
      const group = { id, keyword: "test", destroy: jest.fn() };
      mockGroupRepository.findOne.mockResolvedValue(group);

      const result = await service.deleteGroup(id);

      expect(mockGroupRepository.findOne).toHaveBeenCalledWith({
        where: { id },
      });
      expect(group.destroy).toHaveBeenCalled();
      expect(result).toEqual(group);
    });
  });
  describe("createPostGroup", () => {
    it("should create a post group relation and return it", async () => {
      const dto: CreatePostGroupsDto = { groupId: 1, postId: 1 };
      const postGroup = { id: 1, ...dto };
      mockPostGroupRepository.create.mockReturnValue(postGroup);

      const result = await service.createPostGroup(dto);

      expect(mockPostGroupRepository.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(postGroup);
    });
  });

  describe("getPostByGroup", () => {
    it("should return all posts related to the group with the specified id", async () => {
      const groupId = 1;
      const postGroups = [
        {
          id: 1,
          groupId,
          post: { id: 1, title: "post 1" },
        },
        {
          id: 2,
          groupId,
          post: { id: 2, title: "post 2" },
        },
      ];
      mockPostGroupRepository.findAll.mockReturnValue(postGroups);

      const result = await service.getPostByGroup(groupId);

      expect(mockPostGroupRepository.findAll).toHaveBeenCalledWith({
        where: { groupId },
        include: { all: true },
      });
      expect(result).toEqual(postGroups);
    });
  });
});
