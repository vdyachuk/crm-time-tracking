import * as Joi from 'joi';

import { ProjectInput } from '../model';
import { JoiValidationPipe } from '../../../shared/pipe/joi-validation.pipe';

export class ProjectPipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object<ProjectInput>({
      name: Joi.string().required().max(50),
    });
  }
}
