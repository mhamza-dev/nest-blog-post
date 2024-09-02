import { PartialType } from '@nestjs/mapped-types';
import { CreateUserReactionDto } from './create-user_reaction.dto';
import { ReactionType } from '@prisma/client';

export class UpdateUserReactionDto extends PartialType(CreateUserReactionDto) {
    reactionType?: ReactionType;
}
