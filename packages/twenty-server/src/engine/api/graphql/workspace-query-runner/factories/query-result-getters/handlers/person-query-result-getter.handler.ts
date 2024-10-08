import { QueryResultGetterHandlerInterface } from 'src/engine/api/graphql/workspace-query-runner/factories/query-result-getters/interfaces/query-result-getter-handler.interface';

import { FileService } from 'src/engine/core-modules/file/services/file.service';
import { PersonWorkspaceEntity } from 'src/modules/person/standard-objects/person.workspace-entity';

export class PersonQueryResultGetterHandler
  implements QueryResultGetterHandlerInterface
{
  constructor(private readonly fileService: FileService) {}

  async handle(
    person: PersonWorkspaceEntity,
    workspaceId: string,
  ): Promise<any> {
    if (!person.id || !person?.avatarUrl) {
      return person;
    }

    const signedPayload = await this.fileService.encodeFileToken({
      person_id: person.id,
      workspace_id: workspaceId,
    });

    return {
      ...person,
      avatarUrl: `${person.avatarUrl}?token=${signedPayload}`,
    };
  }
}
