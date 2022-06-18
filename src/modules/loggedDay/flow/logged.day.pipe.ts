import * as Joi from 'joi';

import { LoggedDayInput } from '../model';
import { JoiValidationPipe } from '../../../common/flow';

export class LoggedDayPipe extends JoiValidationPipe {
  public buildSchema(): Joi.Schema {
    return Joi.object<LoggedDayInput>({
      dayData: Joi.string().required().max(55),
    });
  }
}
