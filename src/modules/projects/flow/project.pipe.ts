import * as Joi from 'joi';

import { Project, ProjectInput } from '../model';
import { JoiValidationPipe } from '../../../common/flow/joi-validation.pipe';

export class ProjectPipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object<ProjectInput>({
      name: Joi.string().required().max(Project.NAME_LENGTH),
    });
  }
}
