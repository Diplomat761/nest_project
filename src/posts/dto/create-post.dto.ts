export class CreatePostDto {
  readonly uniqueName: string;
  readonly title: string;
  readonly content: string;
  readonly userId: number;
  readonly imageId: number;
  readonly groupId: number;
}
