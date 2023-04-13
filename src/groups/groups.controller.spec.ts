import { Test, TestingModule } from "@nestjs/testing";
import { GroupsController } from "./groups.controller";
import { GroupsService } from "./groups.service";
import { CreateGroupsDto } from "./dto/create-group.dto";
import { Group } from "./groups.model";
import { getModelToken } from "@nestjs/sequelize";
import { Posts } from "src/posts/posts.model";
import { PostGroups } from "./post-groups.model";

describe("GroupsController", () => {
  let controller: GroupsController;
  let service: GroupsService;
  let mockData = { id: Date.now(), keyword: String };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupsController],
      providers: [
        GroupsService,
        { provide: getModelToken(Group), useValue: mockData },
      ],
    }).compile();

    controller = module.get<GroupsController>(GroupsController);
    service = module.get<GroupsService>(GroupsService);
  });

  describe("createPost", () => {
    it("создать новую группу", async () => {
      const dto: CreateGroupsDto = { keyword: "test" };
      const createdGroup: Group = new Group();
      createdGroup.id = 1;
      createdGroup.keyword = "test";

      jest.spyOn(service, "create").mockResolvedValue(createdGroup);

      const result = await controller.createPost(dto);

      expect(result).toEqual(createdGroup);
    });
  });
});
