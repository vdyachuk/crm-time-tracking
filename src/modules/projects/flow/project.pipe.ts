import * as Joi from 'joi';

import { Project } from '@entities/project.entity';
import { ProjectInput } from '../model';
import { JoiValidationPipe } from '../../../common/flow/joi-validation.pipe';

export class ProjectPipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object<ProjectInput>({
      name: Joi.string().required().max(50),
    });
  }
}
