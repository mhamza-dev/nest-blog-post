import { ReactionType, ResourceType } from "@prisma/client";

export class CreateUserReactionDto {
  reactionType: ReactionType;
  resourceId: string;
  resourceType: ResourceType;
  userId: string;
}
